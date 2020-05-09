<template>
  <m-spinner :loading="loading">
    <media-list
      v-for="item of media"
      :key="item.mediaType"
      :list="item.list"
      :media-type="item.mediaType"
      :title="item.title"
      class="mb-3"
      controls
      @delete="handleDelete"
    />
  </m-spinner>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MSpinner from '~/components/helpers/m-spinner.vue';
import MediaList from '~/components/media/media-list.vue';
import { IMediaDelete, IMediaAny, iMediaBulk } from '~/helpers/interfaces';

@Component({
  components: {
    MSpinner,
    MediaList,
  },
})
export default class Index extends Vue {
  loading: boolean = true;
  media: iMediaBulk[] = [
    { list: [], title: 'Anime Serials', mediaType: 'anime-serial' },
    { list: [], title: 'Anime', mediaType: 'anime' },
    { list: [], title: 'Films', mediaType: 'film' },
    { list: [], title: 'Serials', mediaType: 'serial' },
  ];

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

  mounted() {
    const animeSerials = this.$axios.$get('/media/anime-serials');
    const animes = this.$axios.$get('/media/animes');
    const films = this.$axios.$get('/media/films');
    const serials = this.$axios.$get('/media/serials');

    Promise.all([animeSerials, animes, films, serials])
      .then(([animeSerials, animes, films, serials]) => {
        this.media[0].list = animeSerials;
        this.media[1].list = animes;
        this.media[2].list = films;
        this.media[3].list = serials;
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
