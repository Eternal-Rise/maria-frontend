<template>
  <b-container class="py-5">
    <m-spinner :loading="loading">
      <b-row class="align-items-center flex-column">
        <b-col lg="8" class="mb-3">
          <b-button-group class="w-100">
            <b-button v-b-toggle.anime  class="w-100" variant="outline-primary">Anime</b-button>
            <b-button :to="{ name: 'add-media-anime' }" style="font-size: 1.2rem" variant="primary">
              <b-icon icon="plus"/>
            </b-button>
          </b-button-group>
          <b-collapse id="anime" class="pt-3">
            <m-animes :animes="media.animes" />
          </b-collapse>
        </b-col>
        <b-col lg="8" class="mb-3">
          <b-button-group class="w-100">
            <b-button v-b-toggle.anime-serials class="w-100" variant="outline-primary">Anime Serials</b-button>
            <b-button :to="{ name: 'add-media-anime-serials' }" style="font-size: 1.2rem" variant="primary">
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
            <b-button :to="{ name: 'add-media-films' }" style="font-size: 1.2rem" variant="primary">
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
            <b-button :to="{ name: 'add-media-serials' }" style="font-size: 1.2rem" variant="primary">
              <b-icon icon="plus" />
            </b-button>
          </b-button-group>
          <b-collapse id="serials">
            SERIALS
          </b-collapse>
        </b-col>
      </b-row>
    </m-spinner>
    <btn-logout />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BIcon, BIconPlus } from 'bootstrap-vue';
import BtnLogout from '~/components/btn-logout.vue';
import MAnimes from '~/components/media/m-animes.vue';
import MSpinner from '~/components/helpers/m-spinner.vue';

@Component({
  components: {
    BIcon,
    BIconPlus,
    BtnLogout,
    MAnimes,
    MSpinner,
  },
})
export default class Index extends Vue {
  loading: boolean = true;
  media: any = {
    animeSerials: [],
    animes: [],
    films: [],
    serials: [],
  };

  mounted() {
    const animeSerials = this.$axios.$get('/media/anime-serials');
    const animes = this.$axios.$get('/media/animes');
    const films = this.$axios.$get('/media/films');
    const serials = this.$axios.$get('/media/serials');

    Promise
      .all([animeSerials, animes, films, serials])
      .then(([animeSerials, animes, films, serials]) => {

        console.dir(animeSerials);
        console.dir(animes);
        console.dir(films);
        console.dir(serials);

        this.media.animeSerials = animeSerials;
        this.media.animes = animes;
        this.media.films = films;
        this.media.serials = serials;
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 200)
      })
  }
}
</script>

<style lang="scss" scoped></style>
