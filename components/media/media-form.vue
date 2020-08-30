<template>
  <b-row class="justify-content-center">
    <b-col md="10" lg="8" xl="6">
      <m-spinner :loading="loading">
        <b-form @submit.prevent="handleSubmit">
          <b-form-group label="Title *">
            <b-form-input v-model.trim="form.title" required />
          </b-form-group>

          <b-form-group label="Duration (in minutes) *">
            <b-form-input v-model.number="form.duration" type="number" />
          </b-form-group>

          <b-form-group label="Genre *">
            <!-- prop `add-on-change` is needed to enable adding tags vie the `change` event -->
            <b-form-tags
              v-model="form.genres"
              :disabled="form.genres && form.genres.length >= 4"
              add-on-change
              class="bg-transparent border-0 p-0"
              no-outer-focus
            >
              <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                  <li v-for="tag in tags" :key="tag" class="list-inline-item">
                    <b-form-tag @remove="removeTag(tag)" :title="tag" variant="info">
                      {{ tag }}
                    </b-form-tag>
                  </li>
                </ul>
                <b-form-select
                  v-bind="inputAttrs"
                  v-on="inputHandlers"
                  :disabled="(form.genres && form.genres.length >= 4) || availableGenres().length === 0"
                  :options="availableGenres()"
                >
                  <template v-slot:first>
                    <!-- This is required to prevent bugs with Safari -->
                    <option disabled value="">Genres...</option>
                  </template>
                </b-form-select>
              </template>
            </b-form-tags>
          </b-form-group>

          <b-form-group label="Link">
            <b-form-input v-model.trim="form.link" />
          </b-form-group>

          <b-row v-if="isSerial">
            <b-col>
              <b-form-group label="Seasons">
                <b-form-input v-model.number="seasons" min="1" type="number" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group v-for="i in seasons" :key="i" :label="`Seasons ${i}`">
                <b-form-input v-model.number="form.seasons[i - 1]" min="1" type="number" required />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="To watch (s1e1)">
                <b-form-input v-model.trim="form.toWatch" pattern="s\d+e\d+" />
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group label="Year">
            <b-form-input v-model.trim.number="form.year" min="1950" :max="maxYear" type="number" />
          </b-form-group>

          <b-form-group>
            <b-form-checkbox v-model="form.watched" required>
              Already watched?
            </b-form-checkbox>
          </b-form-group>

          <b-row align-h="center">
            <b-col cols="12" md="8" lg="5">
              <b-button type="submit" variant="primary" class="w-100">Save</b-button>
            </b-col>
          </b-row>
        </b-form>
      </m-spinner>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MSpinner from '~/components/helpers/m-spinner.vue';
import { IMedia, IMediaSerial, IMediaAny } from '~/helpers/interfaces';
import { MEDIA_SERIAL_TYPES } from '../../helpers/constants';
import { GENRES } from '~/helpers/constants';

@Component({
  components: {
    MSpinner,
  },
})
export default class AnimeForm extends Vue {
  media!: IMediaAny;
  loading: boolean = false;
  genres: string[] = GENRES;
  seasons = 1;

  get form(): IMediaAny {
    return this.media;
  }

  set form(form: IMediaAny) {
    this.media = form;
  }

  get id(): string {
    return this.$route.params.id || '';
  }

  get url(): string {
    return `/media/${this.mediaType}s`;
  }

  get idUrl(): string {
    return `${this.url}/${this.id}`;
  }

  get isSerial(): boolean {
    return (MEDIA_SERIAL_TYPES as string[]).includes(this.mediaType);
  }

  get maxYear(): number {
    const currentYear = new Date().getFullYear();
    return currentYear + 5;
  }

  get mediaType(): string {
    return this.$route.params.media || '';
  }

  preparedForm(): IMediaAny {
    const { genres, ...preparedForm } = this.form;

    (preparedForm as IMediaAny).genres = genres.sort();

    return preparedForm as IMediaAny;
  }

  availableGenres() {
    return this.genres.filter(opt => this.form.genres.indexOf(opt) === -1);
  }

  handleCreate() {
    this.loading = true;

    if (this.media.seasons) {
      this.media.totalSeries = this.media.seasons.reduce((a: number, b: number) => a + b, 0);
    }

    this.$axios({
      method: 'post',
      url: this.url,
      data: this.preparedForm(),
    })
      .then(({ data }) => {
        // this.$bvToast.toast(`You added ${data.title} to watch list`, {
        //   title: 'Success',
        //   variant: 'success',
        //   solid: true,
        // });

        const newForm: any = this.newForm();

        for (const [key, value] of Object.entries(newForm)) {
          this.$set(this.form, key, newForm[key]);
        }
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
      url: this.idUrl,
      data: this.preparedForm(),
    })
      .then(({ data }: any) => {
        // this.$bvToast.toast(`You have update ${data.title}`, {
        //   title: 'Success',
        //   variant: 'success',
        //   solid: true,
        // });
      })
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

  newForm(): IMediaAny {
    const media: IMedia = {
      duration: 60,
      genres: [],
      link: '',
      title: '',
      year: '',
      watched: false,
    };

    if (!this.isSerial) return media;

    const mediaSerial: IMediaSerial = {
      ...media,
      seasons: [],
      totalSeries: 1,
      toWatch: 's1e1',
    };

    return mediaSerial;
  }

  created() {
    this.form = this.newForm();
  }

  mounted() {
    if (this.id !== '') {
      this.loading = true;

      this.$axios({
        method: 'get',
        url: this.idUrl,
      })
        .then(({ data }: any) => {
          if (data) {
            const { _id, __v, createdAt, updatedAt, ...media } = data;

            if (media.seasons) {
              this.seasons = media.seasons.length;
            }

            for (const [key, value] of Object.entries(media)) {
              this.$set(this.form, key, media[key]);
            }
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
