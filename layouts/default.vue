<template>
    <div>
        <nuxt />
        <canvas></canvas>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        return {}
    },
    mounted() {

    }
})
</script>

<style>
.pageContent {
    overflow-y: scroll;
    height: 100vh;
}

h1, h2, h3 {
    color: white;
}

*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>