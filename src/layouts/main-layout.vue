
<template>
    <v-app id="inspire">
      <v-app-bar
        class="px-3"
        density="compact"
        flat
      >
        <v-avatar
          class="hidden-sm-and-down"
          color="grey-darken-1"
          size="32"
        ></v-avatar>
  
        <v-spacer></v-spacer>
  
        <v-tabs
          color="grey-darken-2"
          centered
        >
          <v-tab
            v-for="link in links"
            :key="link"
            :text="link"
          ></v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
  
     
      </v-app-bar>
  
      <v-main class="bg-grey-lighten-3">
        <v-container>
            <slot></slot>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
    const links = [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ]
  </script>
  

  
  <route lang="json">{
    "name": "dashboard",
    "meta": {
      "requiresAuth": true
    }
  }</route>
  