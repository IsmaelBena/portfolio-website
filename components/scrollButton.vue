<template>
    <div id="scrollButton" class="d-flex flex-column justify-content-center align-content-center" :class="direction" @click="$emit('scroll', destination)">
        <p v-if="direction === 'down'">{{text}}</p>
        <img :class="direction + 'Arrow'" src="~/assets/scroll-arrow.png" :alt="'scroll ' + direction">
        <p v-if="direction === 'up'">{{text}}</p>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        direction: String,
        text: String,
        destination: String
    },
    setup () {
        return {}
    },
    methods: {
        handleClick() {
            
        }
    }
})
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px;
}

#scrollButton {
    position: relative;
    z-index: 100;
    width: 100px;
    height: min-content;
    text-align: center;
}

.down {
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
}

.up {
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
}

.upArrow {
    margin-top: 20px;
    height: 50px;
    width: 100px;
}

.downArrow {
    margin-bottom: 20px;
    height: 50px;
    width: 100px;
    transform: rotate(180deg);
}

p {
    color: white;
    padding: 0 15px;
}
</style>