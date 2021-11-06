<template>
  <main>
    <px-header v-bind:links="links" />
    <router-view class="container px-5 sm:px-20 py-20 flex justify-center" />
  </main>
</template>

<script>
import PxHeader from "@/components/PxHeader";

export default {
  name: "App",

  data() {
    return {
      links: [
        {
          title: "BTC"