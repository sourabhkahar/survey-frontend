<template lang="">
  <v-row>
    <v-col 
      v-for="(section,index) in fields" 
      :key="index" 
      cols="12"
    >
      <v-row>
        <v-col
          v-if="index == (fields.length-1)" 
          class="text-start" 
          cols="8"
        >
          Add Section
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
            @click="addSection"
          />
          <v-btn
            v-if="index != 0"
            type="button"
            icon="mdi-trash-can"
            variant="text"
            color="red"
            @click="deletSection(index)"
          />
        </v-col>
      </v-row>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title> 
            {{ section.value.title }} 
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <template #default>
              <v-card
                variant="text"
                class="mx-auto m-2 pa-1 border-b-thin "
              >
                <v-text-field
                  v-model="section.value.title"
                  label="Section Title"
                  :error-messages="errors[`sections[${index}].title`]"
                />
                <v-select
                  v-model="section.value.section_type"
                  label="Section Type"
                  :items="config.sectionTypeOption"
                  item-title="value"
                  item-value="key"
                  :error-messages="errors[`sections[${index}].section_type`]"
                />
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="section.value.caption"
                      label="Caption"
                      :error-messages="errors[`sections[${index}].caption`]"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="section.value.total_marks"
                      label="Total Marks"
                      :error-messages="errors[`sections[${index}].total_marks`]"
                    />
                  </v-col>
                </v-row>   
              </v-card>
              <v-row>
                <v-col cols="12">
                  <Questions 
                    v-if="section.value.section_type != ''"  
                    :questions-index="index"
                    :section-type="section.value.section_type"
                  />
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script setup>
import { useFormErrors, useFieldArray } from 'vee-validate';
import config from '@/config';
const { fields, push, remove } = useFieldArray('sections')
const errors = useFormErrors();
function addSection() {
  push({
    title: '',
    section_type: '',
    total_marks: null,
    caption: '',
    questions: [
      {
        question: '',
        options: [],
      }
    ]
  })
}

function deletSection(idx) {
  remove(idx)
}

</script>