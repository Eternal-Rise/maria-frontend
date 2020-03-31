<template>
  <m-spinner :loading="loading">
    <b-row class="align-items-center flex-column">
      <b-col lg="8" class="mb-3">
        <b-button-group class="w-100">
          <b-button v-b-toggle.anime class="w-100" variant="outline-primary">Anime</b-button>
          <b-button :to="{ name: 'anime-add' }" style="font-size: 1.2rem" variant="primary">
            <b-icon icon="plus" />
          </b-button>
        </b-button-group>
        <b-collapse id="anime" class="pt-3">
          <media-view v-for="(anime, i) of animes" :key="i" :media="anime" media-type="anime" />
        </b-collapse>
      </b-col>
      <b-col lg="8" class="mb-3">
        <b-button-group class="w-100">
          <b-button v-b-toggle.anime-serials class="w-100" variant="outline-primary">Anime Serials</b-button>
          <b-button :to="{ name: 'anime-serials-add' }" style="font-size: 1.2rem" variant="primary">
            <b-icon icon="plus" />
          </b-button>
        </b-button-group>
        <b-collapse id="anime-serials">
          ANIME SERIALS
        </b-collapse>
      </b-col>
      <b-col lg="8" class="mb-3">
        <b-button-group class="w-100">
          <b-button v-b-toggle.films class="w-100" variant="outline-primary">Films</b-button>
          <b-button :to="{ name: 'films-add' }" style="font-size: 1.2rem" variant="primary">
            <b-icon icon="plus" />
          </b-button>
        </b-button-group>
        <b-collapse id="films">
          FILMS
        </b-collapse>
      </b-col>
      <b-col lg="8" class="mb-3">
        <b-button-group class="w-100">
          <b-button v-b-toggle.serials class="w-100" variant="outline-primary">Serials</b-button>
          <b-button :to="{ name: 'serials-add' }" style="font-size: 1.2rem" variant="primary">
            <b-icon icon="plus" />
          </b-button>
        </b-button-group>
        <b-collapse id="serials">
          SERIALS
        </b-collapse>
      </b-col>
    </b-row>
  </m-spinner>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BIcon, BIconPlus } from 'bootstrap-vue';
import MSpinner from '~/components/helpers/m-spinner.vue';
import MediaView from '~/components/media/media-view.vue';

@Component({
  components: {
    BIcon,
    BIconPlus,
    MSpinner,
    MediaView,
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
