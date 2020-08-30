<template>
  <i-button-group>
    <i-button :to="editLink">
      <i-icon icon="code" />
    </i-button>
    <i-popover placement="bottom" variant="dark">
      <i-button :id="`media-${id}`">
        <i-icon icon="times" />
      </i-button>

      <i-button-group slot="body" block>
        <i-button variant="danger" @click="handleDelete">
          Confirm
        </i-button>
        <i-button @click="popover = false">
          Cancel
        </i-button>
      </i-button-group>
    </i-popover>
  </i-button-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IUser, IMediaAny } from '~/helpers/interfaces';

@Component({
  components: {},
})
export default class CrudButtons extends Vue {
  @Prop({ required: true, type: String })
  id!: string;

  @Prop({ required: true, type: String })
  mediaType!: IMediaAny;

  get deleteUrl() {
    return `/media/${this.mediaType}s/${this.id}`;
  }

  get editLink() {
    return { name: `media-id-edit`, params: { id: this.id, media: this.mediaType } };
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

<style lang="scss" scoped>
.popover-wrapper {
  ::v-deep {
    .popover > .body {
      padding: 1px;
    }
  }
}
</style>
