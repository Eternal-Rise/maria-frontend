<template>
  <div>
    <div v-if="list.length" class="list-header">
      <div class="list-header__block _title">
        <button
          :class="['list-header__title', '_sorter', getSorterClass('title')]"
          class=""
          @click="handleSort('title')"
        >
          Title
        </button>
      </div>
      <div class="list-header__block _duration">
        <button
          :class="['list-header__title', '_sorter', getSorterClass('duration')]"
          class=""
          @click="handleSort('duration')"
        >
          Duration
        </button>
      </div>
      <div class="list-header__block _year">
        <button :class="['list-header__title', '_sorter', getSorterClass('year')]" class="" @click="handleSort('year')">
          Year
        </button>
      </div>
      <div class="list-header__block _genres">
        <span class="list-header__title">Genres</span>
      </div>
    </div>

    <div v-if="list.length">
      <ul  class="list">
        <media-view
          v-for="media of listSlice"
          :key="media._id"
          :controls="controls"
          :media="media"
          :media-type="mediaType"
          :friend="friend"
          @delete="handleDelete"
        />
      </ul>
      <i-button v-if="listSlice.length < list.length" @click="slice++">Show more</i-button>
    </div>
    <i-alert v-else class="mt-2 text-center" show>
      {{ 'Your list is empty, my lord' }}
    </i-alert>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import MediaView from '~/components/media/media-view.vue';
import { IMediaDelete, IUser, IMediaAny } from '~/helpers/interfaces';

@Component({
  components: {
    MediaView,
  },
})
export default class MediaList extends Vue {
  @Prop({ default: false, required: false, type: Boolean })
  controls!: boolean;

  @Prop({ default: () => {}, required: false, type: Object })
  friend!: IUser;

  @Prop({ default: () => [], required: true, type: Array })
  list!: IMediaAny[];

  @Prop({ default: '', required: true, type: String })
  title!: string;

  @Prop({ default: '', required: true, type: String })
  mediaType!: string;

  slice = 1;

  sort: any = {
    title: '',
    duration: '',
    year: '',
  };

  get createLink() {
    if (this.friend) {
      return { name: `friend-media-add`, params: { friend: this.friend.username, media: this.mediaType } };
    } else {
      return { name: 'media-add', params: { media: this.mediaType } };
    }
  }

  get listSlice() {
    return this.list.slice(0, this.slice * 20);
  }

  getSorterClass(key: string) {
    return this.sort[key] === 'ASC' ? '_top' : this.sort[key] === 'DESC' ? '_bottom' : 'f';
  }

  handleSort(key: string) {
    for (const [k] of Object.entries(this.sort)) {
      if (k !== key) this.sort[k] = '';
    }

    if (this.sort[key] === 'ASC') {
      this.sort[key] = '';
      this.list.sort(this.sortByKey('createdAt'));
    } else if (this.sort[key] === 'DESC') {
      this.sort[key] = 'ASC';
      this.list.sort(this.sortByKey(key));
    } else {
      this.sort[key] = 'DESC';
      this.list.sort(this.sortByKey(key));
    }

    this.list.sort(this.sortByWatched());
  }

  sortByKey(key: string) {
    if (key === 'createdAt') {
      return (a: IMediaAny, b: IMediaAny) => (new Date(a[key]).getTime() > new Date(b[key]).getTime() ? 1 : -1);
    }

    if (this.sort[key] === 'DESC') {
      return (a: IMediaAny, b: IMediaAny) => (a[key] < b[key] ? 1 : -1);
    } else {
      return (a: IMediaAny, b: IMediaAny) => (a[key] > b[key] ? 1 : -1);
    }
  }

  sortByWatched() {
    return this.sortByKey('watched');
  }

  @Emit('delete')
  handleDelete(deleted: IMediaDelete) {
    return deleted;
  }
}
</script>

<style lang="scss" scoped>
.item.item {
  position: static;

  ::v-deep {
    .header {
      .icon {
        position: static;
      }
    }
  }
}
</style>
