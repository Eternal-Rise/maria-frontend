<template>
  <b-row cols="2" align-h="center" class="pt-5">
    <b-col>
      <m-spinner :loading="loading">
        <b-form @submit.prevent="handleSubmit" class="mb-5">
          <b-form-group label="Username">
            <b-form-input v-model="form.username" />
          </b-form-group>
          <b-form-group label="Email">
            <b-form-input v-model="form.email" type="email" />
          </b-form-group>

          <b-row align-h="end">
            <b-col cols="auto">
              <b-button variant="primary" type="submit">Submit</b-button>
            </b-col>
          </b-row>
        </b-form>
      </m-spinner>

      <b-button v-b-modal.delete-account class="w-100" variant="danger">
        Delete account
      </b-button>

      <b-modal id="delete-account" title="Confirm to delete account" ok-variant="danger" @ok="deleteAccount">
        <p class="m-0">
          We will be miss for you
        </p>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IProfile } from '../helpers/interfaces';
import MSpinner from '~/components/helpers/m-spinner.vue';

@Component({
  components: {
    MSpinner,
  },
})
export default class Profile extends Vue {
  form: IProfile = {
    email: '',
    username: '',
  };

  loading: boolean = false;

  handleSubmit() {
    this.loading = true;

    this.$axios({
      method: 'put',
      url: '/user',
      data: this.form,
    })
      .then(() => {
        this.$bvToast.toast('Profile updated', {
          title: 'Success',
          variant: 'success',
          solid: true,
        });

        this.$auth.fetchUser();
      })
      .catch(({ response: res }) => {
        if (res.status === 500) {
          this.$bvToast.toast('Internal server error', {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
        } else {
          let message = '';

          for (const [key, value] of Object.entries(res.data.constraints)) {
            message += `${value}\n`;
          }
          this.$bvToast.toast(message, {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
        }
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
  }

  deleteAccount() {
    this.$axios({
      method: 'delete',
      url: '/user',
    }).then(() => {
      this.$auth.logout();
    });
  }

  created() {
    const user = this.$auth.user;

    this.form.email = user.email;
    this.form.username = user.username;
  }

  mounted() {}
}
</script>

<style lang="scss" scoped></style>
