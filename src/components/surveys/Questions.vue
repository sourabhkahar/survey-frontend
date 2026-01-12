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
        <v-row v-if=" props.sectionType != 'matching'">
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
            v-if="props.sectionType != cofigSectionOption.fillintheblank"
            v-model="question.value.question"
            label="Question"
            :error-messages="errors[`${qidx}[${index}].question`]"
          />
          <v-textarea
            v-if="props.sectionType == cofigSectionOption.fillintheblank"
            v-model="question.value.question"
            label="Description"
          />
          <v-number-input 
            v-if="props.sectionType == cofigSectionOption.question_answer"
            v-model="question.value.options" 
            control-variant="default"
            label="No. Of lines"
          />
          <v-divider v-if="props.sectionType == cofigSectionOption.mcqs" />
          <MatchAB  
            v-if=" props.sectionType == cofigSectionOption.matching" 
            :qidx="index"
            :questions-index="props.questionsIndex"
            :section-type="props.sectionType" 
          />
          <Options
            v-if="props.sectionType == cofigSectionOption.mcqs"
            :qidx="index"
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
  },
  sectionType: {
    type: String,
    default: ""
  }
})

import { useFieldArray, useFormErrors } from 'vee-validate'
import { VNumberInput } from 'vuetify/labs/VNumberInput';
import config from '@/config';
import { mapArrayinKeyValue  } from '@/utils/helpers'
const qidx = props.questionsIndex > -1 ? `sections.${props.questionsIndex}.questions` : 'questions'
const { fields, push, remove } = useFieldArray(qidx)
const errors = useFormErrors()
const cofigSectionOption = mapArrayinKeyValue(config.sectionTypeOption);
function addQuestion() {
  push({
    question: '',
    description: '',
    options: []
  })
}

function deletQuestion(idx) {
  remove(idx)
}

</script>
<style lang="">

</style>