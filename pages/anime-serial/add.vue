<template>
  <media-form />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MediaForm from '~/components/media/media-form.vue';

@Component({
  components: {
    MediaForm,
  },
})
export default class Add extends Vue {}
</script>

<style lang="scss" scoped></style>
