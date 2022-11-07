<template>
    <Transition name="filterOptions">
        <div v-if="filtering" id="filterTab">
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
            <div id="technologiesFilter" class="row justify-content-around">
                <h2>skills</h2>
                <div v-for="i in 20" class="col skillCardContainer">
                    <SkillCard />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import { defineComponent } from 'vue'
import { SkillCard } from '~/components/skillCard'

export default defineComponent({
    props: {
        filtering: Boolean
    },
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
    position: absolute;
    left: 10px;
    right: 10px;
    height: min-content;
    background-color: rgba(75, 75, 75, 0.5);
    overflow: hidden;
    transform-origin: top;
    z-index: 100;
}

label {
    margin-left: 5px;
}

.row {
    margin: 0px;
}

.checkBox {
    padding-left: 50px;
}

#technologiesFilter {
    background-color: rgba(80, 80, 80, 0.5);
    box-sizing: border-box;
    margin: 0px;
}

.skillCardContainer {
    max-width: min-content;
}

.filterOptions-enter-active,
.filterOptions-leave-active {
  transition: all 0.5s;
}

.filterOptions-enter,
.filterOptions-leave-to {
    opacity: 0;
    transform: scaleY(0);
}
</style>