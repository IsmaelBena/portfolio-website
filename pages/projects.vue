<template>
    <div class="pageContent">
        <div id="pageContentContainer" class="container d-flex flex-column justify-content-start noSelect">
            <div class="row">
                <div id="filterBlock" class="col contentBlock">
                    <div class="row justify-content-between align-items-center">
                        <div class="col filterHeadingCol hand" @click="handleHomeClick">
                            <h2>Home</h2>
                        </div>
                        <div class="col filterHeadingCol">
                            <h1>Projects</h1>
                        </div>
                        <div class="col filterHeadingCol hand" @click="filterButtonHandler">
                            <h2>Filter</h2>
                        </div>
                    </div>
                    <FilterTab :filtering="filtering" :techData="techData" @applyName="applyName"  @applyCompleteOnly="applyCompleteOnly"  @applyCodeOnly="applyCodeOnly"  @applySkills="applySkills"/>
                </div>
            </div>
            <div class="row projectsRow">
                <div class="col projectsCol">
                    <div v-if="!loadingData" id="projectsBlock" class="row justify-content-around align-content-start contentBlock" :class="filtering ? 'filtering' : 'notFiltering'">
                        <div v-for="project in filteredProjectsData" :key="project._id" class="col projectPreviewContainers">
                            <ProjectPreviewCard :name="project.name" :tech="project.tech" :techData="techData" @enableDetails="enableDetails(project._id)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showDetails" class="detailsBlock">
            <ProjectDetails :projectData="projectData" :techData="techData" @disableDetails="disableDetails" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { FilterTab } from '~/components/filterTab'
import { ProjectPreviewCard } from '~/components/projectPreviewCard'
import { ProjectDetails } from '~/components/projectDetails'
import axios from 'axios'

export default defineComponent({
    setup () {
        return {
        }
    },
    data() {
        return {
            showDetails: false,
            loadingData: true,
            filtering: false,
            projectsData: [],
            filteredProjectsData: [],
            techData: [],
            projectData: undefined,
        }
    },
    mounted() {
        axios.get('http://localhost:8000/projects')
        .then(projectsRes => {
            this.projectsData = projectsRes.data
            this.filteredProjectsData = projectsRes.data
            console.log(projectsRes.data)
            axios.get('http://localhost:8000/technologies')
            .then(techRes => {
                this.techData = techRes.data
                setTimeout(() => {
                    this.$stopScrollingAnimation()
                }, 100)
                console.log('projects data: ', this.projectsData)
                console.log('tech data: ', this.techData)
                this.loadingData = false
            })
        })
    },
    methods: {
        handleHomeClick() {
            this.$directionalScrollAnimation({direction: 'left', targetSpeed: 150, acceleration: 15})
            this.$router.push('/')
        },
        filterButtonHandler() {
            if (!this.showDetails) {
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
        },
        homebutton() {
            this.$router.push('/')
        },
        disableDetails() {
            this.showDetails = false;
        },
        enableDetails(target) {
            console.log(target)
            if (!this.showDetails && !this.filtering)  {
                console.log(target)
                this.projectData = this.projectsData.find(project => project._id === target)
                this.showDetails = true
            }
        },
        applyName(filters) {
            console.log('name change called')
            this.filteredProjectsData = this.projectsData.filter(project => {
                return project.name.toLowerCase().includes(filters.name)
            })
            
            console.log('filtered name after skill: ',filters.name , this.filteredProjectsData)
            if (filters.completeOnly) {
                this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                    return project.status.toLowerCase() === "complete"
                })
            }
            if (filters.codeOnly) {
                this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                    return project.links.indexOf(link => {
                        return (link.linkType.toLowerCase() === "source code") || (link.linkType.toLowerCase() === "github")
                    })
                })
            }
            if (filters.skills.length > 0) {
                this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                    return filters.skills.every(fskill => project.tech.includes(fskill));
                })
            }
            console.log('filtered skill aftername after skill: ', filters.name , this.filteredProjectsData)
        },
        applyCompleteOnly(filters) {
            console.log('complete change called')
            if (filters.completeOnly) {
                this.filteredProjectsData = this.projectsData.filter(project => {
                    return project.status.toLowerCase() === "complete"
                })
            } else {
                this.filteredProjectsData = this.projectsData
            }
            this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                return project.name.toLowerCase().includes(filters.name)
            })
            if (filters.codeOnly) {
                this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                    return project.links.indexOf(link => {
                        return (link.linkType.toLowerCase() === "source code") || (link.linkType.toLowerCase() === "github")
                    })
                })
            }
            if (filters.skills.length > 0) {
                this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                    return filters.skills.every(fskill => project.tech.includes(fskill));
                })
            }
        },
        applyCodeOnly(filters) {
            console.log('code change called')
            if (filters.codeOnly) {
                this.filteredProjectsData = this.projectsData.filter(project => {
                    return project.links.indexOf(link => {
                        return (link.linkType.toLowerCase() === "source code") || (link.linkType.toLowerCase() === "github")
                    })
                })
            } else {
                this.filteredProjectsData = this.projectsData
            }
            this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                return project.name.toLowerCase().includes(filters.name)
            })
            if (filters.completeOnly) {
                this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                    return project.status.toLowerCase() === "complete"
                })
            }
            if (filters.skills.length > 0) {
                this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                    return filters.skills.every(fskill => project.tech.includes(fskill));
                })
            }
        },
        applySkills(filters) {
            console.log('skills change called')
            if (filters.skills.length > 0) {
                this.filteredProjectsData = this.projectsData.filter(project => {
                    return filters.skills.every(fskill => project.tech.includes(fskill));
                })
                console.log('filtered skills: ', this.filteredProjectsData)
            } else {
                this.filteredProjectsData = this.projectsData
            }
            this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                return project.name.toLowerCase().includes(filters.name)
            })
            if (filters.codeOnly) {
                this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                    return project.links.indexOf(link => {
                        return (link.linkType.toLowerCase() === "source code") || (link.linkType.toLowerCase() === "github")
                    })
                })
            }
            if (filters.completeOnly) {
                this.filteredProjectsData = this.filteredProjectsData.filter(project => {
                    return project.status.toLowerCase() === "complete"
                })
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

.projectPreviewContainers {
    max-width: min-content;
    padding: 10px;
}

.filtering {
    transition-delay: 1s;
    transition: all 0.75s cubic-bezier(.65,0,.35,1);
    transform: scale(0.75);
    opacity: 0.5;
    overflow-y: hidden !important;
}

.notFiltering {
    transition-delay: 1s;
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

.filterHeadingCol {
    max-width: min-content
}

</style>