<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  middleware: ctx => ctx.redirect({ name: 'anime-add' }),
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped></style>
