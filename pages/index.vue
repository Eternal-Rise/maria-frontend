<template>
  <m-spinner :loading="loading">
    <b-row class="align-items-center flex-column">
      <b-col lg="8" class="mb-3">
        <b-button-group class="w-100">
          <b-button v-b-toggle.anime class="w-100" variant="outline-primary">Anime</b-button>
          <b-button :to="{ name: 'media-add', params: { media: 'anime' } }" style="font-size: 1.2rem" variant="primary">
            <b-icon icon="plus" />
          </b-button>
        </b-button-group>
        <b-collapse id="anime" class="pt-3">
          <media-list :list="animes" media-type="anime" />
        </b-collapse>
      </b-col>
      <b-col lg="8" class="mb-3">
        <b-button-group class="w-100">
          <b-button v-b-toggle.anime-serials class="w-100" variant="outline-primary">Anime Serials</b-button>
          <b-button
            :to="{ name: 'media-add', params: { media: 'anime-serial' } }"
            style="font-size: 1.2rem"
            variant="primary"
          >
            <b-icon icon="plus" />
          </b-button>
        </b-button-group>
        <b-collapse id="anime-serials" class="pt-3">
          <media-list :list="animeSerials" media-type="anime-serial" />
        </b-collapse>
      </b-col>
      <b-col lg="8" class="mb-3">
        <b-button-group class="w-100">
          <b-button v-b-toggle.films class="w-100" variant="outline-primary">Films</b-button>
          <b-button :to="{ name: 'media-add', params: { media: 'film' } }" style="font-size: 1.2rem" variant="primary">
            <b-icon icon="plus" />
          </b-button>
        </b-button-group>
        <b-collapse id="films" class="pt-3">
          <media-list :list="films" media-type="film" />
        </b-collapse>
      </b-col>
      <b-col lg="8" class="mb-3">
        <b-button-group class="w-100">
          <b-button v-b-toggle.serials class="w-100" variant="outline-primary">Serials</b-button>
          <b-button
            :to="{ name: 'media-add', params: { media: 'serial' } }"
            style="font-size: 1.2rem"
            variant="primary"
          >
            <b-icon icon="plus" />
          </b-button>
        </b-button-group>
        <b-collapse id="serials" class="pt-3">
          <media-list :list="serials" media-type="serial" />
        </b-collapse>
      </b-col>
    </b-row>
  </m-spinner>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BIcon, BIconPlus } from 'bootstrap-vue';
import MSpinner from '~/components/helpers/m-spinner.vue';
import MediaList from '~/components/media/media-list.vue';

@Component({
  components: {
    BIcon,
    BIconPlus,
    MSpinner,
    MediaList,
  },
})
export default class Index extends Vue {
  loading: boolean = true;
  animeSerials: any[] = [];
  animes: any[] = [];
  films: any[] = [];
  serials: any[] = [];

  mounted() {
    const animeSerials = this.$axios.$get('/media/anime-serials');
    const animes = this.$axios.$get('/media/animes');
    const films = this.$axios.$get('/media/films');
    const serials = this.$axios.$get('/media/serials');

    Promise.all([animeSerials, animes, films, serials])
      .then(([animeSerials, animes, films, serials]) => {
        console.dir(animeSerials);
        console.dir(animes);
        console.dir(films);
        console.dir(serials);

        this.animeSerials = animeSerials;
        this.animes = animes;
        this.films = films;
        this.serials = serials;
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
