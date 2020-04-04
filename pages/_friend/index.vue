<template>
  <m-spinner :loading="loading">
    <b-alert :show="error" variant="danger">Unauthorized</b-alert>
    <b-row v-if="!error" class="align-items-center flex-column">
      <b-col v-for="item of media" :key="item.type" lg="8" class="mb-3">
        <media-list :list="item.list" :title="item.title" :type="item.type" />
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
  error: boolean = false;
  loading: boolean = true;
  media: any[] = [
    { list: [], title: 'Anime Serials', type: 'anime-serial' },
    { list: [], title: 'Anime', type: 'anime' },
    { list: [], title: 'Films', type: 'film' },
    { list: [], title: 'Serials', type: 'serial' },
  ];

  get friend() {
    const friends = this.$auth.user.friends.list;

    return friends.find((friend: any) => friend.username === this.$route.params.friend);
  }

  mounted() {
    if (this.friend) {
      const animeSerials = this.$axios.$get(`/media/${this.friend._id}/anime-serials`);
      const animes = this.$axios.$get(`/media/${this.friend._id}/animes`);
      const films = this.$axios.$get(`/media/${this.friend._id}/films`);
      const serials = this.$axios.$get(`/media/${this.friend._id}/serials`);

      Promise.all([animeSerials, animes, films, serials])
        .then(([animeSerials, animes, films, serials]) => {
          console.log(animeSerials);
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
    } else {
      this.error = true;
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped></style>
