<template>
  <media-default v-if="isDefault" />
  <media-serial v-else />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MediaDefault from '~/components/media/media-default.vue';
import MediaSerial from '~/components/media/media-serial.vue';

import { MEDIA_ALL_TYPES, MEDIA_TYPES } from '~/helpers/constants';

@Component({
  components: {
    MediaDefault,
    MediaSerial,
  },
  validate({ params }) {
    return (MEDIA_ALL_TYPES as string[]).includes(params.media);
  },
  async asyncData({ params }) {
    return {
      isDefault: MEDIA_TYPES.includes(params.media as any),
    };
  },
  data: () => ({
    isDefault: true,
  }),
})
export default class Add extends Vue {}
</script>

<style lang="scss" scoped></style>
