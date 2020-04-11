<template>
  <b-container class="py-3 vh">
    <m-nav />
    <nuxt />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MNav from '~/components/m-nav.vue';

@Component({
  components: {
    MNav,
  },
})
export default class Default extends Vue {}
</script>

<style lang="scss"></style>
