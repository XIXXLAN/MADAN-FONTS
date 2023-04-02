<template>
  <div>
    <bounce-loader
      v-bind:loading="isLoading"
      v-bind:color="'#68d391'"
      v-bind:size="'100px'"
    ></bounce-loader>
    <px-assets-table v-if="!isLoading" v-bind:assets="assets" />
  </div>
</template>

<script>
import api from "@/api";
import PxAssetsTable from "@/components/PxAssetsTable";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";

export default {
  name: "Home",

  components: { PxAssetsTable, BounceLoader },

  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },

  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  },
};
</script>
