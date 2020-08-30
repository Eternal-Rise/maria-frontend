<template>
  <div class="m-spinner">
    <div v-if="loading" class="m-spinner__wrapp">
      <i-loader :variant="variant" />
    </div>
    <div :class="['m-spinner__content', { _loading: loading }]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MSpinner extends Vue {
  @Prop({ required: true, type: Boolean })
  readonly loading!: boolean;

  get variant() {
    return this.$inkline.config.variant === 'light' ? 'dark' : 'light';
  }
}
</script>

<style lang="scss">
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
