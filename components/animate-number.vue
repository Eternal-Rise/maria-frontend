<template>
  <span v-text="displayNumber" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AnimateNumber extends Vue {
  @Prop({ required: false, type: String, default: '' })
  prefix!: string;

  @Prop({ required: false, type: String, default: '' })
  postfix!: string;

  @Prop({ required: true, type: Number })
  number!: number;

  @Prop({ required: false, type: Number, default: 50 })
  speed!: number;

  currentNumber = 0;

  get displayNumber() {
    return this.prefix + this.currentNumber + this.postfix;
  }

  created() {
    const interval = setInterval(() => {
      if (this.currentNumber >= this.number) clearInterval(interval);
      else this.currentNumber += 1;
    }, this.speed);
  }
}
</script>

<style lang="scss" scoped></style>
