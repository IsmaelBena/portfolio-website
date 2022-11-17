<template>
    <a class="linkButton noSelect" :class="colour" :href="url" target="_blank">
        {{linkType}}
    </a>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        url: String,
        linkType: String,
        colour: String
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
.linkButton {
    padding: 10px 15px;
    margin: 0px;
    box-sizing: border-box;
    text-decoration: none;
}

.blue {
    background-color: blue;
    color: white;
}
.yellow {
    background-color: yellow;
    color: black;
}
.red {
    background-color: red;
    color: black;
}

</style>