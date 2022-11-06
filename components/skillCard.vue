<template>
    <div id="skillCard" class="card">
        <img class="card-img-top" src="~/assets/jsIcon.png">
        <div class="card-body">
            <p class="card-title">JavaScript</p>
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
            
        }
    }
})
</script>

<style scoped>
#skillCard {
    background-color: rgba(50, 50, 50, 0.5);
    width: 50px;
    align-content: center;
    padding: 0px;
    margin: 5px;
}

.card-body {
    padding: 0px;
    margin: 0px;
    text-align: center;
}

.card-title {
    padding: 0px;
    margin: 0px;
}

img {
    aspect-ratio: 1;
    width: 50px;
    padding: 0px;
    margin: 0px;
    align-self: center;
}

p {
    font-size: 10px;
    color: white;
    padding: 0px;
    margin: 0px;
}
</style>