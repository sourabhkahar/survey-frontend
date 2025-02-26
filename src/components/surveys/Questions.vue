<template lang="">
    <v-row class=" justify-space-between mt-2">
      <v-col cols="4">
        <strong> Question </strong>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="(question,index) in fields" :key="index">
        <v-col class="text-end"  cols="12">
            <v-btn  type="button" @click="addQuestion" icon="mdi-plus" variant="text" v-if="index == (fields.length-1)" >
            </v-btn>
            <v-btn  type="button" @click="deletQuestion(index)" icon="mdi-trash-can" variant="text" color="red" v-if="index != 0">
            </v-btn>
        </v-col>
        <v-text-field label="Question" v-model="question.value.question" :error-messages="errors[`questions[${index}].question`]"></v-text-field>
        <v-select
            label="Question Type"
            :items="config.questionTypeOption"
            item-title="value"
            item-value="key"
            v-model="question.value.type"
            :error-messages="errors[`questions[${index}].type`]"
            @update:modelValue="changeQuestionType"
        ></v-select>
        <v-textarea label="Description" v-model="question.value.description" ></v-textarea>
        <v-divider v-if="['select','checkbox','radio'].includes(question.value.type)"></v-divider>
        <!-- {{question.value.type}} -->
        <Options v-if="['select','checkbox','radio'].includes(question.value.type)" :qidx="index" :option-type="question.value.type"/>
      </v-col>
    </v-row>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useFieldArray, useFormErrors } from 'vee-validate'
import config from '@/config'
const { fields, insert, push, remove } = useFieldArray('questions')
const errors  = useFormErrors()
function addQuestion(){
    push({
            question:'',
            type:'',
            description:'',
            options:[
              {title:''}
            ]
        })
}

function deletQuestion(idx){
    remove(idx)
}

function changeQuestionType(val){
    if(['select','checkbox','radio'].includes(val)){
        // console.log('sdsd',val)
    }
}
</script>
<style lang="">

</style>