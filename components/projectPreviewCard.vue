<template>
    <div id="projectPreviewCard" class="card border hand" @click="$emit('enableDetails')">
        <div class="card-body">
            <h3 class="card-title">{{name}}</h3>
            <div class="techContainer">
                <div v-for="t in techToLoop" :key="t.id" class="col">
                    <SkillCard :name="t.name" :fileName="t.fileName" />
                </div>
                <p v-if="extraTech">...</p>
            </div>
        </div>
    </div>
</template>

<script>
import { stringLiteral } from '@babel/types';
import { defineComponent } from 'vue'
import { SkillCard } from '~/components/skillCard'

export default defineComponent({
    props: {
        name: String,
        tech: [],
        techData: []
    },
    setup () {
        return {}
    },
    data () {
        return {
            techToLoop: [],
            extraTech: false,
            toPush: {name: "none", fileName: ''},
            skillCardsData: []
        }
    },
    mounted() {
        for (let t = 0; t < this.tech.length; t++) {
            this.skillCardsData.push({name: this.techData.find(data => data._id === this.tech[t]).name, fileName: this.techData.find(data => data._id === this.tech[t]).image.fileName})
        }
        if (this.tech.length < 5)
        {
            this.techToLoop = this.skillCardsData
        } else {
            this.techToLoop = this.skillCardsData.slice(0, 4)
            this.extraTech = true
        }
    },
    methods: {

    }
})
</script>

<style scoped>
#projectPreviewCard {
    background-color: rgba(100, 100, 100, 0.5);
    width: 320px;
}

h3 {
    font-size: 20px;
}

.techContainer{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.techContainer > p{
    color: white;
    align-self: end;
}
</style>