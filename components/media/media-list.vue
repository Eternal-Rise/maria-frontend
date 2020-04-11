<template>
  <div>
    <b-button-group class="w-100">
      <b-button v-b-toggle="mediaType" class="w-100" variant="outline-primary">{{ title }}</b-button>
      <b-button v-if="controls" :to="createLink" style="font-size: 1rem" variant="primary">
        <b-icon icon="plus" />
      </b-button>
    </b-button-group>
    <b-collapse :id="mediaType" class="pt-3">
      <div v-if="list.length">
        <media-view
          v-for="media of list"
          :key="media._id"
          :controls="controls"
          :media="media"
          :media-type="mediaType"
          :friend="friend"
          class="mb-2"
          @delete="handleDelete"
        />
      </div>
      <b-alert v-else class="mt-2 text-center" show>
        {{ 'Your list is empty, my lord' }}
      </b-alert>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import MediaView from '~/components/media/media-view.vue';
import { BIcon, BIconPlus } from 'bootstrap-vue';
import { IMedia, IMediaSerial, IMediaTypes, IMediaDelete, IUser } from '~/helpers/interfaces';

@Component({
  components: {
    BIcon,
    BIconPlus,
    MediaView,
  },
})
export default class MediaList extends Vue {
  @Prop({ default: false, required: false, type: Boolean })
  controls!: boolean;

  @Prop({ default: () => {}, required: false, type: Object })
  friend!: IUser;

  @Prop({ default: () => [], required: true, type: Array })
  list!: IMedia[] | IMediaSerial[];

  @Prop({ default: '', required: true, type: String })
  title!: string;

  @Prop({ default: '', required: true, type: String })
  mediaType!: string;

  get createLink() {
    if (this.friend) {
      return { name: `friend-media-add`, params: { friend: this.friend.username, media: this.mediaType } };
    } else {
      return { name: 'media-add', params: { media: this.mediaType } };
    }
  }

  @Emit('delete')
  handleDelete(deleted: IMediaDelete) {
    return deleted;
  }
}
</script>

<style lang="scss" scoped></style>
