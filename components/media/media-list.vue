<template>
  <div v-if="list.length">
    <media-view v-for="(item, i) of list" :key="i" :media="item" :media-type="mediaType" />
  </div>
  <b-alert v-else class="mt-2 text-center" show>
    {{ 'Your list is empty, my lord' }}
  </b-alert>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MediaView from '~/components/media/media-view.vue';
import { IMedia, IMediaSerial, IMediaTypes } from '../../helpers/interfaces';

@Component({
  components: {
    MediaView,
  },
})
export default class MediaList extends Vue {
  @Prop({ default: () => [], required: true, type: Array })
  list!: IMedia[] | IMediaSerial[];

  @Prop({ required: true, type: String })
  mediaType!: IMediaTypes;
}
</script>

<style lang="scss" scoped></style>
