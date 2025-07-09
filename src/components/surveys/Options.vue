<template lang="">
  <v-row class=" justify-space-between">
    <v-col cols="4">
      <strong> Options </strong>
    </v-col>
  </v-row>
  <v-container fluid>
    <v-row>
      <template
        v-for="(option,index) in fields"
        :key="index"
      >
        <v-col
          cols="11"
          class="pa-0"
        >
          <v-text-field
            v-model="option.value.title"
            label="Title"
            :error-messages="errors[`questions[${qidx}].options[${index}].title`]"
          />
        </v-col>
        <v-col
          class="text-end pa-0"
          cols="1"
        >
          <v-btn
            v-if="index == (fields.length-1)"
            type="button"
            icon="mdi-plus"
            variant="text"
            @click="addOption"
          />
          <v-btn
            v-if="index != 0"
            type="button"
            icon="mdi-trash-can"
            variant="text"
            color="red"
            @click="deletOption(index)"
          />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script setup>
const props = defineProps({
  qidx: {
    required: true,
    type:Number
  },
  optionType: {
    required: true,
    type:String
  },
  questionsIndex: {
      type: Number,
      default: -1
  }
})
import { useFieldArray, useFormErrors } from 'vee-validate'
const qidx = props.questionsIndex > -1?`sections.${props.questionsIndex}.questions[${props.qidx}].options` : `questions[${props.qidx}].options`
const { fields,  push, remove } = useFieldArray(qidx)
const errors = useFormErrors()
function addOption() {
  push({
    title: '',
  })
}

function deletOption(idx) {
  remove(idx)
}

</script>
<style lang="">

</style>