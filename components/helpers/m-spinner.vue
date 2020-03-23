<template>
  <div class="m-spinner">
    <div v-if="loading" class="m-spinner__wrapp">
      <b-spinner variant="primary" />
    </div>
    <div :class="loading ? '_loading' : ''" class="m-spinner__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class NSpinner extends Vue {
  @Prop({ required: true, type: Boolean })
  readonly loading!: boolean;
}
</script>

<style lang="scss" scoped>
.m-spinner {
  // for spinner
  position: relative;

  &__content {
    transition: 0.2s;

    &._loading {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__wrapp {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
