<template>
  <m-spinner :loading="loading">
    <i-row center middle class="_margin-bottom-2">
      <i-column class="_text-right">
        Total viewed
        <span style="font-size: 1.25em;">
          <animate-number
            :number="statistic && statistic.totalViewed && statistic.totalViewed.days"
            :speed="100"
            postfix="d"
          />
          <animate-number
            :number="statistic && statistic.totalViewed && statistic.totalViewed.hours"
            :speed="50"
            postfix="h"
          />
          <animate-number
            :number="statistic && statistic.totalViewed && statistic.totalViewed.minutes"
            :speed="10"
            postfix="m"
          />
        </span>
      </i-column>
      <i-column :md="5">
        <div class="progress">
          <div class="progress__bar" :style="{ transform: `scale(${viewedPercent}, 1)` }" />
        </div>
      </i-column>
      <i-column class="_text-left">
        <span style="font-size: 1.25em;">
          <animate-number
            :number="statistic && statistic.totalToView && statistic.totalToView.days"
            :speed="100"
            postfix="d"
          />
          <animate-number
            :number="statistic && statistic.totalToView && statistic.totalToView.hours"
            :speed="50"
            postfix="h"
          />
          <animate-number
            :number="statistic && statistic.totalToView && statistic.totalToView.minutes"
            :speed="10"
            postfix="m"
          />
        </span>
        Total to view
      </i-column>
    </i-row>

    <i-tabs>
      <i-tab v-for="item of media" :key="item.mediaType" :title="item.title">
        <media-list
          :controls="$auth.loggedIn"
          :list="item.list"
          :media-type="item.mediaType"
          :title="item.title"
          @delete="handleDelete"
        />
      </i-tab>
    </i-tabs>
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

  getMinutes(total: IStatistic): number {
    return total.days * 24 * 60 + total.hours * 60 + total.minutes;
  }

  handleDelete({ media, mediaType }: IMediaDelete): void {
    const i = this.media.findIndex(m => m.mediaType === mediaType);

    if (i >= 0) {
      this.media[i].list = this.media[i].list.filter(m => m._id !== media._id);

      // this.$bvToast.toast(`You have deleted ${media.title}`, {
      //   title: 'Success',
      //   variant: 'success',
      //   solid: true,
      // });
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
  background-color: $color-light;
  border: 1px solid $color-dark;
  display: flex;

  &__bar {
    height: $spacer;
    width: 100%;
    background-color: $color-primary;
    transform-origin: left;
    transition: 1.8s cubic-bezier(0.53, 0.89, 0.73, 0.89);
  }
}

.tabs {
  ::v-deep {
    .header {
      overflow: auto;
    }
  }
}
</style>
