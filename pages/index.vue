<template>
  <m-spinner :loading="loading">
    <b-row class="align-items-center flex-column">
      <b-col v-for="item of media" :key="item.type" lg="8" class="mb-3">
        <media-list :list="item.list" :title="item.title" :type="item.type" controls />
      </b-col>
    </b-row>
  </m-spinner>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MSpinner from '~/components/helpers/m-spinner.vue';
import MediaList from '~/components/media/media-list.vue';

@Component({
  components: {
    MSpinner,
    MediaList,
  },
})
export default class Index extends Vue {
  loading: boolean = true;
  media: any[] = [
    { list: [], title: 'Anime Serials', type: 'anime-serial' },
    { list: [], title: 'Anime', type: 'anime' },
    { list: [], title: 'Films', type: 'film' },
    { list: [], title: 'Serials', type: 'serial' },
  ];

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
