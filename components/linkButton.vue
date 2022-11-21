<template>
    <a class="linkButton noSelect" :href="url" target="_blank">
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
    color: white;
    border: 2px solid black;
    border-radius: 5px;
    background-color: rgba(250, 250, 250, 0.1);
}
.linkButton:hover {
    background-color: rgba(250, 250, 250, 0.3);
}

</style>