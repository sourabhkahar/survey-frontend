<template lang="">
  <v-col cols="4">
    <v-card 
      class="mx-auto" 
      max-width="344"
    >
      <v-img 
        height="200px" 
        :src="getImage(props.paper.image)" 
        cover 
      />
      <v-card-title>
        {{ props.paper.title }}
      </v-card-title>
      
      <v-card-subtitle>
        {{ props.paper.description }}
      </v-card-subtitle>

      <v-card-actions class="d-flex justify-end">
        <v-btn 
          icon="mdi mdi-delete"
          color="red"
          @click="$emit('openDeleteConfirmModal',props.paper.id)"
        />
        <v-btn 
          icon="mdi mdi-pencil" 
          @click="$emit('goToEdit',props.paper.id)"
        />
        <v-btn 
          icon="mdi mdi-arrow-top-right-bold-box-outline" 
          @click="router.push({path:'/set-papers/preview-template/' + props.paper.id})"
        />
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter()
defineEmits(['openDeleteConfirmModal', 'goToEdit'])
const props = defineProps({
                    paper:{
                        required:true,
                        type:Object
                    }
                })
function getImage(image) {
  return image ? (import.meta.env.VITE_API_BASE_IMAGE_URL + image) : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
}
</script>
