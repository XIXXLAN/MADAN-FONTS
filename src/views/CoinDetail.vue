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
            <small class="sm:mr-2 text-gray-500">
              {{ asset.symbol }}
            </small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ dollarFilter(asset.priceUsd) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ dollarFilter(min) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ dollarFilter(max) }} </span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span> {{ dollarFilter(avg) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ percentFilter(asset.changePercent24Hr) }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            v-on:click="toggleConverter"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ fromUsd ? `USD a ${asset.symbol} ` : `${asset.symbol} a USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                v-model="convertValue"
                v-bind:placeholder="`Valor en  ${
                  fromUsd ? 'USD' : asset.symbol
                } `"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl">
            {{ dollarFilter(convertResult) }}
            {{ fromUsd ? asset.symbol : "USD" }}
          </span>
        </div>
      </div>
      <line-chart
        class="my-10"
        v-bind:colors="['orange']"
        v-bind:min="min"
        v-bind:max="max"
        v-bind:data="
          history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])
        "
      >
      </line-chart>
      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr
          v-for="market in markets"
          v-bind:key="`${market.exchangeId}-${market.priceUsd}`"
          class="border-b"
        >
          <td>
            <b>{{ market.exchangeId }}</b>
          </td>
          <td>{{ dollarFilter(market.priceUsd) }}</td>
          <td>{{ market.baseSymbol }} / {{ market.quoteSymbol }}</td>
          <td>
            <px-button
              v-bind:is-loading="market.isLoading || false"
              v-if="!market.url"
              v-on:custom-click="getWebSite(market)"
            >
              <slot>Obtener link</slot>
            </px-button>
            <a v-else class="hover:underline text-green-600" target="_blanck">{{
              market.url
            }}</a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import PxButton from "@/components/PxButton";
import api from "@/api";
import { dollarFilter, percentFilter } from "@/filters";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";

export default {
  name: "CoinDetail",

  data() {
    return {
      isLoading: false,
      asset: {},
      history: [],
      markets: [],
      fromUsd: true,
      convertValue: null,
    };
  },

  created() {
    this.getCoin();
  },

  components: { BounceLoader, PxButton },

  methods: {
    toggleConverter() {
      this.fromUsd = !this.fromUsd;
    },
    getWebSite(exchange) {
      exchange.isLoading = true;
      return api
        .getExchange(exchange.exchangeId)
        .then((res) => {
          exchange.url = res.exchangeUrl;
        })
        .finally(() => {
          exchange.isLoading = false;
        });
    },
    getCoin() {
      this.isLoading = true;
      const id = this.$route.params.id;

      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));
    },
  },

  computed: {
    convertResult() {
      if (!this.convertValue) {
        return 0;
      }
      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd;
      return result.toFixed(4);
    },
    min() {
      return Math.min(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    max() {
      return Math.max(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    avg() {
      return (
        this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) /
        this.history.length
      ).toFixed(2);
    },
  },

  watch: {
    $route() {
      this.getCoin();
    },
  },

  setup() {
    return {
      dollarFilter,
      percentFilter,
    };
  },
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
