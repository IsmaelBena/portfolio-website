<template>
    <div id="filterTab">
        <form class="row">
            <div id="nameFilter" class="form-floating">
                <input id="nameInput" type="text" class="form-control" placeholder="Project Name">
                <label for="nameInput">Project Name</label>
            </div>
            <div id="completeFilter" class="form-check form-switch checkBox">
                <input id="completeCheckInput" class="form-check-input" type="checkbox" >
                <label class="form-check-label" for="completeCheckInput">Complete?</label>
            </div>
            <div id="sourceCodeFilter" class="form-check form-switch checkBox">
                <input id="sourceCodeCheckInput" class="form-check-input" type="checkbox" >
                <label class="form-check-label" for="sourceCodeCheckInput">Source code avaiable</label>
            </div>
        </form>
        <div id="technologiesFilter" class="row">

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

    }
})
</script>

<style scoped>
#filterTab {
    padding-top: 10px;
    width: 100%;
    height: 100%;
    background-color: rgba(75, 75, 75, 0.5);
}

.row {
    margin: 0px;
}

.checkBox {
    padding-left: 50px;
}

#technologiesFilter {
    width: 100%;
    height: 100%;
    background-color: black;
    box-sizing: border-box;
    margin: 0px;
}
</style>