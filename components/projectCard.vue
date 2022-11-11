<template>
    <div id="projectCard">
        <h1>Project Name</h1>
        <h2>Complete</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, minus. Neque voluptates id voluptate necessitatibus soluta quas, eius, quisquam fuga, consectetur odit exercitationem nam at fugit delectus doloribus ad hic.</p>
        <div v-for="i in 6" class="skillCardContainer">
            <SkillCard />
        </div>
        <div v-for="i in 3" class="linkContainer">
            <p>different links</p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { SkillCard } from '~/components/skillCard'

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
#projectCard {
    background-color: rgba(50, 50, 50, 0.5);
    width: 50px;
    align-content: center;
    padding: 0px;
    margin: 5px;
}

</style>