<template lang="">
  <v-col cols="4">
    <v-card 
      class="mx-auto" 
    >
      <div :id="`container${props.idx}`" />
      <v-card-title>
        {{ props.paperTemplate.name }}
      </v-card-title>
      <v-card-actions class="d-flex justify-end">
        <v-btn 
          icon="mdi mdi-delete"
          color="red"
        />
        <v-btn 
          icon="mdi mdi-arrow-top-right-bold-box-outline" 
          color="primary"
          @click="createPaper"
        />
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script setup>
import axios from "axios";
import {renderAsync} from 'docx-preview'
import { onMounted } from 'vue';
const route = useRoute()
import { useSetPaper } from '@/api/setpaper'
import { useRoute } from "vue-router";
const setPaper = useSetPaper();
// import config from '@/config'
const props = defineProps({
  paperTemplate: {
    required: true,
    type: Object
  },
  idx: {
    required: true,
    type: Number
  }
})

async function readFileContentFromURL(url) {
  let res = await axios.get(import.meta.env.VITE_API_BASE_IMAGE_URL + 'file/' + url, {
    responseType: 'blob',
  })
  renderAsync(res.data, document.getElementById("container"+props.idx),'',{
    inWrapper: true,
    ignoreHeight: true,
    ignoreWidth: true,
    useBase64URL: true,
  });
  
}

async function createPaper() {
  const res = await setPaper.createPaperFromTemplate( route.params.id )
  if (res.status === 200) {
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'updated.docx';
      document.body.appendChild(a);
      a.click();
      a.remove();
  } else {
    console.error('Error creating paper from template:', res);
  }
}
onMounted(() => {
  if (props.paperTemplate.url) {
    readFileContentFromURL(props.paperTemplate.name)
  }
})
</script>
