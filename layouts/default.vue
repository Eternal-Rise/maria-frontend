<template>
  <b-container :class="['d-flex', 'flex-column', 'vh', `${loggedIn ? 'py-3' : 'py-5'}`]">
    <b-nav v-if="loggedIn" class="mb-5">
      <b-nav-item :to="{ name: 'index' }">
        <nuxt-logo :width="36" :height="20" class="mb-1" />
        Maria
      </b-nav-item>
      <b-nav-item-dropdown id="nav" text="Create">
        <b-dropdown-item :to="{ name: 'media-add', params: { media: 'anime' } }">
          Anime
        </b-dropdown-item>
        <b-dropdown-item :to="{ name: 'media-add', params: { media: 'anime-serial' } }">
          Anime Serial
        </b-dropdown-item>
        <b-dropdown-item :to="{ name: 'media-add', params: { media: 'film' } }">
          Film
        </b-dropdown-item>
        <b-dropdown-item :to="{ name: 'media-add', params: { media: 'serial' } }">
          Serial
        </b-dropdown-item>
        <b-dropdown-item :to="{ name: 'media-add', params: { media: 'other' } }">
          Other
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>

    <b-row align-h="center" class="mb-5">
      <b-col cols="12" xl="10">
        <nuxt />
      </b-col>
    </b-row>

    <b-row v-if="loggedIn" align-h="center" style="margin-top: auto">
      <b-col cols="12" md="6" xl="4">
        <b-button @click="$auth.logout()" class="w-100">
          Logout
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NuxtLogo from '~/components/nuxt-logo.vue';

@Component({
  components: {
    NuxtLogo,
  },
})
export default class Default extends Vue {
  get loggedIn(): boolean {
    return this.$auth.loggedIn;
  }

  getVariant(name: string): string {
    const current = this.$route.name || '';

    return new RegExp(`^${name}`).test(current) ? 'primary' : 'secondary';
  }

  handleLogout(): void {
    this.$auth.logout();
  }
}
</script>

<style lang="scss"></style>
