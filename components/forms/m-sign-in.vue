<template>
  <m-spinner :loading="loading">
    <i-form v-model="form" @submit.prevent="singIn">
      <i-form-group>
        <i-form-label>Username</i-form-label>
        <i-input :schema="form.username" type="text" />
      </i-form-group>
      <i-form-group class="_margin-bottom-1">
        <i-form-label>Password</i-form-label>
        <i-input :schema="form.password" type="password" />
      </i-form-group>

      <i-alert :show="error" variant="danger">
        Wrong credentials
      </i-alert>
      <i-button type="submit" variant="primary" block>Sign in</i-button>
    </i-form>
  </m-spinner>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MSpinner from '~/components/helpers/m-spinner.vue';

// interface IForm {
//   username: string;
//   password: string;
// }

import IPrototype from '@inkline/inkline/types/';

@Component({
  components: {
    MSpinner,
  },
})
export default class MSignIn extends Vue {
  formSchema = {
    username: {
      validators: [{ rule: 'required', message: 'Username is required' }],
    },
    password: {
      validators: [{ rule: 'required', message: 'Password is required' }],
    },
  };

  form = this.$inkline.form(this.formSchema);

  error: boolean = false;
  loading: boolean = false;

  singIn() {
    if (this.form.validate().valid) {
      this.loading = true;

      const credentials: { [key: string]: string } = {};

      for (const key of this.form.fields) {
        credentials[key] = this.form[key].value;
      }

      this.$auth
        .loginWith('local', {
          data: credentials,
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
}
</script>

<style lang="scss" scoped></style>
