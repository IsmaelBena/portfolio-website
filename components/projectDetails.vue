<template>
    <div id="projectDetails">
        <div class="closeBtnDiv noSelect hand" @click="$emit('disableDetails')">
            <p>X</p>
        </div>
        <div class="projectHeader">
            <div class="projectNameBox">
                <h1 id="projectName">{{projectData.name}}</h1>
            </div>
            <div class="projectStatusBox">
                <p id ="projectStatus">{{projectData.status}}</p>
            </div>
        </div>
        <div class="projectDescriptionArea area">
            <h3>About</h3>
            <div class="projectDescriptionBox">
                <ul>
                    <li v-for="i in projectData.description" :key="i" class="descriptionItem">
                        {{i}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="projectTechArea area">
            <h3>Technologies</h3>
            <div class="projectTechBox">
                <div v-for="skill in skillCardsData" :key="skill._id" class="skillCardContainer">
                    <SkillCard :name="skill.name" :fileName="skill.fileName" />
                </div>
            </div>
        </div>
        <div v-if="projectData.links !== undefined" class="projectLinksArea">
            <h3>Project Links</h3>
            <div class="projectLinksBox area">
                <div v-for="i in projectData.links" :key="i.url" class="linkContainer">
                    <LinkButton :url="i.url" :linkType ="i.linkType"/>
                </div>
            </div>
        </div>            
    </div>
</template>

<script>
import { defineComponent, set } from 'vue'
import { SkillCard } from '~/components/skillCard'
import { LinkButton } from '~/components/linkButton'

export default defineComponent({
    props: {
        projectData: undefined,
        techData: []
    },
    setup () {
        return {}
    },
    data() {
        return {
            skillCardsData: []
        }
    },
    mounted() {
        for (let t = 0; t < this.projectData.tech.length; t++) {
            this.skillCardsData.push({name: this.techData.find(data => data._id === this.projectData.tech[t]).name, fileName: this.techData.find(data => data._id === this.projectData.tech[t]).image.fileName})
        }
    }
        
})
</script>

<style scoped>
#projectDetails {
    background-color: rgba(50, 50, 50, 0.9);
    border: 3px solid rgba(150, 150, 150, 0.9);
    border-radius: 5px;
    min-width: 50%;
    width: 500px;
    max-width: 95%;
    height: max-content;
    max-height: 95%;
    align-content: center;
    padding: 0px;
    margin: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    margin: 0px;
    box-sizing: border-box;
    overflow-y: scroll;
}

p {
    color: white;
    margin: 0px;
}

h1, h2, h3{
    margin: 0px;
}

.closeBtnDiv {
    background-color: red;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 2px;
    border: 1px solid rgba(150, 150, 150, 0.9);
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
    background-clip: padding-box;
}


.area{
    margin-top: 5px;
    margin-bottom: 5px;
}

.projectHeader{
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.projectNameBox{
    width: max-content;
    height: max-content;
}

.projectStatusBox{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(150, 150, 150, 0.3);
    padding: 0px 5px 3px 5px;
    border-radius: 5px;
    margin: 3px;
}

.projectDescriptionArea {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid rgba(150, 150, 150, 0.1);
    border-radius: 5px;
    text-align: center;
    background-color: rgba(25, 25, 25, 0.1);
}

.projectDescriptionBox {
    display: flex;
    flex-direction: row;
    justify-content: start;
    border-top: 2px solid rgba(150, 150, 150, 0.1);
    padding-top: 5px;
    text-align: left;
}

ul {
    padding-left: 20px;
    text-align: left;
    color: white;
}

.projectTechArea {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid rgba(150, 150, 150, 0.1);
    border-radius: 5px;
    text-align: center;
    background-color: rgba(25, 25, 25, 0.1);
}

.projectTechBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-top: 2px solid rgba(150, 150, 150, 0.1);
}

.projectLinksArea{
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid rgba(150, 150, 150, 0.1);
    border-radius: 5px;
    text-align: center;
    background-color: rgba(25, 25, 25, 0.1);
}

.projectLinksBox {
    height: max-content;
    border-top: 2px solid rgba(150, 150, 150, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 5px;
}

.linkContainer {
    height: max-content;
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
}

h3 {
    padding: 5px 0px;
}

.skillCardContainer {
    margin: 5px;
    padding: 0px;
    width: max-content;
    height: max-content;
}

</style>