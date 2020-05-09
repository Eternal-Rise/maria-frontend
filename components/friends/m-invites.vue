<template>
  <div v-if="users.length > 0">
    <h5 class="text-capitalize px-3">{{ type }}</h5>

    <b-list-group>
      <b-list-group-item v-for="user of users" :key="user._id" class="bg-transparent border p-0 item-mb-1">
        <b-row align-h="between" align-v="stretch" class="m-0">
          <b-col class="d-flex text-truncate align-items-center" v-text="user.username" />

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
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BIcon, BIconTrash, BIconX, BIconCheck } from 'bootstrap-vue';
import { IUser } from '~/helpers/interfaces';

@Component({
  components: {
    BIcon,
    BIconCheck,
    BIconX,
  },
})
export default class MInvites extends Vue {
  @Prop({ required: true, type: Array })
  users!: IUser;

  @Prop({ required: true, type: String })
  type!: 'invites' | 'requests';

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

  sendRequest(request: string, id: string) {
    this.$axios({
      method: 'post',
      url: `/friends/${request}/${id}`,
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
