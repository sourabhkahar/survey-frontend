<template lang="">
    <v-row class=" justify-space-between mt-2">
      <v-col cols="4">
        <strong> Options </strong>
      </v-col>
    </v-row>
    <v-row>
      <!-- {{fields}} -->
      <v-col cols="12" v-for="(option,index) in fields" :key="index">
        <v-col class="text-end"  cols="12">
            <v-btn  type="button" @click="addOption" icon="mdi-plus" variant="text" v-if="index == (fields.length-1)" >
            </v-btn>
            <v-btn  type="button" @click="deletOption(index)" icon="mdi-trash-can" variant="text" color="red" v-if="index != 0">
            </v-btn>
        </v-col>
        <v-text-field label="Title" v-model="option.value.title" :error-messages="errors[`questions[${qidx}].options[${index}].title`]"></v-text-field>
      </v-col>
    </v-row>
</template>
<script setup>
const props = defineProps({
  qidx: {
    required: true,
  },
  optionType: {
    required: true
  }
})
import { ref, reactive, onMounted, watch } from 'vue'
import { useFieldArray, useFormErrors } from 'vee-validate'
import config from '@/config'
import { number } from 'yup'
const { fields, insert, push, remove } = useFieldArray(`questions[${props.qidx}].options`)
const errors = useFormErrors()
function addOption() {
  push({
    title: '',
  })
}

function deletOption(idx) {
  remove(idx)
}

watch(() => props.optionType, (newValue, oldValue) => {
  // console.log(newValue,'sd')
  // if(newValue == 'text'){
  //   remove(qidx)
  // }
})
// onMounted(() => {
//     // push({
//     //         title:'',
//     //     })
// })
</script>
<style lang="">

</style>