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
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            v-bind:src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            class="w-20 h-20 mr-5"
            v-bind:alt="asset.name"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <