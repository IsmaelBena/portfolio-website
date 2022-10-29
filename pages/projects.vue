<template>    
    <div>
        <button @click="btnToProjects()">back to home</button>
        <button @click="btnToggleZoom()">Toggle Zoom</button>
        <p class="text-white">{{ toggled }}</p>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        return {
            toggled: false
        }
    },
    methods: {
        btnToProjects() {
            this.$router.push('/')
        },
        btnToggleZoom() {
            this.toggled = !this.toggled
            this.$toggleZoom()
        }
    }
})
</script>