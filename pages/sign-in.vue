<template>
  <div>
    <i-row center class="_padding-y-5">
      <i-column :md="8" :lg="6" :xl="4">
        <m-sign-in />
      </i-column>
    </i-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MSignIn from '~/components/forms/m-sign-in.vue';

@Component({
  auth: 'guest',
  components: {
    MSignIn,
  },
  layout: 'auth',
})
export default class SignIn extends Vue {}
</script>

<style lang="scss"></style>
