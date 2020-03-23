<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col md="8" lg="6" xl="4">
        <b-form @submit.prevent="handleSubmit">
          <b-form-group label="Title">
            <b-form-input v-model.trim="form.title" required/>
          </b-form-group>

          <b-form-group label="Director">
            <b-form-input v-model="form.director" placeholder="e.g. Hayao Miyazaki"/>
          </b-form-group>

          <b-form-group label="Duration (in minutes)">
            <b-form-input v-model.number="form.duration" type="number" required/>
          </b-form-group>

          <b-form-group label="Description">
            <b-form-textarea v-model.trim="form.description"/>
          </b-form-group>

          <b-form-group label="Genre">
            <b-form-tags v-model="form.genre" required/>
          </b-form-group>

          <b-form-group label="Release date">
            <b-form-datepicker v-model="form.releaseDate" value-as-date/>
          </b-form-group>

          <b-form-group label="Link">
            <b-form-input v-model.trim="form.link"/>
          </b-form-group>

          <b-form-group label="Link lang">
            <b-form-select v-model="form.linkLang" :options="languagies"/>
          </b-form-group>

          <b-form-group description="Link to image" class="mb-4" label="Poster">
            <b-form-input v-model.trim="form.poster"/>
          </b-form-group>

          <b-form-group>
            <b-form-checkbox v-model="form.watched" required>
              Already watched?
            </b-form-checkbox>
          </b-form-group>

          <b-button type="submit">Save</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface IAnime {
  description?: string;
  director?: string;
  duration: number;
  genre: string[];
  link?: string;
  linkLang?: string;
  poster?: string;
  releaseDate?: string;
  title: string;
  watched: boolean;
}

@Component
export default class Anime extends Vue {
  form: IAnime = {
    description: '',
    director: '',
    duration: 60,
    genre: [],
    link: '',
    linkLang: '',
    poster: '',
    releaseDate: '',
    title: '',
    watched: false,
  }

  languagies: string[] = [
    'Ukrainian',
    'English',
    'Russian',
  ];

  handleSubmit() {
    console.log(this.form);

    this.$axios({
      method: 'post',
      url: '/media/animes',
      data: this.form,
    });
  }
}
</script>

<style lang="scss" scoped></style>
