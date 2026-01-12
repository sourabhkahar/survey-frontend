<template lang="">
  <v-snackbar
    v-model="snackbar"
    multi-line
    :timeout="3000"
    :color="snackbarConf.color"
  >
    {{ snackbarConf.text }}
    <template #actions>
      <v-btn
        color="white"
        variant="text"
        @click="snackbar = false"
      >
        Cancel
      </v-btn>
    </template>
  </v-snackbar>

  <v-container
    fluid
    class="pa-0"
  >
    <v-row>
      <v-col cols="6">
        <v-card
          class="mx-auto"
          max-width="300"
        >
          <div class="d-flex justify-space-between align-center">
            <h3 class="text-center ma-2">
              Match A
            </h3>
            <v-btn
              icon="mdi-plus"
              type="button"
              size="x-small"
              class="ma-2"
              @click="addMatchOption('A')"
            />
          </div>
          <v-divider />
          <v-text-field
            v-model="newMatchA"
            label="Add Option"
            class="ma-2"
          />

          <v-list>
            <v-list-item
              v-for="(field, index) in value.matchA"
              :key="field.key"
            >
              {{ field }}

              <template #append>
                <v-btn
                  icon="mdi-trash-can"
                  variant="text"
                  color="red"
                  @click="removeMatchingOption('A',index)"
                />
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="mx-auto"
          max-width="300"
        >
          <div class="d-flex justify-space-between align-center">
            <h3 class="text-center ma-2">
              Match B
            </h3>
            <v-btn
              icon="mdi-plus"
              type="button"
              size="x-small"
              class="ma-2"
              @click="addMatchOption('B')"
            />
          </div>
          <v-divider />
          <v-text-field
            v-model="newMatchB"
            label="Add Option"
            class="ma-2"
          />
          <v-list>
            <v-list-item
              v-for="(field, index) in value.matchB"
              :key="index"
            >
              {{ field }}
              <template #append>
                <v-btn
                  icon="mdi-trash-can"
                  variant="text"
                  color="red"
                  @click="removeMatchingOption('B',index)"
                />
              </template>
            </v-list-item>
          </v-list>
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
  qidx: {
    required: true,
    type: Number
  },
  sectionType: {
    required: true,
    type: String
  }
})

import config from '@/config';
import { useField } from 'vee-validate'
import { reactive, ref, watch } from 'vue';
const qidx = props.questionsIndex > -1 ? `sections.${props.questionsIndex}.questions[${props.qidx}].options` : `questions[${props.qidx}].options`
const { value, setValue } = useField(qidx, {})
const newMatchA = ref('')
const newMatchB = ref('')
const snackbar = ref(false)
const snackbarConf = reactive({
  color: 'error',
  text: 'Something went wrong!'
})

function addMatchOption(matchSec) {
  if (matchSec == 'A' && newMatchA.value == '' || matchSec == 'B' && newMatchB.value == '') {
    snackbarConf.color = config.statuscolor.error
    snackbarConf.text = 'Option Field can"t be empty !'
    snackbar.value = true
    return
  }
  if (matchSec == 'A') {
    value.value.matchA.push(newMatchA.value)
  } else {
    value.value.matchB.push(newMatchB.value)
  }
  newMatchA.value = ''
  newMatchB.value = ''
}

function removeMatchingOption(matchSec, index) {
  value.value[ 'match' + matchSec ].splice(index, 1)
}

watch(
  () => props.sectionType,
  (type) => {
    if (
      type === 'matching' &&
      (!value.value || (!value.value.matchA && !value.value.matchB))
    ) {
      setValue({
        matchA: [],
        matchB: []
      })
    }
  },
  { immediate: true }
)
</script>
<style lang="">

</style>