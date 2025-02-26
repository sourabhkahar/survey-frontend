<template lang="">
    <v-col  cols="4">
        <v-card class="mx-auto" max-width="344">
            <v-img height="200px" :src="getImage(props.survey.image)" cover></v-img>
            <v-card-title>
                {{props.survey.title}}
            </v-card-title>

            <v-card-subtitle>
                {{props.survey.description}}
            </v-card-subtitle>

            <v-card-actions class="d-flex justify-end">
                <v-btn icon="mdi mdi-delete" color="red" @click="$emit('openDeleteConfirmModal',props.survey.id)"></v-btn>
                <v-btn icon="mdi mdi-pencil" @click="$emit('goToEdit',props.survey.id)"></v-btn>
                <v-btn icon="mdi mdi-arrow-top-right-bold-box-outline" @click="$emit('goToEdit',props.survey.id)"></v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>
<script setup>
const props = defineProps({
                    survey:{
                        required:true
                    }
                })
defineEmits(['openDeleteConfirmModal','goToEdit'])

function getImage(image) {
    return image ? (import.meta.env.VITE_API_BASE_IMAGE_URL + image) : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
}
</script>
<style lang="">
    
</style>