<template>
  <i-row center>
    <i-column md="10" lg="8" xl="6">
      <m-spinner :loading="loading">
        <i-form v-model="form" @submit.prevent="handleSubmit" :key="formKey">
          <i-form-group>
            <i-form-label>Title</i-form-label>
            <i-input :schema="form.title" />
          </i-form-group>

          <i-form-group>
            <i-form-label>Duration (in minutes)</i-form-label>
            <i-input-number v-model.number="form.duration.value" :min="5" :max="300" :step="5" type="number" />
          </i-form-group>

          <i-form-group>
            <i-form-label>Genre</i-form-label>
            <i-checkbox-button-group :schema="form.genres">
              <i-checkbox-button v-for="genre of genres" :key="genre" :value="genre" type="button">
                {{ genre }}
              </i-checkbox-button>
            </i-checkbox-button-group>
          </i-form-group>

          <i-form-group>
            <i-form-label>Link</i-form-label>
            <i-input :schema="form.link" />
          </i-form-group>

          <i-form-group>
            <i-row>
              <i-column>
                <i-form-group>
                  <i-form-label>Seasons</i-form-label>
                  <i-input-number v-model.number="seasons" min="1" type="number" />
                </i-form-group>
              </i-column>
              <i-column>
                <i-form-group v-for="i in seasons" :key="i">
                  <i-form-label>{{ `Seasons ${i}` }}</i-form-label>
                  <i-input-number v-model.number="form.seasons.value[i - 1]" min="1" type="number" required />
                </i-form-group>
              </i-column>
              <i-column>
                <i-form-group>
                  <i-form-label>To watch (s1e1)</i-form-label>
                  <i-input :schema="form.toWatch" pattern="^s\d+e\d+$" />
                </i-form-group>
              </i-column>
            </i-row>
          </i-form-group>

          <i-form-group>
            <i-form-label>Year</i-form-label>
            <i-input-number v-model.number="form.year.value" :min="1950" :max="maxYear" :step="1" type="number" />
          </i-form-group>

          <i-form-group class="_margin-bottom-1">
            <i-checkbox :schema="form.watched">
              Already watched?
            </i-checkbox>
          </i-form-group>

          <i-row center>
            <i-column md="8" lg="5">
              <i-button type="submit" variant="primary" block>Save</i-button>
            </i-column>
          </i-row>
        </i-form>
      </m-spinner>
    </i-column>
  </i-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MSpinner from '~/components/helpers/m-spinner.vue';
import { IMedia, IMediaSerial, IMediaAny } from '~/helpers/interfaces';
import { MEDIA_SERIAL_TYPES } from '../../helpers/constants';
import { GENRES } from '~/helpers/constants';

const maxYear = (): number => {
  const currentYear = new Date().getFullYear();
  return currentYear + 5;
};

@Component({
  components: {
    MSpinner,
  },
})
export default class AnimeForm extends Vue {
  loading: boolean = false;
  genres: string[] = GENRES;
  seasons = 1;

  schema = {
    title: {
      validators: [{ rule: 'required' }],
    },
    link: {
      value: '',
    },
    duration: {
      value: 60,
      validators: [{ rule: 'required' }, { rule: 'min', value: 5 }, { rule: 'max', value: 300 }],
    },
    genres: {
      value: [],
      validators: [
        { rule: 'required' },
        { rule: 'custom', validator: () => this.form.genres.value.length <= 4, message: 'Max 4' },
      ],
    },
    seasons: {
      value: [],
    },
    toWatch: {
      value: 's1e1',
      validators: [{ rule: 'required' }, { rule: 'custom', validator: (v: string) => /^s\d+e\d+$/.test(v) }],
    },
    year: {
      value: new Date().getFullYear(),
      validators: [{ rule: 'required' }, { rule: 'min', value: 1950 }, { rule: 'max', value: maxYear() }],
    },
    watched: {
      value: false,
    },
  };

  form = this.$inkline.form(this.schema);
  formKey = 'media-form';

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

  get mediaType(): string {
    return this.$route.params.media || '';
  }

  get maxYear() {
    return maxYear();
  }

  availableGenres() {
    return this.genres.filter(opt => this.form.genres.indexOf(opt) === -1);
  }

  preparedForm() {
    const form: { [key: string]: IMediaAny } = {};

    for (const key of this.form.fields) {
      form[key] = this.form[key].value;
    }

    form.genres.sort();
    form.totalSeries = this.form.seasons.value.reduce((a: number, b: number) => a + b, 0);

    return form;
  }

  handleCreate() {
    if (this.form.validate().valid) {
      this.loading = true;

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

          this.$nextTick().then(() => {
            this.formKey = this.formKey + Date.now();
          });
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    }
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

  newForm() {
    return this.$inkline.form(this.schema);
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

            this.seasons = media.seasons.length;

            for (const [key, value] of Object.entries(media)) {
              this.form.set(key, { ...(this.schema as any)[key], value }, { instance: this });
            }

            this.formKey = this.formKey + Date.now();
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
