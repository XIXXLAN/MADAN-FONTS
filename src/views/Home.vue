<template>
  <div>
    <bounce-loader
      v-bind:loading="isLoading"
      v-bind:color="'#68d391'"
      v-bind:size="'100px'"
    ></bounce-loader>
    <px-assets-table v-if="!isLoading" v-bind:assets="a