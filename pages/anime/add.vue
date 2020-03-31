<template>
  <anime-form />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AnimeForm from '~/components/media/animes/anime-form.vue';

@Component({
  components: {
    AnimeForm,
  },
})
export default class Add extends Vue { }
</script>

<style lang="scss" scoped></style>
