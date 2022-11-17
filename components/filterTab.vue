<template>
    <Transition name="filterOptions">
        <div v-if="filtering" id="filterTab">
            <form class="row">
                <div id="nameFilter" class="form-floating">
                    <input id="nameInput" type="text" class="form-control" placeholder="Project Name" v-model="filters.name">
                    <label for="nameInput">Project Name</label>
                </div>
                <div id="completeFilter" class="form-check form-switch checkBox">
                    <input id="completeCheckInput" class="form-check-input" type="checkbox" v-model="filters.completeOnly">
                    <label class="form-check-label" for="completeCheckInput">Complete?</label>
                </div>
                <div id="sourceCodeFilter" class="form-check form-switch checkBox">
                    <input id="sourceCodeCheckInput" class="form-check-input" type="checkbox" v-model="filters.codeOnly">
                    <label class="form-check-label" for="sourceCodeCheckInput">Source code avaiable</label>
                </div>
            </form>
            <div id="technologiesFilter" class="row justify-content-around">
                <h2>skills</h2>
                <div v-for="card in techData" :key="card._id" class="skillCardContainer" :class="(filters.skills.includes(card._id)) ? 'selected' : ''" @click="toggleSkillFilterValue(card._id)">
                    <SkillCard :name="card.name" :imageLocation="card.image.fileName" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import { defineComponent, watch } from 'vue'
import { SkillCard } from '~/components/skillCard'

export default defineComponent({
    props: {
        filtering: Boolean,
        techData: []
    },
    setup () {
        return {
            
        }
    },
    data() {
        return {
            filters: {name: "", completeOnly: false, codeOnly: false, skills: []}
        }
    },
    watch: {
        'filters.name'() {
            this.$emit('applyName', this.filters)
        },
        'filters.completeOnly'() {
            this.$emit('applyCompleteOnly', this.filters)
        },
        'filters.codeOnly'() {
            this.$emit('applyCodeOnly', this.filters)
        },
        'filters.skills'() {
            this.$emit('applySkills', this.filters)
        }
    },
    methods: {
        toggleSkillFilterValue(id) {
            const index = this.filters.skills.indexOf(id)
            if (index === -1) {
                this.filters.skills.push(id)
            } else {
                this.filters.skills.splice(index, 1)
            }
        }
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

.selected {
    box-shadow: 0px 0px 5px green;
}
</style>