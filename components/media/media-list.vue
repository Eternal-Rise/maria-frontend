<template>
  <div>
    <b-button-group class="w-100">
      <b-button v-b-toggle="type" class="w-100" variant="outline-primary">{{ title }}</b-button>
      <b-button
        v-if="controls"
        :to="{ name: 'media-add', params: { media: type } }"
        style="font-size: 1rem"
        variant="primary"
      >
        <b-icon icon="plus" />
      </b-button>
    </b-button-group>
    <b-collapse :id="type" class="pt-3">
      <div v-if="list.length">
        <media-view v-for="(media, i) of list" :key="i" :controls="controls" :media="media" :media-type="type" />
      </div>
      <b-alert v-else class="mt-2 text-center" show>
        {{ 'Your list is empty, my lord' }}
      </b-alert>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MediaView from '~/components/media/media-view.vue';
import { BIcon, BIconPlus } from 'bootstrap-vue';
import { IMedia, IMediaSerial, IMediaTypes } from '~/helpers/interfaces';

@Component({
  components: {
    BIcon,
    BIconPlus,
    MediaView,
  },
})
export default class MediaList extends Vue {
  @Prop({ default: false, required: false, type: Boolean })
  controls!: boolean;

  @Prop({ default: () => [], required: true, type: Array })
  list!: IMedia[] | IMediaSerial[];

  @Prop({ default: '', required: true, type: String })
  title!: string;

  @Prop({ default: '', required: true, type: String })
  type!: string;
}
</script>

<style lang="scss" scoped></style>
