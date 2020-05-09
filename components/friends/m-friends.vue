<template>
  <div v-if="friends.length > 0">
    <b-button-group v-for="friend of friends" :key="friend._id" class="mb-1 w-100">
      <b-button
        :to="{ name: 'friend', params: { friend: friend.username } }"
        :variant="getVariant(friend.username)"
        exact
        class="nav__link w-100"
      >
        {{ friend.username }}
      </b-button>
      <b-button id="delete" variant="danger" @click="() => prepareToDelete(friend)">
        <b-icon-trash />
      </b-button>
    </b-button-group>
    <b-popover :show.sync="popover" placement="bottom" target="delete" variant="danger" class="p-0">
      <b-row class="m-0 py-1">
        <b-col>
          <b-form-checkbox v-model="block" switch>
            Add to blacklist
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-button-group class="w-100">
        <b-button variant="danger" @click="handleDelete">
          Confirm
        </b-button>
        <b-button @click="popover = false">
          Cancel
        </b-button>
      </b-button-group>
    </b-popover>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BIcon, BIconTrash, BIconX, BIconCheck } from 'bootstrap-vue';
import { IUser } from '~/helpers/interfaces';

@Component({
  components: {
    BIcon,
    BIconTrash,
  },
})
export default class MFriends extends Vue {
  @Prop({ required: true, type: Array })
  friends!: IUser;

  block: boolean = false;
  userToDelete: IUser = { username: '', _id: '' };
  popover: boolean = false;

  getVariant(friend: string): string {
    const username = this.$route.path || '';

    return new RegExp(`^/${friend}`).test(username) ? 'primary' : 'secondary';
  }

  handleDelete(id: string) {
    if (this.block) {
      const del = this.$axios({
        method: 'delete',
        url: `/friends/${this.userToDelete._id}`,
      });

      const block = this.$axios({
        method: 'post',
        url: `/user/block/${this.userToDelete._id}`,
      });

      Promise.all([del, block]).then(() => {
        this.$bvToast.toast(`${this.userToDelete.username} is no longer your friend & blacklisted`, {
          title: 'Success',
          variant: 'success',
          solid: true,
        });

        this.$auth.fetchUser();
      });
    } else {
      this.$axios({
        method: 'delete',
        url: `/friends/${this.userToDelete._id}`,
      }).then(() => {
        this.$bvToast.toast(`${this.userToDelete.username} is no longer your friend`, {
          title: 'Success',
          variant: 'success',
          solid: true,
        });

        this.$auth.fetchUser();
      });
    }
  }

  prepareToDelete(user: IUser) {
    this.userToDelete = user;
    this.popover = true;
  }
}
</script>

<style lang="scss" scoped></style>
