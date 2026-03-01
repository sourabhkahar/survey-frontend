<template lang="">
  <v-col cols="12">
    <v-card 
      class="mx-auto" 
    >
      <iframe
        :src="previewUrl"
        width="100%"
        height="700"
      />
      <v-card-title>
        <!-- {{ props.paperTemplate.name }} -->
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
import { onMounted, ref } from 'vue';
const route = useRoute()
import { useSetPaper } from '@/api/setpaper'
import { useRoute } from "vue-router";
const setPaper = useSetPaper();
const previewUrl = ref('')

async function readFileContentFromURL(id) {
  let res = await setPaper.previewPaper(id)
  if (res.status === 200) {
    previewUrl.value = URL.createObjectURL(res.data)
  }
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
  readFileContentFromURL(route.params.id)
})
</script>
