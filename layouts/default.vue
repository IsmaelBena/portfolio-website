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

<style global>
.pageContent {
    overflow: hidden;
    height: 100vh;
    width: 100vw;
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

.contentBlock {
    background-color: rgba(50, 50, 50, 0.5);
}
</style>