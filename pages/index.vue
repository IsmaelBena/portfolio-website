<template>
    <div class="pageContent">
        <div id="pageContentContainer" class="container d-flex align-items-center noSelect">
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <h1 class="hand" @click="handleMenuClick('about')">Ismael Benadjal</h1>
                            <div v-if="activeList[0]" class="row underlineBanner">
                                <p>Full-stack Developer, Web Developer, Game Developer, AI ...</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h1 class="hand" @click="handleMenuClick('skills')">Skills</h1>
                            <div v-if="activeList[1]" class="carouselContainer">
                                <div class="carousel">
                                    <div v-for="i in 15" class="skillContainer">
                                        <SkillCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row hand">
                        <div class="col" @click="handleProjectsClick()">
                            <h1>Projects</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h1 class="hand" @click="handleMenuClick('socials')">Socials</h1>
                            <div v-if="activeList[2]" class="row contactLinksContainer">
                                <a href="https://www.linkedin.com/in/ismael-benadjal/" target="_blank">
                                    <img class="socialsImage" src="~/assets/linkedin-icon.png">
                                </a>
                                <a href="https://github.com/IsmaelBena" target="_blank">
                                    <img class="socialsImage" src="~/assets/github-icon.png">
                                </a>
                                <a href="https://www.linkedin.com/in/ismael-benadjal/" target="_blank">
                                    <img class="socialsImage" src="~/assets/linkedin-icon.png">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
    setup() {
        return {
            prevScrollTop: 0
        };
    },
    data() {
        return {
            activeList: [false, false, false],
            targetOptions: ['about', 'skills', 'socials'],
            currentTarget: -1,
            prevTarget: -1,
        };
    },
    mounted() {
        setTimeout(() => {
            if (this.$checkZoom() === true) {
                this.$toggleZoom();
            }
        }, 500);
    },
    methods: {
        handleProjectsClick() {
            this.$directionalScrollAnimation({direction: 'right', targetSpeed: 150, acceleration: 15})
            this.$router.push('/projects')
        },
        handleMenuClick(name) {
            this.currentTarget = this.targetOptions.indexOf(name)
            console.log(name, this.currentTarget, this.prevTarget)
            this.setActiveTarget()
            if (this.currentTarget === this.prevTarget) {
                this.currentTarget = -1
                this.prevTarget = -1
            } else if (this.currentTarget > this.prevTarget) {
                this.$directionalScrollAnimation({direction: 'down', targetSpeed: 50, acceleration: 5})
                setTimeout(() => {
                    this.$stopScrollingAnimation()
                }, 200)
            } else {
                this.$directionalScrollAnimation({direction: 'up', targetSpeed: 50, acceleration: 5})
                setTimeout(() => {
                    this.$stopScrollingAnimation()
                }, 200)
            }
            this.prevTarget = this.currentTarget
        },
        setActiveTarget() {
            console.log('init', this.currentTarget, this.activeList)
            this.activeList = this.activeList.map((element, index) => {
                if (index === this.currentTarget) {
                    return !element
                } else {
                    return element
                }
            })
            console.log('mid', this.activeList)
            if ((this.prevTarget !== -1) && (this.currentTarget !== this.prevTarget)) {
                this.activeList = this.activeList.map((element, index) => {
                    if (index === this.prevTarget) {
                        return !element
                    } else {
                        return element
                    }
                })
                console.log('final', this.activeList)
            }
        },
        handleScroll() {
            console.log(this.prevScrollTop - this.$refs.pageContent.scrollTop);
            this.$scrollAnimation(this.prevScrollTop - this.$refs.pageContent.scrollTop);
            this.prevScrollTop = this.$refs.pageContent.scrollTop;
        }
    },
    components: { RouterView }
})
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

#pageContentContainer {
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-75%);
}

.row {
    border: 1px solid red;
    width: min-content;
}

.col {
    border: 1px solid blue;
    width: max-content;
}

h1 {
    font-size: 100px;
    transition: 0.25s;
    white-space: nowrap;
}

h1:hover {
    transition: 0.25s;
    text-shadow: 0px 0px 3px white;
}


.underlineBanner {
    background-color: white;
    max-height: min-content;
    width: 685px;
    overflow-x: hidden;
    text-overflow: clip;
}

.underlineBanner > p {
    color: black;
    margin: 0px;
    white-space: nowrap;
}

.contactLinksContainer {
    background-color: white;
    display: flex;
    flex-direction: row;
    width: max-content;
    padding: 5px;
}

.contactLinksContainer > a{
    width: max-content;
    margin: 0px 5px;
}

.socialsImage {
    aspect-ratio: 1;
    width: 40px;
}

@media screen and (max-width: 770px) {
    h1 {
        font-size: 60px;
    }

    .underlineBanner {
        width: 411px;
    }
}

@media screen and (max-width: 450px) {
    h1 {
        font-size: 45px;
    }

    .underlineBanner {
        width: 308px;
    }
}

.carouselContainer {
    overflow: scroll;
    max-height: min-content;
    max-width: 1000px;
    border: 1px solid purple;
    white-space: nowrap;
}

.carousel {
}

.skillContainer {
    padding: 0 10px;
    max-width: min-content;
    display: inline-block;
}
</style>