<template>
  <div v-if="users.length > 0">
    <h5 v-if="type !== 'list'" class="text-capitalize">{{ type }}</h5>
    <b-list-group>
      <b-list-group-item v-for="user of users" :key="user._id" class="bg-transparent border p-0">
        <b-row align-h="between" align-v="stretch" class="m-0">
          <b-col class="d-flex text-truncate p-0">
            <b-link
              v-if="type === 'list'"
              :to="{ name: 'friend', params: { friend: user.username } }"
              class="d-flex align-items-center px-3 w-100"
            >
              {{ user.username }}
            </b-link>
            <template v-else v-text="user.username" />
          </b-col>

          <b-button v-if="type === 'invites'" @click="handleDestroy(user._id)">
            <b-icon-x />
          </b-button>
          <b-button-group v-else-if="type === 'requests'">
            <b-button variant="primary" @click="handleAccept(user._id)">
              <b-icon-check />
            </b-button>
            <b-button @click="handleDecline(user._id)">
              <b-icon-x />
            </b-button>
          </b-button-group>
          <b-button v-else id="delete" variant="danger" @click="() => prepareToDelete(user)">
            <b-icon-trash />
          </b-button>
        </b-row>
      </b-list-group-item>
    </b-list-group>

    <b-popover :show.sync="popover" placement="bottom" target="delete" variant="danger" class="p-0">
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
import { IUser } from '../../helpers/interfaces';

@Component({
  components: {
    BIcon,
    BIconCheck,
    BIconTrash,
    BIconX,
  },
})
export default class MFriends extends Vue {
  @Prop({ required: true, type: Array })
  users!: IUser;

  @Prop({ required: true, type: String })
  type!: 'invites' | 'list' | 'requests';

  userToDelete: IUser = { username: '', _id: '' };
  popover: boolean = false;

  handleAccept(id: string) {
    this.sendRequest('accept', id);
  }

  handleDecline(id: string) {
    this.sendRequest('decline', id);
  }

  handleDestroy(id: string) {
    this.sendRequest('destroy', id);
  }

  handleDelete(id: string) {
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

  sendRequest(path: string, id: string) {
    this.$axios({
      method: 'post',
      url: `/friends/${path}/${id}`,
    }).then(() => {
      this.$bvToast.toast('', {
        title: 'Success',
        variant: 'success',
        solid: true,
      });
      this.$auth.fetchUser();
    });
  }

  prepareToDelete(user: IUser) {
    this.userToDelete = user;
    this.popover = true;
  }
}
</script>

<style lang="scss" scoped></style>
