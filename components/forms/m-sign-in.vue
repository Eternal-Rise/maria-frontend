<template>
  <m-spinner :loading="loading">
    <b-form @submit.prevent="handleSubmit">
      <b-form-group label="Username">
        <b-form-input v-model.trim="form.username" type="text" required />
      </b-form-group>
      <b-form-group label="Password">
        <b-form-input v-model.trim="form.password" minlength="8" type="password" required />
      </b-form-group>

      <b-alert :show="error" variant="danger">
        Wrong credentials
      </b-alert>
      <b-button type="submit" variant="primary" class="w-100 font-weight-bold">Sign in</b-button>
    </b-form>
  </m-spinner>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MSpinner from '~/components/helpers/m-spinner.vue';

interface IForm {
  username: string;
  password: string;
}

@Component({
  components: {
    MSpinner,
  },
})
export default class MSignIn extends Vue {
  form: IForm = {
    username: '',
    password: '',
  };

  error: boolean = false;
  loading: boolean = false;

  handleSubmit() {
    this.loading = true;

    this.$auth
      .loginWith('local', {
        data: this.form,
      })
      .catch((err: any) => {
        this.error = true;
      })
      .then(() => {
        if (this.$auth.loggedIn) {
          this.error = false;
        }
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
  }
}
</script>

<style lang="scss" scoped></style>
