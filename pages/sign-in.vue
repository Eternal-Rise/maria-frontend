<template>
  <div>
    <b-row class="justify-content-center py-5">
      <b-col class="col-md-8 col-lg-6    col-xxl-3 col-xxxl-3">
        <m-sign-in />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center">
        <b-link :to="{ name: 'sign-up' }">Did't registered yet?</b-link>
      </b-col>
    </b-row>
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
export default class SignIn extends Vue {
}
</script>

<style lang="scss"></style>
