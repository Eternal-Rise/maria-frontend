<template>
  <b-button class="btn-logout" @click="handleLogout">Logout</b-button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BtnLogout extends Vue {
  handleLogout(): void {
    this.$auth.logout();
  }
}
</script>

<style lang="scss" scoped>
.btn-logout {
  position: fixed;
  left: 1rem;
  bottom: 1rem;
}
</style>
