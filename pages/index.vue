<template>
  <b-container>
    <b-row class="align-items-end justify-content-center py-5 header">
      <nuxt-logo/>
      <h1 class="lead-title m-0 mx-5">Maria</h1>
    </b-row>

    <b-row class="justify-content-center">
      <b-col class="col-md-8 col-lg-6    col-xxl-3 col-xxxl-3">
        <m-sign-in />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NuxtLogo from '~/components/nuxt-logo.vue';
import MSignIn from '~/components/forms/m-sign-in.vue';

@Component({
  components: {
    MSignIn,
    NuxtLogo,
  },
})
export default class Index extends Vue {
}
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
