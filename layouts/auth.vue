<template>
  <i-container>
    <i-row  bottom center class="_padding-y-5 header">
      <nuxt-logo />
      <h1 class="lead-title m-0 mx-5">Maria</h1>
    </i-row>
    <nuxt />
  </i-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NuxtLogo from '~/components/nuxt-logo.vue';

@Component({
  components: {
    NuxtLogo,
  },
})
export default class Index extends Vue {}
</script>

<style lang="scss">
.header {
  animation: 2s appear ease-out;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
