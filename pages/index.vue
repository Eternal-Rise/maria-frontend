<template>
  <m-spinner :loading="loading">
    <b-row align-v="center" class="mb-3">
      <b-col class="text-md-right text-center">
        Total viewed
        <span style="font-size: 1.25em">
          {{ formatDuration(totalWatched) }}
        </span>
      </b-col>
      <b-col cols="12" md="5" xl="5">
        <b-progress :max="totalHours" height="2em">
          <b-progress-bar :value="totalWatched" variant="primary" />
        </b-progress>
      </b-col>
      <b-col class="text-md-left text-center">
        <span style="font-size: 1.25em">
          {{ formatDuration(totalToWatch) }}
        </span>
        Total to view
      </b-col>
    </b-row>

    <media-list
      v-for="item of media"
      :key="item.mediaType"
      :controls="loggedIn"
      :list="item.list"
      :media-type="item.mediaType"
      :title="item.title"
      class="mb-3"
      @delete="handleDelete"
    />
  </m-spinner>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MSpinner from '~/components/helpers/m-spinner.vue';
import MediaList from '~/components/media/media-list.vue';
import { IMediaDelete, IMediaAny, iMediaBulk, IMediaSerial, IMedia } from '~/helpers/interfaces';
import { MEDIA_SERIAL_TYPES } from '~/helpers/constants';
import { formatDuration } from '~/helpers/formaters';

@Component({
  auth: false,
  components: {
    MSpinner,
    MediaList,
  },
})
export default class Index extends Vue {
  formatDuration = formatDuration;
  loading: boolean = true;
  media: iMediaBulk[] = [
    { list: [], title: 'Anime Serials', mediaType: 'anime-serial' },
    { list: [], title: 'Anime', mediaType: 'anime' },
    { list: [], title: 'Films', mediaType: 'film' },
    { list: [], title: 'Serials', mediaType: 'serial' },
    { list: [], title: 'Others', mediaType: 'other' },
  ];

  totalToWatch = 0;
  totalWatched = 0;
  totalHours = 0;

  get loggedIn(): boolean {
    return this.$auth.loggedIn;
  }

  handleDelete({ media, mediaType }: IMediaDelete): void {
    const i = this.media.findIndex(m => m.mediaType === mediaType);

    if (i >= 0) {
      this.media[i].list = this.media[i].list.filter(m => m._id !== media._id);

      this.$bvToast.toast(`You have deleted ${media.title}`, {
        title: 'Success',
        variant: 'success',
        solid: true,
      });
    }
  }

  serialHours(serials: IMediaSerial[], i = 0) {
    const { duration, watched } = serials[i] || {};

    if (duration) {
      this.totalHours += serials[i].totalSeries * duration;

      const season = +serials[i].toWatch.replace(/s(\d+)e\d+/, '$1');
      const series = +serials[i].toWatch.replace(/s\d+e(\d+)/, '$1');

      if (season > 1) {
        this.totalWatched +=
          serials[i].seasons.slice(0, season - 1).reduce((a: number, b: number) => a + b, 0) * duration;
      }

      this.totalWatched += duration * (watched ? series : series - 1);
      this.totalToWatch = this.totalHours - this.totalWatched;
      i += 1;
      if (i === serials.length) return;

      setTimeout(() => {
        this.serialHours(serials, i);
      }, 25);
    }
  }

  filmHours(films: IMedia[], i = 0) {
    const { duration, watched } = films[i] || {};

    if (duration) {
      this.totalHours += duration;
      if (watched) this.totalWatched += duration;

      this.totalToWatch = this.totalHours - this.totalWatched;
      i += 1;
      if (i === films.length) return;

      setTimeout(() => {
        this.filmHours(films, i);
      }, 25);
    }
  }

  mounted() {
    const animeSerials = this.$axios.$get('/media/anime-serials');
    const animes = this.$axios.$get('/media/animes');
    const films = this.$axios.$get('/media/films');
    const serials = this.$axios.$get('/media/serials');
    const others = this.$axios.$get('/media/others');

    Promise.all([animeSerials, animes, films, serials, others])
      .then(([animeSerials, animes, films, serials, others]) => {
        this.media[0].list = animeSerials;
        this.media[1].list = animes;
        this.media[2].list = films;
        this.media[3].list = serials;
        this.media[4].list = others;

        for (const media of this.media) {
          if (MEDIA_SERIAL_TYPES.some(type => type === media.mediaType)) {
            this.serialHours(media.list as IMediaSerial[]);
          } else {
            this.filmHours(media.list);
          }
        }
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
  }
}
</script>

<style lang="scss" scoped></style>
