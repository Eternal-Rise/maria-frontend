<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MEDIA_ALL_TYPES } from '~/helpers/constants';

@Component({
  validate({ params }) {
    return (MEDIA_ALL_TYPES as string[]).includes(params.media);
  },
  middleware(ctx) {
    ctx.redirect({ name: 'media-add', params: { media: this.$route.params.media } });
  },
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped></style>
