<template>
  <b-table :items="animes" :fields="fields">
    <template v-slot:cell(title)="{ item: { link, title } }">
      <b-link v-if="link && link !== ''" v-text="title" :href="link" />
      <template v-else>
        {{ title }}
      </template>
    </template>

    <template v-slot:cell(duration)="{ item: { duration } }">
      {{ formatDuration(duration) }}
    </template>

    <template v-slot:cell(genre)="{ item: { genre } }">
      {{ genre.join(', ') }}
    </template>

    <template v-slot:cell(actions)="{ item: { _id: id } }">
      <crud-buttons :id="id" media="anime" />
    </template>
  </b-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { formatDuration } from '~/helpers/formaters';
import CrudButtons from '~/components/helpers/crud-buttons.vue';

@Component({
  components: {
    CrudButtons,
  },
})
export default class MAnimes extends Vue {
  @Prop({ required: true, type: Array })
  animes!: any[];

  fields: any[] = [
    { key: 'title', label: 'Title' },
    { key: 'duration', label: 'Duration' },
    { key: 'releaseDate', label: 'Year' },
    { key: 'genre', label: 'Genre' },
    { key: 'actions', label: 'Actions' },
  ];

  formatDuration(dur: number): string {
    return formatDuration(dur);
  }
}
</script>

<style lang="scss" scoped></style>
