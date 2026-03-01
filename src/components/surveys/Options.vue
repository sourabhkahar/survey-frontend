<template lang="">
  <v-row class=" justify-space-between">
    <v-col cols="4">
      <strong> Options </strong>
    </v-col>
  </v-row>
  <!-- <v-container fluid> -->
  <v-row>
    <template
      v-for="(option,index) in fields"
      :key="index"
    >
      <v-col
        cols="6"
        sm="3"
        class="pb-3"
      >
        <v-text-field
          v-model="option.value.title"
          density="compact"
          variant="outlined"
          hide-details
        >
          <template #append-inner>
            <v-icon
              v-if="index != 0"
              size="16"
              color="red"
              @click="deletOption(index)"
            >
              mdi-close
            </v-icon>

            <v-icon
              v-if="index === fields.length - 1"
              size="18"
              color="primary"
              @click="addOption(1)"
            >
              mdi-plus
            </v-icon>
          </template>
        </v-text-field>
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
  }
})
import { useFieldArray, useFormErrors } from 'vee-validate'
import { onMounted } from 'vue'
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

function deletOption(idx) {
  remove(idx)
}

onMounted(()=>{
  if(fields.value.length == 0){
    addOption(4)
  }
})

</script>
<style lang="">

</style>