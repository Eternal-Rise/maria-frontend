<template>
  <m-spinner :loading="loading">
    <b-alert :show="error" variant="danger">Unauthorized</b-alert>
    <template v-if="!error">
      <media-list
        v-for="item of media"
        :key="item.mediaType"
        :list="item.list"
        :title="item.title"
        :media-type="item.mediaType"
        :friend="friend"
        class="mb-3"
        controls
        @delete="handleDelete"
      />
    </template>
  </m-spinner>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IMediaDelete, iMediaBulk } from '~/helpers/interfaces';
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
  media: iMediaBulk[] = [
    { list: [], title: 'Anime Serials', mediaType: 'anime-serial' },
    { list: [], title: 'Anime', mediaType: 'anime' },
    { list: [], title: 'Films', mediaType: 'film' },
    { list: [], title: 'Serials', mediaType: 'serial' },
  ];

  get friend() {
    const friends = this.$auth.user && this.$auth.user.friends.list;

    if (friends && friends.length) {
      return friends.find((friend: any) => friend.username === this.$route.params.friend);
    }
  }

  // TODO: fix bug, when delete lastone
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
    if (this.friend) {
      const animeSerials = this.$axios.$get(`/media/${this.friend._id}/anime-serials`);
      const animes = this.$axios.$get(`/media/${this.friend._id}/animes`);
      const films = this.$axios.$get(`/media/${this.friend._id}/films`);
      const serials = this.$axios.$get(`/media/${this.friend._id}/serials`);

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
    } else {
      this.error = true;
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped></style>
