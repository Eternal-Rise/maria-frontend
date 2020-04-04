<template>
  <b-button-group>
    <b-button :to="{ name: `media-id-edit`, params: { id, media } }">
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
import { IMedia } from '~/helpers/interfaces';

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

  @Prop({ required: true, type: String })
  media!: IMedia;

  popover: boolean = false;

  handleDelete() {
    this.$axios({
      method: 'delete',
      url: `/maria/${this.media}s/${this.id}`,
    });
  }
}
</script>

<style lang="scss" scoped></style>
