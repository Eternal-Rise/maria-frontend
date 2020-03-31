<template>
  <b-row class="preview">
    <b-col cols="3">
      <b-img :src="media.poster" class="preview__poster" @click="lightbox = true" />
    </b-col>
    <b-col cols="9">
      <b-row align-v="center" align-h="between" class="mb-2">
        <b-col cols="10">
          <h1 class="font-weight-light">
            <b-link v-if="media.link && media.link !== ''" v-text="media.title" :href="media.link" />
            <template v-else>
              {{ media.title }}
            </template>
          </h1>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <crud-buttons :id="media._id" :media="mediaType" />
        </b-col>
      </b-row>

      <b-row class="mx-0">
        <b-col class="border border-bottom-0 border-right-0">
          {{ media.director || 'Director' }}
        </b-col>
        <b-col v-if="media.releaseDate" class="border border-bottom-0 border-right-0">
          {{ media.releaseDate || 'Release date' }}
        </b-col>
        <b-col class="border border-bottom-0"> {{ media.duration ? `${media.duration}min` : 'Duration' }} </b-col>
      </b-row>

      <b-row class="mb-4 mx-0">
        <b-col class="border">
          {{ genres }}
        </b-col>
      </b-row>

      <p v-text="media.description" class="text-small" />
    </b-col>
    <vue-easy-lightbox v-if="media.poster" :imgs="media.poster" :visible="lightbox" @hide="lightbox = false" />
  </b-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IAnime } from '~/helpers/interfaces';
import CrudButtons from '~/components/helpers/crud-buttons.vue';

@Component({
  components: {
    CrudButtons,
  },
})
export default class Index extends Vue {
  @Prop({ default: {}, required: true, type: Object })
  media!: IAnime;

  @Prop({ required: true, type: String })
  mediaType!: string;

  lightbox: boolean = false;

  get genres(): string {
    return this.media.genre.sort().join(', ');
  }
}
</script>

<style lang="scss" scoped></style>
