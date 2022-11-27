<template>
    <div id="projectPreviewCard" class="card hand" @click="$emit('enableDetails')">
        <div class="card-body">
            <h3 class="card-title">{{name}}</h3>
            <div class="techBlock">
                <div v-for="t in techToLoop" :key="t.id" class="col techContainers">
                    <SkillCard :name="t.name" :fileName="t.fileName" />
                </div>
                <p v-if="extraTech">...</p>
            </div>
        </div>
    </div>
</template>

<script>
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
        if (this.tech.length < 4)
        {
            this.techToLoop = this.skillCardsData
        } else {
            this.techToLoop = this.skillCardsData.slice(0, 3)
            this.extraTech = true
        }
    },
    methods: {

    }
})
</script>

<style scoped>
#projectPreviewCard {
    background-color: rgba(255, 255, 255, 0.06);
    border-radius: 4px;
    width: 324px;
    position: relative;
}

h3 {
    font-size: 20px;
}

.techBlock{
    width: max-content;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.techBlock > p{
    color: white;
    align-self: end;
}

.techContainers, .col{
    width: max-content;
    height: max-content;
    padding: 0px 8px;
}

</style>