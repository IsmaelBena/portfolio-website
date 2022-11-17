<template>
    <div id="skillCard" class="card">
        <img class="card-img-top" :src="require(`../assets/${fileName}`)">
        <div class="card-body">
            <p class="card-title">{{name}}</p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: "",
        fileName: ""
    },
    setup () {
        return {}
    },
    mounted() {
        console.log(this.fileName)
    },
    methods: {
        handleClick() {
            
        }
    }
})
</script>

<style scoped>
#skillCard {
    background-color: rgba(50, 50, 50, 0.5);
    width: 70px;
    align-content: center;
    padding: 0px;
    margin: 5px;
}

.card-body {
    padding: 0px;
    margin: 0px;
    text-align: center;
    white-space: normal;
}

.card-title {
    padding: 0px;
    margin: 0px;
}

img {
    aspect-ratio: 1;
    width: 60px;
    padding: 0px;
    margin: 0px;
    margin-top: 3px;
    align-self: center;
}

p {
    font-size: 10px;
    color: white;
    padding: 0px;
    margin: 0px;
}
</style>