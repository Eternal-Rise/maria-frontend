<template>
  <b-container class="py-3 vh">
    <nav class="d-flex justify-content-between mb-3">
      <b-button-group class="nav__links">
        <b-button :to="{ name: 'index' }" :variant="getVariant('index')" class="nav__link _home">
          <nuxt-logo :width="36" :height="20" />
          Maria
        </b-button>
        <b-button id="friends" class="nav__link" variant="outline-primary">
          Friends
        </b-button>
        <b-button id="make-friend" style="font-size: 1.2rem" variant="primary">
          <b-icon icon="plus" />
        </b-button>
      </b-button-group>

      <b-button class="btn-logout" @click="handleLogout">Logout</b-button>
    </nav>
    <nuxt />

    <b-popover target="friends" triggers="click" placement="bottomRight">
      <template v-if="friends.length > 0">
        <m-friends type="list" :users="friends" />
      </template>
      <b-alert v-else show>You haven't friends yes :(</b-alert>
    </b-popover>
    <b-popover target="make-friend" triggers="click" placement="bottomRight">
      <m-add-friend />
      <m-friends type="invites" :users="invites" class="mt-2" />
    </b-popover>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BIcon, BIconPlus } from 'bootstrap-vue';
import MAddFriend from '~/components/forms/m-add-friend.vue';
import MFriends from '~/components/forms/m-friends.vue';
import NuxtLogo from '~/components/nuxt-logo.vue';

@Component({
  components: {
    BIcon,
    BIconPlus,
    MAddFriend,
    MFriends,
    NuxtLogo,
  },
})
export default class Default extends Vue {
  getVariant(name: string): string {
    const current = this.$route.name || '';

    return new RegExp(`^${name}`).test(current) ? 'primary' : 'secondary';
  }

  get friends() {
    return this.$auth.user.friends.list;
  }

  get invites() {
    return this.$auth.user.friends.invites;
  }

  handleLogout(): void {
    this.$auth.logout();
  }
}
</script>

<style lang="scss"></style>
