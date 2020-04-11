<template>
  <b-row class="preview">
    <b-col cols="3">
      <div @click="showPreview">
        <b-img-lazy v-if="media.poster" :src="media.poster" blank class="preview__poster" />
        <b-img v-else src="~/static/img/poster-empty.svg" class="preview__poster" />
      </div>
    </b-col>
    <b-col cols="9">
      <b-row align-v="center" align-h="between" class="mb-2">
        <b-col cols="10">
          <h1 class="font-weight-light">
            <b-link
              v-if="media.link && media.link !== ''"
              v-text="media.title"
              :href="media.link"
              class="preview__link"
            />
            <template v-else>
              {{ media.title }}
            </template>
          </h1>
        </b-col>
        <b-col v-if="controls" class="d-flex justify-content-end">
          <crud-buttons :id="media._id" :friend="friend" :media-type="mediaType" @delete="handleDelete" />
        </b-col>
      </b-row>

      <div class="grid mb-4">
        <div class="grid__tile _4">
          <span class="preview__label">Director:</span>
          <span class="preview__value">{{ media.director || '?' }}</span>
        </div>
        <div class="grid__tile _4">
          <span class="preview__label">Release:</span>
          <span class="preview__value">{{ media.releaseDate || '?' }}</span>
        </div>
        <div class="grid__tile _4">
          <span class="preview__label">Duration:</span>
          <span class="preview__value">{{ formatDuration(media.duration) }}</span>
        </div>
        <div v-if="media.season" class="grid__tile _3">
          <span class="preview__label">Seasons:</span>
          <span class="preview__value">{{ media.seasonsAmount }}</span>
        </div>
        <div v-if="media.season" class="grid__tile _3">
          <span class="preview__label">Season:</span>
          <span class="preview__value">{{ media.season }}</span>
        </div>
        <div v-if="media.season" class="grid__tile _3">
          <span class="preview__label">Series:</span>
          <span class="preview__value">{{ media.seriesInSeason }}</span>
        </div>
        <div v-if="media.season" class="grid__tile _3">
          <span class="preview__label">To watch</span>
          <span class="preview__value">{{ media.toWatch }}</span>
        </div>
        <div class="grid__tile _12">
          <span class="preview__label">Genre:</span>
          <span class="preview__value">{{ genres }}</span>
        </div>
      </div>

      <p v-text="media.description" class="preview__description" />
    </b-col>
    <vue-easy-lightbox :imgs="poster" :visible="lightbox" @hide="lightbox = false" />
  </b-row>
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

  @Prop({ default: () => {}, required: false, type: Object })
  friend!: IUser;

  @Prop({ default: {}, required: true, type: Object })
  media!: IMediaAny;

  @Prop({ required: true, type: String })
  mediaType!: IMediaTypes;

  formatDuration = formatDuration;
  lightbox: boolean = false;

  @Emit('delete')
  handleDelete(mediaType: string, media: IMediaAny) {
    return { mediaType, media };
  }

  get genres(): string {
    return this.media.genre.sort().join(', ');
  }

  get poster(): string {
    return this.media.poster === '' ? require('~/static/img/poster-empty.svg') : this.media.poster;
  }

  showPreview() {
    this.lightbox = true;

    console.log('clicked');
  }
}
</script>

<style lang="scss" scoped></style>
