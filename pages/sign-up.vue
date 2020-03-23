<template>
  <div>
    <b-row class="justify-content-center py-5">
      <b-col class="col-md-8 col-lg-6    col-xxl-3 col-xxxl-3">
        <m-sign-up />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center">
        <b-link :to="{ name: 'sign-in' }">Already here?</b-link>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MSignUp from '~/components/forms/m-sign-up.vue';

@Component({
  auth: 'guest',
  components: {
    MSignUp,
  },
  layout: 'auth',
})
export default class SignUp extends Vue {
}
</script>

<style lang="scss"></style>
