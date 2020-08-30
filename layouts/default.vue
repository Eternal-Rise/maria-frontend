<template>
  <i-layout>
    <i-layout-header>
      <i-nav>
        <i-nav-item :to="{ name: 'index' }">
          <nuxt-logo :width="36" :height="20" />
          Maria
        </i-nav-item>
        <i-nav-item>
          <i-dropdown>
            <i-button>Create</i-button>
            <i-dropdown-menu>
              <i-dropdown-item :to="{ name: 'media-add', params: { media: 'anime' } }">
                Anime
              </i-dropdown-item>
              <i-dropdown-item :to="{ name: 'media-add', params: { media: 'anime-serial' } }">
                Anime Serial
              </i-dropdown-item>
              <i-dropdown-item :to="{ name: 'media-add', params: { media: 'film' } }">
                Film
              </i-dropdown-item>
              <i-dropdown-item :to="{ name: 'media-add', params: { media: 'serial' } }">
                Serial
              </i-dropdown-item>
              <i-dropdown-item :to="{ name: 'media-add', params: { media: 'other' } }">
                Other
              </i-dropdown-item>
            </i-dropdown-menu>
          </i-dropdown>
        </i-nav-item>
      </i-nav>
    </i-layout-header>

    <i-layout-content>
      <i-container fluid>
        <i-row center>
            <i-column xl="10">
              <nuxt />
            </i-column>
        </i-row>
      </i-container>
    </i-layout-content>

    <i-layout-footer>
      <i-container>
        <i-row center>
          <i-column lg="8">
            <i-button block @click="$auth.logout()">
              Logout
            </i-button>
          </i-column>
        </i-row>
      </i-container>
    </i-layout-footer>
  </i-layout>
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
    return this.$auth && this.$auth.loggedIn;
  }
}
</script>

<style lang="scss">
.layout {
  min-height: 100vh;
}
</style>
