<template>
  <media-form friend />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MediaForm from '~/components/media/media-form.vue';
import { MEDIA_ALL_TYPES } from '~/helpers/constants';

@Component({
  components: {
    MediaForm,
  },
  validate({ params }) {
    return (MEDIA_ALL_TYPES as string[]).includes(params.media);
  },
})
export default class Add extends Vue {}
</script>

<style lang="scss" scoped></style>
