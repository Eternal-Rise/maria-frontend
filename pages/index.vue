<template>
  <m-spinner :loading="loading">
    <b-row align-v="center" class="mb-3">
      <b-col class="text-md-right text-center">
        Total viewed
        <span style="font-size: 1.25em">
          <animate-number
            v-if="statistic.totalViewed.days"
            :number="statistic.totalViewed.days"
            :speed="100"
            postfix="d"
          />
          <animate-number
            v-if="statistic.totalViewed.hours"
            :number="statistic.totalViewed.hours"
            :speed="50"
            postfix="h"
          />
          <animate-number
            v-if="statistic.totalViewed.minutes"
            :number="statistic.totalViewed.minutes"
            :speed="10"
            postfix="m"
          />
        </span>
      </b-col>
      <b-col cols="12" md="5" xl="5">
        <div class="progress">
          <div class="progress__bar" :style="{ transform: `scale(${viewedPercent}, 1)` }" />
        </div>
      </b-col>
      <b-col class="text-md-left text-center">
        <span style="font-size: 1.25em">
          <animate-number
            v-if="statistic.totalToView.days"
            :number="statistic.totalToView.days"
            :speed="100"
            postfix="d"
          />
          <animate-number
            v-if="statistic.totalToView.hours"
            :number="statistic.totalToView.hours"
            :speed="50"
            postfix="h"
          />
          <animate-number
            v-if="statistic.totalToView.minutes"
            :number="statistic.totalToView.minutes"
            :speed="10"
            postfix="m"
          />
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
import {
  IMediaDelete,
  IMediaAny,
  iMediaBulk,
  IMediaSerial,
  IMedia,
  IStatisticComplex,
  IStatistic,
} from '~/helpers/interfaces';
import { MEDIA_SERIAL_TYPES } from '~/helpers/constants';
import { formatDuration } from '~/helpers/formaters';
import AnimateNumber from '~/components/animate-number.vue';
import MSpinner from '~/components/helpers/m-spinner.vue';
import MediaList from '~/components/media/media-list.vue';

@Component({
  auth: false,
  components: {
    AnimateNumber,
    MSpinner,
    MediaList,
  },
})
export default class Index extends Vue {
  formatDuration = formatDuration;
  loading: boolean = true;
  media: iMediaBulk[] = [
    { list: [], title: 'Animes', mediaType: 'anime' },
    { list: [], title: 'Anime Serials', mediaType: 'anime-serial' },
    { list: [], title: 'Films', mediaType: 'film' },
    { list: [], title: 'Serials', mediaType: 'serial' },
    { list: [], title: 'Others', mediaType: 'other' },
  ];

  statistic: IStatisticComplex = {
    total: { days: 0, hours: 0, minutes: 0 },
    totalToView: { days: 0, hours: 0, minutes: 0 },
    totalViewed: { days: 0, hours: 0, minutes: 0 },
  };

  viewedPercent = 0;

  get loggedIn(): boolean {
    return this.$auth.loggedIn;
  }

  getMinutes(total: IStatistic): number {
    return total.days * 24 * 60 + total.hours * 60 + total.minutes;
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

  mounted() {
    this.$axios({
      method: 'get',
      url: '/media',
    })
      .then(({ data }: any) => {
        this.media = data;
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });

    this.$axios({
      method: 'get',
      url: '/media/statistic',
    }).then(({ data }: any) => {
      this.statistic = data;

      this.viewedPercent = this.getMinutes(data.totalViewed) / this.getMinutes(data.total);
    });
  }
}
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  &__bar {
    width: 100%;
    background-color: $blue;
    transform-origin: left;
    transition: 1.8s cubic-bezier(0.53, 0.89, 0.73, 0.89);
  }
}
</style>
