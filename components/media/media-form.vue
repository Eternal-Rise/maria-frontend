<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MediaForm extends Vue {
  @Prop({ required: true, type: Object })
  fields!: {
    type: string;
    required: boolean;
  };
}
</script>

<style lang="scss" scoped></style>
