<template>
  <b-form style="min-width: 300px" @submit.prevent="makeFriend">
    <b-input-group>
      <b-input v-model.trim="username" placeholder="username" required />
      <b-input-group-append>
        <b-button type="submit" variant="primary">make friend</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MAddFriend extends Vue {
  username: string = '';

  makeFriend() {
    this.$axios({
      method: 'post',
      url: `/friends`,
      data: { username: this.username },
    })
      .then(() => {
        this.$bvToast.toast(`Just wait when ${this.username} accept your request`, {
          title: 'Success',
          variant: 'success',
          solid: true,
        });
        this.$auth.fetchUser();
      })
      .catch(({ response: { data: err } }) => {
        let message!: string;

        if (err.statusCode === 404) {
          message = 'Not found';
        } else message = err.constraints && err.constraints.message;

        this.$bvToast.toast(message, {
          title: 'Error',
          variant: 'danger',
          solid: true,
        });
      });
  }
}
</script>

<style lang="scss" scoped></style>
