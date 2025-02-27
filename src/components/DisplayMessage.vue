<template>
  <v-snackbar
    v-model="isMessageShown"
    multi-line
    :timeout="3000"
    :color="snackbarConf.color"
  >
    {{ snackbarConf.text }}
    <template #actions>
      <v-btn
        color="white"
        variant="text"
        @click="closeMessage()"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup>
import { ref, watch } from 'vue';
const isMessageShown = ref(false)
defineEmits(['closemessage'])
const props = defineProps({
    snackbar: {
        required: true,
        type: Boolean
    },
    snackbarConf: {
        required: true,
        type: {}
    }
})

watch(() => props.snackbar, (newval) => {
    isMessageShown.value = newval
})

function closeMessage() {
    $emit('closemessage')
}
</script>