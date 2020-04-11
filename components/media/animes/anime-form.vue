<template>
  <b-row class="justify-content-center">
    <b-col md="8" lg="6" xl="4">
      <m-spinner :loading="loading">
        <b-form @submit.prevent="handleSubmit">
          <b-form-group label="Title">
            <b-form-input v-model.trim="form.title" required />
          </b-form-group>

          <b-form-group label="Duration (in minutes)">
            <b-form-input v-model.number="form.duration" type="number" required />
          </b-form-group>

          <b-form-group label="Genre">
            <b-form-tags v-model="form.genre" required />
          </b-form-group>

          <b-form-group>
            <b-form-checkbox v-model="form.watched" required>
              Already watched?
            </b-form-checkbox>
          </b-form-group>

          <b-button v-b-toggle.form-details class="mb-3 w-25">Details</b-button>

          <b-collapse id="form-details">
            <b-form-group label="Director">
              <b-form-input v-model="form.director" placeholder="e.g. Hayao Miyazaki" />
            </b-form-group>

            <b-form-group label="Description">
              <b-form-textarea v-model.trim="form.description" rows="6" />
            </b-form-group>

            <b-form-group label="Release date">
              <b-input-group>
                <b-form-input
                  v-model.trim="form.releaseDate"
                  pattern="\d{4}(-\d{2})?(-\d{2})?"
                  placeholder="YYYY-MM-DD"
                />
                <b-input-group-append>
                  <b-form-datepicker
                    v-model="form.releaseDate"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    button-only
                    hide-header
                    right
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>

            <b-form-group label="Link">
              <b-form-input v-model.trim="form.link" />
            </b-form-group>

            <b-form-group label="Link lang">
              <b-form-select v-model="form.linkLang" :options="languagies" />
            </b-form-group>

            <b-form-group description="Link to image" class="mb-4" label="Poster">
              <b-form-input v-model.trim="form.poster" />
            </b-form-group>

            <b-img-lazy v-if="/(\.jpe?g|\.png|\.webp)/.test(form.poster)" :src="form.poster" class="mb-3" />
          </b-collapse>

          <b-button type="submit" variant="primary" class="mb-3">Save</b-button>
        </b-form>
      </m-spinner>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MSpinner from '~/components/helpers/m-spinner.vue';
import { IMedia } from '~/helpers/interfaces';

@Component({
  components: {
    MSpinner,
  },
})
export default class AnimeForm extends Vue {
  form: IMedia = this.newForm();
  languagies: string[] = ['Ukrainian', 'English', 'Russian'];
  loading: boolean = false;

  get id(): string {
    return this.$route.params.id || '';
  }

  get url(): string {
    return `/media/animes/${this.id}`;
  }

  handleCreate() {
    this.loading = true;

    this.$axios({
      method: 'post',
      url: '/media/animes',
      data: this.form,
    })
      .then(() => {
        this.form = this.newForm();
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
  }

  handleEdit() {
    this.$axios({
      method: 'put',
      url: this.url,
      data: this.form,
    })
      .then(() => {})
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
  }

  handleSubmit() {
    if (this.id === '') {
      this.handleCreate();
    } else {
      this.handleEdit();
    }
  }

  newForm(): IMedia {
    return {
      description: '',
      director: '',
      duration: 60,
      genre: [],
      link: '',
      linkLang: '',
      poster: '',
      releaseDate: null,
      title: '',
      watched: false,
    };
  }

  mounted() {
    if (this.id !== '') {
      this.loading = true;

      this.$axios({
        method: 'get',
        url: this.url,
      })
        .then(({ data }: any) => {
          if (data) {
            const { _id, __v, createdAt, owner, updatedAt, ...anime } = data;
            this.form = anime;
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    }
  }
}
</script>

<style lang="scss" scoped></style>
