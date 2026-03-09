<template>
  <v-row class="align-center">
    <v-col 
      cols="12" 
      md="6"
    >
      <div v-if="fields.length > 0">
        <v-img
          v-if="fields[0].value.title"
          :src="getImageUrl(fields[0].value.title)"
          max-height="200"
          class="bg-grey-lighten-2 mb-2 rounded border"
          contain
        />
        
        <v-text-field
          v-model="fields[0].value.title"
          label="Uploaded Image Path"
          density="compact"
          readonly
          variant="outlined"
          hide-details
          class="mb-2"
        />

        <v-file-input
          density="compact"
          variant="outlined"
          label="Change Image"
          prepend-icon="mdi-camera"
          accept="image/*"
          hide-details
          @update:model-value="file => uploadFile(file, 0)"
        >
          <template #append>
            <v-icon
              v-if="fields[0].value.title"
              size="20"
              color="red"
              @click="deletOption(0)"
            >
              mdi-trash-can
            </v-icon>
          </template>
        </v-file-input>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  qidx: {
    required: true,
    type: Number
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

import { useFieldArray } from 'vee-validate'
import { onMounted } from 'vue'
import { useSetPaper } from '@/api/setpaper'

const setPaper = useSetPaper()
const qidx = props.questionsIndex > -1 ? `sections.${props.questionsIndex}.questions[${props.qidx}].options` : `questions[${props.qidx}].options`
const { fields, push } = useFieldArray(qidx)

function addOption() {
  if (fields.value.length === 0) {
    push({ title: '' })
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
  fields.value[idx].value.title = '';
}

onMounted(() => {
  if (fields.value.length === 0) {
    addOption()
  }
})

const uploadFile = async (file, index) => {
  if (!file) return;
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
