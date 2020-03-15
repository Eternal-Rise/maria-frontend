<template>
  <b-form @submit.prevent="handleSubmit">
    <b-form-group label="Username">
      <b-form-input v-model="form.username" type="text" required/>
    </b-form-group>
    <b-form-group label="Password">
      <b-form-input v-model="form.password" minlength="6" type="password" required/>
    </b-form-group>

    <b-button type="submit" variant="primary" class="w-100 font-weight-bold">Sign in</b-button>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface IForm {
  username: string;
  password: string;
}

@Component
export default class MSignIn extends Vue {
  form: IForm = {
    username: '',
    password: '',
  };

  handleSubmit() {
    this.$auth.loginWith('local', {
      data: this.form,
    });
  }
}
</script>

<style lang="scss" scoped></style>
