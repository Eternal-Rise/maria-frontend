<template>
  <b-list-group v-if="blockedUsers.length > 0">
    <b-list-group-item v-for="user of blockedUsers" :key="user._id" class="bg-transparent border p-0 item-mb-1">
      <b-row align-h="between" align-v="stretch" class="m-0">
        <b-col class="d-flex text-truncate align-items-center" v-text="user.username" />

        <b-button @click="handleRemove(user._id)">
          <b-icon-x />
        </b-button>
      </b-row>
    </b-list-group-item>
  </b-list-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IUser } from '~/helpers/interfaces';
import { BIcon, BIconX } from 'bootstrap-vue';

@Component({
  components: {
    BIcon,
    BIconX,
  },
})
export default class MBlockedUsers extends Vue {
  @Prop({ required: true, type: Array })
  blockedUsers!: IUser[];

  handleRemove(id: string) {
    this.$axios({
      method: 'post',
      url: `/user/block/${id}/remove`,
    }).then(() => {
      this.$bvToast.toast('', {
        title: 'Success',
        variant: 'success',
        solid: true,
      });
      this.$auth.fetchUser();
    });
  }
}
</script>

<style lang="scss" scoped></style>
