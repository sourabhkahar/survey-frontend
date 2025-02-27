<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto text-wite" max-width="900">
      <v-btn @click="counter.increment()">increment</v-btn>
      {{ counter.count }}
    </v-responsive>
    <!-- <AppFooter /> -->
  </v-container>
</template>

<script setup>
import { useCounterStore } from '@/store/index.js'
const counter = useCounterStore()
//
</script>
