<template>
  <button
    v-on:click="buttonClick"
    class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded"
  >
    <beat-loader
      v-bind:loading="isLoading"
      v-bind:color="'#68d391'"
      v-bind:size="'8px'"
    >
    </beat-loader>
    <p v-show="!isLoading">
      <slot></slot>
    </p>
  </button>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
export default {
  name: "PxButton",

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  components: { BeatLoader },

  methods: {
    buttonClick() {
      this.$emit("custom-click");
    },
  },
};
</script>
