<template>
    <div id="scrollButton"  :class="arrowDir" @click="$emit('skillScroll', arrowDir)">
        <img :class="arrowDir + 'Arrow'" src="~/assets/scroll-arrow.png" :alt="'scroll ' + arrowDir">
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        arrowDir: String
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
    position: absolute;
    z-index: 100;
    height: min-content;
    width: 70px;
    margin: 0px;
    padding: 0px;
    background-color: rgb(50, 50, 50);
    opacity: 0.75;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

img{
    aspect-ratio: 1;
    height: 60px;
    width: 60px;
}

.left {
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
}

.right {
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
}

.rightArrow {
    transform: rotate(90deg);
}

.leftArrow {
    transform: rotate(270deg);
}

p {
    color: white;
    padding: 0 15px;
}
</style>