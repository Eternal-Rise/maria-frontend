<template>
  <b-button-group>
    <b-button :to="{ name: `media-id-edit`, params: { id, media } }">
      <b-icon icon="pencil" />
    </b-button>
    <b-button @click="handleDelete">
      <b-icon icon="trash" />
    </b-button>
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

  handleDelete() {
    console.warn(`You are proceed to delete some ${this.media}`);
    this.$axios({
      method: 'delete',
      url: `/maria/${this.media}/${this.id}`,
    });
  }
}
</script>

<style lang="scss" scoped></style>
