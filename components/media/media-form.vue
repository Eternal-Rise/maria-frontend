<template>
  <b-row class="justify-content-center">
    <b-col md="10" lg="8" xl="6">
      <m-spinner :loading="loading">
        <b-form @submit.prevent="handleSubmit">
          <b-form-group label="Title">
            <b-form-input v-model.trim="form.title" required />
          </b-form-group>

          <b-form-group label="Duration (in minutes)">
            <b-form-input v-model.number="form.duration" type="number" />
          </b-form-group>

          <b-form-group label="Genre">
            <!-- prop `add-on-change` is needed to enable adding tags vie the `change` event -->
            <b-form-tags
              v-model="form.genre"
              :disabled="form.genre && form.genre.length >= 4"
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
                  :disabled="(form.genre && form.genre.length >= 4) || availableGenres().length === 0"
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
              <b-form-group label="Season">
                <b-form-input v-model.number="form.season" type="number" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Seasons">
                <b-form-input v-model.number="form.seasonsAmount" type="number" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Series">
                <b-form-input v-model.number="form.seriesInSeason" type="number" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="To watch">
                <b-form-input v-model.number="form.toWatch" type="number" />
              </b-form-group>
            </b-col>
          </b-row>

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
import { IMedia, IMediaSerial, IMediaAny } from '~/helpers/interfaces';
import { MEDIA_SERIAL_TYPES } from '../../helpers/constants';
import { GENRES } from '~/helpers/constants';

@Component({
  components: {
    MSpinner,
  },
})
export default class AnimeForm extends Vue {
  media!: any;
  languagies: string[] = ['Ukrainian', 'English', 'Russian'];
  loading: boolean = false;
  genres: string[] = GENRES;

  get form(): IMediaAny {
    return this.media;
  }

  get friend() {
    const friends = this.$auth.user && this.$auth.user.friends.list;

    if (friends && friends.length) {
      return friends.find((friend: any) => friend.username === this.$route.params.friend);
    }
  }

  set form(form: IMediaAny) {
    this.media = form;
  }

  get id(): string {
    return this.$route.params.id || '';
  }

  get url(): string {
    if (this.friend && this.friend._id) {
      return `/media/${this.friend._id}/${this.mediaType}s`;
    } else {
      return `/media/${this.mediaType}s`;
    }
  }

  get idUrl(): string {
    return `${this.url}/${this.id}`;
  }

  get isSerial(): boolean {
    return (MEDIA_SERIAL_TYPES as string[]).includes(this.mediaType);
  }

  get mediaType(): string {
    return this.$route.params.media || '';
  }

  preparedForm(): IMediaAny {
    const { genre, ...preparedForm } = this.form;

    (preparedForm as IMediaAny).genre = genre.sort();

    return preparedForm as IMediaAny;
  }

  availableGenres() {
    return this.genres.filter(opt => this.form.genre.indexOf(opt) === -1);
  }

  handleCreate() {
    this.loading = true;

    this.$axios({
      method: 'post',
      url: this.url,
      data: this.preparedForm(),
    })
      .then(({ data }) => {
        this.$bvToast.toast(`You added ${data.title} to watch list`, {
          title: 'Success',
          variant: 'success',
          solid: true,
        });

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
        this.$bvToast.toast(`You have update ${data.title}`, {
          title: 'Success',
          variant: 'success',
          solid: true,
        });
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

    if (!this.isSerial) return media;

    const mediaSerial: IMediaSerial = {
      ...media,
      season: 1,
      seasonsAmount: 1,
      seriesInSeason: 1,
      toWatch: 1,
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
            const { _id, __v, createdAt, owner, updatedAt, ...media } = data;

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
