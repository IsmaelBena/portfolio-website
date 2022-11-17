<template>
    <div id="scrollButton" class="hand" :class="arrowDir" @click="$emit('skillScroll', arrowDir)">
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
    mounted() {
        this.$emit('initScrollBtn')
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
    width: 50px;
    margin: 0px;
    padding: 0px;
    background-color: rgb(50, 50, 50);
    opacity: 0.75;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

img{
    height: 35px;
    width: 70px;
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