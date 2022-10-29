<template>    
    <div>
        <button @click="handleClick()">go to projects</button>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="contentBlock border"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="contentBlock border"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="contentBlock border"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        return {}
    },
    methods: {
        handleClick() {
            this.$router.push('/projects')
        }
    }
})
</script>

<style scoped>
.contentBlock {
    height: 100px;
    background-color: rgba(50, 50, 50, 0.5);
}
</style>