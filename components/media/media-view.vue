<template>
  <li :class="['list__item', { _watched: media.watched }, $inkline.config.variant]">
    <div class="list__item-block _title">
      <a
        v-if="media.link !== ''"
        :href="media.link"
        :title="media.title"
        class="list__item-link"
        rel="noreferrer noopener"
        v-text="media.title"
      />
      <span v-else class="list__item-link" v-text="media.title" :title="media.title" />
    </div>
    <div class="list__item-block _duration">
      <span class="list__item-span">Duration</span>
      {{ formatDuration(media.duration, media.totalSeries) }}

      <div v-if="Array.isArray(media.seasons)" class="seasons">
        <div
          v-for="(series, i) of media.seasons"
          :key="i"
          :class="['seasons__item', { _current: i + 1 === currentSeason }]"
        >
          {{ `Season ${i + 1} - ${series}` }}
          <template v-if="i + 1 < currentSeason">{{ ` / ${series}` }}</template>
          <template v-if="i + 1 === currentSeason">{{ ` / ${currentSearies}` }}</template>
        </div>
      </div>
    </div>
    <div class="list__item-block _year">
      <span class="list__item-span">Year</span>
      {{ media.year }}
    </div>
    <div class="list__item-block _genres">
      <span class="list__item-span">Genres</span>
      {{ genres }}
    </div>
    <div v-if="loggedIn" class="list__item-block _controls">
      <crud-buttons :id="media._id" :media-type="mediaType" @delete="handleDelete" />
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { IMediaAny, IMediaTypes, IUser } from '~/helpers/interfaces';
import CrudButtons from '~/components/helpers/crud-buttons.vue';
import { formatDuration } from '~/helpers/formaters';

@Component({
  components: {
    CrudButtons,
  },
})
export default class Index extends Vue {
  @Prop({ default: false, required: false, type: Boolean })
  controls!: boolean;

  @Prop({ default: {}, required: true, type: Object })
  media!: IMediaAny;

  @Prop({ required: true, type: String })
  mediaType!: IMediaTypes;

  formatDuration = formatDuration;

  get currentSeason(): number {
    return parseInt(this.media.toWatch ? this.media.toWatch.replace(/s(\d+)/, '$1') : 1);
  }

  get currentSearies(): number {
    return parseInt(this.media.toWatch ? this.media.toWatch.replace(/s\d+e(\d+)/, '$1') : 1);
  }

  get loggedIn(): boolean {
    return this.$auth.loggedIn;
  }

  @Emit('delete')
  handleDelete(mediaType: string, media: IMediaAny) {
    return { mediaType, media };
  }

  get genres(): string {
    return this.media.genres.sort().join(', ');
  }
}
</script>

<style lang="scss" scoped></style>
