<template>
  <b-container class="d-flex py-3 vh">
    <b-row style="flex: 1">
      <b-col cols="2" class="d-flex">
        <m-nav style="flex: 1" />
      </b-col>
      <b-col cols="8">
        <nuxt />
      </b-col>
      <b-col cols="2" />
    </b-row>
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
