<template>
  <Navigationbar />
  <v-container>
    Dashboard
  </v-container>
</template>

<script setup>
import Navigationbar from '@/components/Navigationbar.vue';

</script>


<route lang="json">{
  "name": "dashboard",
  "meta": {
    "requiresAuth": true
  }
}</route>
