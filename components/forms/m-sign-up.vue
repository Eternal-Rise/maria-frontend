<template>
  <m-spinner :loading="loading">
    <b-form @submit.prevent="handleSubmit">
      <b-form-group label="Username">
        <b-form-input v-model.trim="form.username" type="text" required />
      </b-form-group>

      <b-form-group label="Password">
        <b-form-input v-model.trim="form.password" minlength="8" type="password" required />
      </b-form-group>

      <b-form-group description="Required for password restore" label="Email (optional)">
        <b-form-input v-model.trim="form.email" type="email" />
      </b-form-group>

      <b-alert :show="error.status" variant="danger">
        {{ error.message }}
      </b-alert>
      <b-button type="submit" variant="primary" class="w-100 font-weight-bold">Sign up</b-button>
    </b-form>
  </m-spinner>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MSpinner from '~/components/helpers/m-spinner.vue';

interface IForm {
  username: string;
  password: string;
  email: string;
}

@Component({
  components: {
    MSpinner,
  },
})
export default class MSignUp extends Vue {
  form: IForm = {
    username: '',
    password: '',
    email: '',
  };

  error: any = {
    message: '',
    status: false,
  };
  loading: boolean = false;

  handleSubmit() {
    this.loading = true;

    this.$axios({
      method: 'post',
      url: '/maria/auth',
      data: this.form,
    })
      .catch((err: any) => {
        console.log(err, err.error);
        const message = err && err.constraints && err.constraints.alreadyExist;
        if (message) {
          this.error.status = true;
          this.error.message = message;
        }
      })
      .then(() => {})
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        });
      });
  }
}
</script>

<style lang="scss" scoped></style>
