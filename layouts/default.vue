<template>
  <b-container class="py-3 vh">
    <nav class="d-flex justify-content-between mb-3">
      <b-button-group class="nav__links">
        <b-button :to="{ name: 'index' }" :variant="getVariant('index')" class="nav__link _home">
          <nuxt-logo :width="36" :height="20" />
          Maria
        </b-button>
        <b-button :to="{ name: 'friends' }" :variant="getVariant('friends')" class="nav__link">
          Friends
        </b-button>
      </b-button-group>

      <b-button class="btn-logout" @click="handleLogout">Logout</b-button>
    </nav>
    <nuxt />
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
