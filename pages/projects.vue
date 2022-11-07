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
        <div id="pageContentContainer" class="container d-flex flex-column justify-content-start">
            <div class="row">
                <div id="filterBlock" class="col contentBlock">
                    <div class="row justify-content-between">
                        <div class="col filterHeadingCol">
                            <h1>Projects</h1>
                        </div>
                        <div class="col filterHeadingCol" @click="filterButtonHandler">
                            <h1>Filter</h1>
                        </div>
                    </div>
                    <FilterTab :filtering="filtering" />
                </div>
            </div>
            <div class="row projectsRow">
                <div class="col projectsCol">
                    <div id="projectsBlock" class="row justify-content-around align-content-start contentBlock" :class="filtering ? 'filtering' : 'notFiltering'">
                        <div v-for="i in 10" class="col projectPreviewContainers">
                            <ProjectPreviewCard />
                        </div>
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
    data() {
        return {
            filtering: false
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
        },
        filterButtonHandler() {
            if (this.filtering) {
                this.$setZoom(1)
                this.filtering = false
                setTimeout(() => {
                    if (this.$checkZoom() !== 0) {
                        this.$setZoom(0)
                    }
                }, 1000)
            } else {
                this.$setZoom(-1)
                this.filtering = true
                setTimeout(() => {
                    if (this.$checkZoom() !== 0) {
                        this.$setZoom(0)
                    }
                }, 1000)
            }
        }
    }
})
</script>

<style scoped>
.pageContent {
    overflow-y: hidden;
    position: absolute;
    height: 100%;
    min-width: 100%;
}

#pageContentContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 80%;
    min-width: 80%;
    overflow-y: hidden;
}

.container {
    padding: 10px 20px;
}

.col {
    width: 100%;
}

#filterBlock {
    max-height: min-content;
}

.projectsRow {
    padding-top: 20px;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
}

.projectsCol {
    height: 100%;
    overflow: hidden;
}

#projectsBlock {
    overflow-y: scroll;
    height: 100%;
}

.filtering {
    transition-delay: 0.25s;
    transition: all 0.75s cubic-bezier(.65,0,.35,1);
    transform: scale(0.75);
    opacity: 0.5;
    overflow-y: hidden !important;
}

.notFiltering {
    transition-delay: 0.25s;
    transition: all 0.75s cubic-bezier(.65,0,.35,1);
}

@media only screen and (max-width: 810px) {
    #pageContentContainer {
        position: absolute;
        height: 98%;
        min-width: 98%;
    }
}

h1 {
    text-align: center;
    width: min-content;
}

h2 {
    text-align: justify;
    text-justify: inter-word;
}

.projectPreviewContainers {
    max-width: min-content;
    padding: 10px;
}

.filterHeadingCol {
    max-width: min-content
}
</style>