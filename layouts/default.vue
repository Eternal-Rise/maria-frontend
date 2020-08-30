<template>
  <i-layout>
    <i-layout-header>
      <client-only>
        <i-nav v-if="loggedIn">
          <i-nav-item :to="{ name: 'index' }">
            <nuxt-logo :width="36" :height="20" />
            Maria
          </i-nav-item>
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
        </i-nav>
      </client-only>
      <i-button :class="['theme-switcher', { _fixed: loggedIn }]" @click="switchTheme">
        <i-icon :icon="theme" />
      </i-button>
    </i-layout-header>

    <i-layout-content>
      <i-container fluid>
        <i-row center class="_padding-y-2">
          <i-column xl="10">
            <nuxt />
          </i-column>
        </i-row>
      </i-container>
    </i-layout-content>

    <client-only>
      <i-layout-footer v-if="loggedIn">
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
    </client-only>
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

  get theme(): string {
    return this.$inkline.config.variant;
  }

  switchTheme() {
    this.$inkline.config.variant = this.theme === 'light' ? 'dark' : 'light';
  }
}
</script>

<style lang="scss">
.layout {
  min-height: 100vh;

  &-header {
    position: relative;
  }

  .theme-switcher {
    display: block !important;
    margin: 0 auto;

    &._fixed {
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
