<template lang="">
  <v-row>
    <v-col cols="12">
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
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-text-field
        v-model="title"
        label="Title"
        :error-messages="message.title"
      />
      <v-textarea
        v-model="description"
        label="Description"
        :error-messages="message.description"
      />
      <v-row>
        <v-col>
          <v-file-input
            v-model="image"
            label="Image"
            :error-messages="message.image"
            @update:model-value="updateResolvedImage"
          />
        </v-col>
        <v-col>
          <v-img
            :width="300"
            aspect-ratio="16/9"
            cover
            :src="resolvedImage"
          />
        </v-col>
      </v-row>
      <v-date-input
        v-model="expire_date"
        label="Expiry Date"
        :error-messages="message.expire_date"
      />
    </v-col>
  </v-row>
  <v-divider />
  <Questions />
  <v-checkbox
    v-model="status"
    label="is Acitve"
  />
</template>

<route lang="json">{
    "name": "surveys-create",
    "meta": {
        "requiresAuth": true
    }
}</route>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useField, useFormErrors } from 'vee-validate'
import { VDateInput } from 'vuetify/labs/VDateInput'

const props = defineProps({
    serveyImage:{
        default:'',
        type:String
    }
})
const snackbar = ref(false)
const message = useFormErrors();
const { value: title } = useField('title');
const { value: description } = useField('description');
const { value: expire_date } = useField('expire_date');
const { value: status } = useField('status');
const { value: image } = useField('image');
const resolvedImage = ref('https://cdn.vuetifyjs.com/images/cards/sunshine.jpg')
const snackbarConf = reactive({
    color: 'error',
    text: 'Something went wrong!'
})

watch(()=> props.serveyImage,()=>{
    if(props.serveyImage){
      console.log('serveyImage',props.serveyImage)
        updateResolvedImage(props.serveyImage);
    }
})

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}


async function updateResolvedImage(image) {
  if (!image) {
    resolvedImage.value = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
  } else if (typeof image === 'string') {
    resolvedImage.value = import.meta.env.VITE_API_BASE_IMAGE_URL + image;
  } else if (image instanceof File) {
    try {
      resolvedImage.value = await readFileAsDataURL(image);
    } catch (error) {
      console.error('Error reading file:', error);
      resolvedImage.value = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
    }
  }
}
</script>