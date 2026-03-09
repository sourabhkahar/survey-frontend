<template lang="">
  <v-row class=" justify-space-between">
    <v-col cols="4">
      <strong> Images </strong>
    </v-col>
  </v-row>
  <!-- <v-container fluid> -->
  <v-row>
    <template
      v-for="(option,index) in fields"
      :key="option.key"
    >
      <v-col
        cols="6"
        sm="3"
        class="pb-3"
      >
        <v-img
          v-if="option.value.title"
          :src="getImageUrl(option.value.title)"
          height="100"
          class="bg-grey-lighten-2 mb-2"
          cover
        />
        <v-text-field
          v-model="option.value.title"
          label="Path / Name"
          density="compact"
          readonly
          variant="plain"
          hide-details
          class="mb-2"
        />

        <v-file-input
          density="compact"
          variant="outlined"
          label="Upload/Update Image"
          hide-details
          @update:model-value="file => uploadFile(file, index)"
        >
          <template #append>
            <v-icon
              v-if="index != 0"
              size="16"
              color="red"
              @click="deletOption(index)"
            >
              mdi-close
            </v-icon>

            <v-icon
              v-if="index === fields.length - 1 && fields.length < 5"
              size="18"
              color="primary"
              @click="addOption(1)"
            >
              mdi-plus
            </v-icon>
          </template>
        </v-file-input>
      </v-col>
    </template>
  </v-row>
  <!-- </v-container> -->
</template>
<script setup>
const props = defineProps({
  qidx: {
    required: true,
    type:Number
  },
  questionsIndex: {
      type: Number,
      default: -1
  },
  questionId: {
    type: [Number, String],
    default: null
  }
})
import { useFieldArray, useFormErrors } from 'vee-validate'
import { onMounted } from 'vue'
import { useSetPaper } from '@/api/setpaper'
const setPaper = useSetPaper()
const qidx = props.questionsIndex > -1?`sections.${props.questionsIndex}.questions[${props.qidx}].options` : `questions[${props.qidx}].options`
const { fields,  push, remove } = useFieldArray(qidx)
const errors = useFormErrors()
function addOption(opt = 0) {
  for(let i = 0; i < opt; i++) {
    push({
      title: '',
    })
  }
}

const deletOption = async (idx) => {
  try {
    const path = fields.value[idx].value.title;
    if (path) {
      await setPaper.deleteDocument({ 
        path,
        question_id: props.questionId 
      });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
  }
  remove(idx)
}

onMounted(()=>{
  if(fields.value.length == 0){
    addOption(1)
  }
})

const uploadFile = async (file, index) => {

  try {

    const selectedFile = Array.isArray(file) ? file[0] : file;

    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await setPaper.uploadDocument(formData);

    if (res.data.status === 'success') {

      fields.value[index].value.title = res.data.path;

    }

  } catch (error) {
    console.log(error);
  }
}

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return import.meta.env.VITE_API_BASE_IMAGE_URL + path;
};

</script>
<style lang="">

</style>