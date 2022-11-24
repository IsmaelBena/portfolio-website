<template>
    <Transition name="filterOptions">
        <div v-if="filtering" id="filterTab">
            <form class="row">
                <div id="nameFilter" class="form-floating">
                    <input id="nameInput" type="text" class="form-control" placeholder="Project Name" v-model="filters.name">
                    <label for="nameInput">Project Name</label>
                </div>
                <div class="checkBoxes">
                    <div id="completeFilter" class="form-check form-switch checkBox">
                        <input id="completeCheckInput" class="form-check-input" type="checkbox" v-model="filters.completeOnly">
                        <label class="form-check-label" for="completeCheckInput">Only Show Complete</label>
                    </div>
                    <div id="sourceCodeFilter" class="form-check form-switch checkBox">
                        <input id="sourceCodeCheckInput" class="form-check-input" type="checkbox" v-model="filters.codeOnly">
                        <label class="form-check-label" for="sourceCodeCheckInput">Code Available</label>
                    </div>
                </div>
            </form>
            <div id="technologiesFilter" class="row justify-content-around">
                <h3>Skills</h3>
                <div class="skillCardBlock">
                    <div v-for="card in techData" :key="card._id" class="skillCardContainers hand" :class="(filters.skills.includes(card._id)) ? 'selected' : ''" @click="toggleSkillFilterValue(card._id)">
                        <SkillCard :name="card.name" :fileName="card.image.fileName" />
                    </div>
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
    position: absolute;
    box-sizing: border-box;
    left: 10px;
    height: min-content;
    max-height: 90%;
    width: calc(100% - 20px);
    background-color: rgba(50, 50, 50, 0.9);
    transform-origin: top;
    z-index: 100;
    padding: 10px;
    overflow-y: scroll;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 2px solid rgba(75, 75, 75, 0.9);
    border-top: 3px solid rgba(50, 50, 50, 0.9);
}

label {
    margin-left: 5px;
}

.row {
    margin: 0px;
}

#nameFilter {
    max-width: 1000px;
    padding: 0px 5px;
}

form {
    display: flex;
    flex-direction: row;
}

.checkBoxes {
    width: max-content;
    align-self: center;
    margin: 5px;
    padding: 0px;
}

.checkBox > label {
    color: white;
}

#technologiesFilter {
    padding: 0px 5px;
    margin: 0px;
}

#technologiesFilter > h3 {
    padding: 0px;
    margin: 0px;
}



.skillCardBlock {
    overflow-y: scroll;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    justify-content: center;
    align-content: center;
    column-gap: 20px;
    row-gap: 10px;
    background-color: rgba(60, 60, 60, 0.5);
    box-sizing: border-box;
    margin: 0px 10px;
    padding: 10px;
    border: 2px solid rgba(80, 80, 80, 0.9);
    border-radius: 5px;
}

.skillCardContainers {
    padding: 0px;
    margin: 0px;
    justify-self: center;
    align-self: center;
    max-width: 70px;
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
    background-color: white;
    box-shadow: 0px 0px 7px white;
    border-radius: 0.375rem;
}

#skillCard {
    margin: 0px;
}
</style>