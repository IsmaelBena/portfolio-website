<template>
    <div class="pageContent">
        <div class="pageContentContainer container d-flex flex-column justify-content-start noSelect" :class="managePageState()">
            <div class="row default-style">
                <div id="filterBlock" class="col contentBlock">
                    <div class="row justify-content-between align-items-center">
                        <div class="col filterHeadingCol headerButtons hand" @click="handleHomeClick">
                            <h2>Home</h2>
                        </div>
                        <div class="col filterHeadingCol projectsTitle">
                            <h1>Projects</h1>
                        </div>
                        <div class="col filterHeadingCol headerButtons hand" @click="filterButtonHandler">
                            <h2>Filter <b>≡</b></h2>
                        </div>
                    </div>
                    <FilterTab :filtering="filtering" :techData="techData" @applyName="applyName"  @applyCompleteOnly="applyCompleteOnly"  @applyCodeOnly="applyCodeOnly"  @applySkills="applySkills"/>
                </div>
            </div>
            <div class="row projectsRow">
                <div class="col projectsCol">
                    <div v-if="!loadingData" id="projectsBlock" class="row justify-content-around align-content-start contentBlock default-style" :class="filtering ? 'filtering' : 'notFiltering'">
                        <div v-for="project in filteredProjectsData" :key="project._id" class="col projectPreviewContainers">
                            <ProjectPreviewCard :name="project.name" :tech="project.tech" :techData="techData" @enableDetails="enableDetails(project._id)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showDetails" class="detailsBlock" :class="showDetailsAnim ? 'detailsVisible' : 'detailsHidden'">
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
            showDetailsAnim: false,
            loadingData: true,
            leaving: false,
            filtering: false,
            projectsData: [],
            filteredProjectsData: [],
            techData: [],
            projectData: undefined
        }
    },
    mounted() {
        axios.get('https://ismaelbena-api.online/projects')
        .then(projectsRes => {
            this.projectsData = projectsRes.data
            this.filteredProjectsData = projectsRes.data
            console.log(projectsRes.data)
            axios.get('https://ismaelbena-api.online/technologies')
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
            this.$directionalScrollAnimation({direction: 'left', targetSpeed: 50, acceleration: 15})
            this.leaving = true
            setTimeout(() => {
                this.$router.push('/')
            }, 300)            
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
        disableDetails() {
            this.showDetails = false;
            this.showDetailsAnim = false;
            console.log('disable details')
        },
        enableDetails(target) {
            console.log(target)
            if (!this.showDetails && !this.filtering)  {
                console.log(target)
                this.projectData = this.projectsData.find(project => project._id === target)
                this.showDetails = true
                setTimeout(() => {
                    this.showDetailsAnim = true
                }, 100)
            }
            console.log('show details')
            console.log(this.showDetails)
        },
        applyName(filters) {
            console.log('name change called')
            this.filteredProjectsData = this.projectsData.filter(project => {
                return project.name.toLowerCase().includes(filters.name.toLowerCase())
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
                return project.name.toLowerCase().includes(filters.name.toLowerCase())
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
                return project.name.toLowerCase().includes(filters.name.toLowerCase())
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
                return project.name.toLowerCase().includes(filters.name.toLowerCase())
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
        },
        managePageState() {
            let classes = ''
            if (this.loadingData || this.leaving) {
                classes = 'hidden'
            } else {
                classes = 'visible'
                if (this.showDetails) {
                    classes += ' unfocus'
                } else {
                    classes += ' focused'
                }
            }            
            return classes
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

.pageContentContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 80%;
    min-width: 80%;
    overflow-y: hidden;
}

.hidden {
    transform: translate(50%, -50%);
    opacity: 0;
    transition: transform 0.5s, opacity 0.5s ease-in;
}

.visible {
    opacity: 1;
    transition: transform 0.5s, opacity 0.6s ease-out;
}

.focus {
    transition: all 0.75s cubic-bezier(.65,0,.35,1);
}

.unfocus {
    pointer-events: none;
    transition-delay: 1s;
    transition: all 0.75s cubic-bezier(.65,0,.35,1);
    transform: translate(-50%, -50%) scale(0.75);
    opacity: 0.3;
    overflow-y: hidden !important;
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    justify-content: center;
    align-content: center;
}

.projectPreviewContainers {
    padding: 3px;
    justify-self: center;
    align-self: center;
    min-width: max-content;
    width: 320px;
    margin: 10px 5px 10px 5px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
}

.projectPreviewContainers:hover {
    background-color: rgba(200, 200, 200, 0.4);
    transition: delay 500ms;
}

.filtering {
    transition-delay: 1s;
    transition: all 0.75s cubic-bezier(.65,0,.35,1);
    transform: scale(0.75);
    opacity: 0.3;
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
    text-shadow: 0px 0px 3px white;
}

h2 {
    text-align: justify;
    text-justify: inter-word;
    text-shadow: 0px 0px 3px white;
}

.detailsSpacing {
    width: 100vw;
    height: 100vh;
    z-index: 10;
}

.projectsTitle {
    max-width: min-content;
}
.headerButtons {
    max-width: max-content;
    background-color: rgba(100, 100, 100, 0.5);
    height: 56px;
    display: inherit;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
}

.detailsVisible {
    transition: all 0.75s cubic-bezier(.65,0,.35,1);
}

.detailsHidden {
    transition: all 0.75s cubic-bezier(.65,0,.35,1);
    opacity: 0;
}
</style>