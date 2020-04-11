<template>
  <b-button-group>
    <b-button :to="editLink">
      <b-icon icon="pencil" />
    </b-button>
    <b-button :id="`media-${id}`">
      <b-icon icon="trash" />
    </b-button>

    <b-popover :show.sync="popover" placement="bottom" :target="`media-${id}`" variant="danger">
      <b-button-group class="w-100">
        <b-button variant="danger" @click="handleDelete">
          Confirm
        </b-button>
        <b-button @click="popover = false">
          Cancel
        </b-button>
      </b-button-group>
    </b-popover>
  </b-button-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BIcon, BIconPencil, BIconTrash } from 'bootstrap-vue';
import { IUser, IMediaAny } from '~/helpers/interfaces';

@Component({
  components: {
    BIcon,
    BIconPencil,
    BIconTrash,
  },
})
export default class CrudButtons extends Vue {
  @Prop({ required: true, type: String })
  id!: string;

  @Prop({ default: () => {}, required: false, type: Object })
  friend!: IUser;

  @Prop({ required: true, type: String })
  mediaType!: IMediaAny;

  popover: boolean = false;

  get deleteUrl() {
    if (this.friend) {
      return `/media/${this.friend._id}/${this.mediaType}s/${this.id}`;
    } else {
      return `/media/${this.mediaType}s/${this.id}`;
    }
  }

  get editLink() {
    if (this.friend) {
      return {
        name: `friend-media-id-edit`,
        params: { id: this.id, friend: this.friend.username, media: this.mediaType },
      };
    } else {
      return { name: `media-id-edit`, params: { id: this.id, media: this.mediaType } };
    }
  }

  handleDelete() {
    this.$axios({
      method: 'delete',
      url: this.deleteUrl,
    }).then(({ data }) => {
      this.$emit('delete', this.mediaType, data);
    });
  }
}
</script>

<style lang="scss" scoped></style>
