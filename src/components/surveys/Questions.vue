<template lang="">
  <v-row class=" justify-space-between mt-2">
    <v-col cols="4">
      <strong> Question </strong>
    </v-col>
  </v-row>
  
  <v-container
    fluid
    class="pa-0"
  >
    <v-row>
      <v-col
        v-for="(question,index) in fields"
        :key="index"
        cols="12"
      >
        <v-row>
          <v-col
            v-if="index == (fields.length-1)"
            class="text-start"
            cols="8"
          >
            Add Question
          </v-col>
          <v-col
            class="text-end"
            :cols="index != (fields.length-1) ? 12 : 4"
          >
            <v-btn
              v-if="index == (fields.length-1)"
              type="button"
              icon="mdi-plus"
              variant="text"
              @click="addQuestion"
            />
            <v-btn
              v-if="index != 0"
              type="button"
              icon="mdi-trash-can"
              variant="text"
              color="red"
              @click="deletQuestion(index)"
            />
          </v-col>
        </v-row>
        <v-card
          variant="text"
          class="mx-auto m-2 pa-1 border-b-thin "
        >
          <v-text-field
            v-model="question.value.question"
            label="Question"
            :error-messages="errors[`${qidx}[${index}].question`]"
          />
          <v-select
            v-model="question.value.type"
            label="Question Type"
            :items="config.questionTypeOption"
            item-title="value"
            item-value="key"
            :error-messages="errors[`${qidx}[${index}].type`]"
          />
          <v-textarea
            v-model="question.value.description"
            label="Description"
          />
          <v-number-input 
            v-if="['text'].includes(question.value.type)"
            v-model="question.value.meta" 
            control-variant="default"
          />
          <v-divider v-if="['select','checkbox','radio'].includes(question.value.type)" />
          <Options
            v-if="['select','checkbox','radio'].includes(question.value.type)"
            :qidx="index"
            :option-type="question.value.type"
            :questions-index="props.questionsIndex"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const props = defineProps({
  questionsIndex: {
      type: Number,
      default: -1
  }
})

import { useFieldArray, useFormErrors } from 'vee-validate'
import { VNumberInput } from 'vuetify/labs/VNumberInput';
import config from '@/config';
const qidx = props.questionsIndex > -1?`sections.${props.questionsIndex}.questions` : 'questions'
const { fields, push, remove } = useFieldArray(qidx)
const errors = useFormErrors()

function addQuestion() {
  push({
    question: '',
    type: '',
    description: '',
    meta:0,
    options: [
      { title: '' }
    ]
  })
}

function deletQuestion(idx) {
  remove(idx)
}

</script>
<style lang="">

</style>