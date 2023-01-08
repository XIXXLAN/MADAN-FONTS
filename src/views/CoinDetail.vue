<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader
        v-bind:loading="isLoading"
        v-bind:color="'#68d391'"
        v-bind:size="'100px'"
      ></bounce-loader>
    </div>
    <template v-if="!isLoading">
 