<template lang="">
  <v-col cols="12">
    <v-card 
      class="mx-auto" 
    >
      <v-card-title 
        v-if="paperTitle" 
        class="bg-primary text-white"
      >
        {{ paperTitle }}
      </v-card-title>
      <template v-if="previewUrl">
        <iframe
          :src="previewUrl"
          width="100%"
          height="700"
        />
      </template>
      <template v-else>
        <v-skeleton-loader type="card" />
      </template>
      <v-card-actions class="d-flex justify-end">
        <v-btn 
          icon="mdi mdi-arrow-top-right-bold-box-outline" 
          color="primary"
          :loading="loading"
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
const paperTitle = ref('')
const loading = ref(false)

async function readFileContentFromURL(id) {
  let res = await setPaper.previewPaper(id)
  if (res.status === 200) {
    previewUrl.value = URL.createObjectURL(res.data)
    if (res.headers['x-file-name']) {
        paperTitle.value = res.headers['x-file-name'].replace('.pdf', '')
    }
  }
}

async function createPaper() {
  loading.value = true
  const res = await setPaper.createPaperFromTemplate( route.params.id )
  if (res.status === 200) {
      const fileName = res.headers['x-file-name'] || 'updated.docx';
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      loading.value = false
  } else {
    console.error('Error creating paper from template:', res);
    loading.value = false
  }
}

onMounted(() => {
  readFileContentFromURL(route.params.id)
})
</script>
