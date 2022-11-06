<template>
    <div class="pageContent">
        <!--
        <button @click="btnToProjects()">back to home</button>
        <button @click="btnToggleZoom()">Toggle Zoom</button>
        
        
            <div class="row justify-content-around align-items-center">
                <div id="filterBlock" class="col">
                    <div  class="contentBlock border">
                        <FilterTab />
                    </div>
                </div>
                <div class="col">
                    <div id="projectsBlock" class="row justify-content-around align-content-start contentBlock border">
                        <div v-for="i in 10" class="projectPreviewContainers">
                            <ProjectPreviewCard />
                        </div>
                    </div>
                </div>
            </div>
        
    -->
    <div id="pageContentContainer" class="container">
        <div class="row">
            <div class="col">
                <div id="filterBlock" class="contentBlock">

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="contentBlock">

                </div>
            </div>
        </div>
    </div>
    
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { FilterTab } from '~/components/filterTab'
import { ProjectPreviewCard } from '~/components/projectPreviewCard'

export default defineComponent({
    setup () {
        return {
        }
    },
    mounted() {
        setTimeout(() => {
            if (this.$checkZoom() === true) {
                this.$toggleZoom()
            }
        }, 500)    
    },
    methods: {
        btnToProjects() {
            this.$toggleZoom()
            this.$router.push('/')
        },
        btnToggleZoom() {
            this.$toggleZoom()
        }
    }
})
</script>

<style scoped>
#pageContentContainer {
    overflow-y: scroll;
    position: absolute;
    height: 100%;
    min-width: 100%;
}

.container {
    padding: 10px 20px;
}

.row {
    background-color: rgba(0, 0, 255, 0.5);
}

.col {
    width: 100%;
    background-color: rgba(0, 255, 0, 0.5);
}

.contentBlock {
    background-color: rgba(255, 0, 0, 0.5);
}


#filterBlock {
    min-height: 100px;
}

h1 {
    text-align: center;
}

h2 {
    text-align: justify;
    text-justify: inter-word;
}

.projectPreviewContainers {
    width: min-content;
    padding: 10px 0px;
}
</style>