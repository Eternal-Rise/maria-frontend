<template>
  <b-row align-content="between">
    <b-col cols="12">
      <b-button-group class="mb-3 w-100">
        <b-button :to="{ name: 'index' }" :variant="getVariant('index')" class="nav__link _home w-100">
          <nuxt-logo :width="36" :height="20" class="mb-1" />
          {{ $auth.user.username }}
        </b-button>
        <b-button :to="{ name: 'profile' }" :variant="getVariant('profile')">
          <b-icon icon="gear" />
        </b-button>
      </b-button-group>
      <b-button-group class="mb-1 w-100">
        <b-button v-b-toggle.friends class="nav__link w-100" variant="outline-primary">
          Friends
        </b-button>
        <b-button id="make-friend" variant="primary">
          <b-icon icon="plus" />
        </b-button>
      </b-button-group>

      <b-collapse id="friends" class="overflow-auto" style="max-height: 500px">
        <template v-if="friends.length > 0">
          <m-friends type="list" :friends="friends" />
        </template>
        <b-alert v-else class="m-0" show>You haven't friends yes :(</b-alert>
      </b-collapse>

      <b-button v-if="showBlacklist" v-b-toggle.blockedUsers class="mt-1 mb-1 w-100">
        Blacklist
      </b-button>
      <b-collapse id="blockedUsers" class="overflow-auto" style="max-height: 500px">
        <m-blocked-users :blocked-users="blockedUsers" />
      </b-collapse>
    </b-col>

    <b-col cols="12">
      <b-button @click="$auth.logout()" class="w-100">
        Logout
      </b-button>
    </b-col>

    <b-popover target="make-friend" triggers="click" placement="bottomRight">
      <m-add-friend />
      <m-invites type="requests" :users="requests" class="mt-2" />
      <m-invites type="invites" :users="invites" class="mt-2" />
    </b-popover>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BIcon, BIconPlus, BIconGear } from 'bootstrap-vue';
import { IUser } from '../helpers/interfaces';
import MAddFriend from '~/components/friends/m-add-friend.vue';
import MBlockedUsers from '~/components/friends/m-blocked-users.vue';
import MFriends from '~/components/friends/m-friends.vue';
import MInvites from '~/components/friends/m-invites.vue';
import NuxtLogo from '~/components/nuxt-logo.vue';

@Component({
  components: {
    BIcon,
    BIconGear,
    BIconPlus,
    MAddFriend,
    MBlockedUsers,
    MFriends,
    MInvites,
    NuxtLogo,
  },
})
export default class MNav extends Vue {
  getVariant(name: string): string {
    const current = this.$route.name || '';

    return new RegExp(`^${name}`).test(current) ? 'primary' : 'secondary';
  }

  get blockedUsers(): IUser[] {
    return (this.$auth.user && this.$auth.user.blockedUsers.list) || [];
  }

  get friends(): IUser[] {
    return (this.$auth.user && this.$auth.user.friends.list) || [];
  }

  get invites(): IUser[] {
    return (this.$auth.user && this.$auth.user.friends.invites) || [];
  }

  get requests(): IUser[] {
    return (this.$auth.user && this.$auth.user.friends.requests) || [];
  }

  get showBlacklist(): boolean {
    return this.$route.name === 'profile' && this.blockedUsers.length > 0;
  }

  handleLogout(): void {
    this.$auth.logout();
  }
}
</script>

<style lang="scss" scoped></style>
