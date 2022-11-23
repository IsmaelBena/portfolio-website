<template>
    <div class="pageContent">
        <div class="pageContentContainer container d-flex align-items-center noSelect" :class="hidden ? 'hidden' : ''">
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <h1>Ismael Benadjal</h1>
                            <div class="row underlineBanner">
                                <p>Full-Stack Development, Front-End Development, Back-End Development, Game Development, Artifical Intelligence</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h1 class="hand glowHover" @click="handleMenuClick('skills')">Skills</h1>
                            <div v-if="activeOption === 'skills' && !loadingData" class="carouselContainer">
                                <ScrollButton v-if="showScrollButton[0]" arrowDir="left" @skillScroll="skillScroll" @initScrollBtn="manageScrollbuttons"/>
                                    <div class="carousel" ref="carousel" @scroll="manageScrollbuttons">
                                        <div v-for="tech in techData" :key="tech._id" class="skillContainer">
                                            <SkillCard :name="tech.name" :fileName="tech.image.fileName" />
                                        </div>
                                    </div>
                                <ScrollButton v-if="showScrollButton[1]" arrowDir="right" @skillScroll="skillScroll" @initScrollBtn="manageScrollbuttons"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col" @click="handleProjectsClick()">
                            <h1 class="hand glowHover">Projects</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h1 class="hand glowHover" @click="handleMenuClick('socials')">Socials</h1>
                            <div v-if="activeOption === 'socials'" class="row contactLinksContainer">
                                <a href="https://www.linkedin.com/in/ismael-benadjal/" target="_blank">
                                    <img class="socialsImage" src="~/assets/linkedin-icon.png">
                                </a>
                                <a href="https://github.com/IsmaelBena" target="_blank">
                                    <img class="socialsImage" src="~/assets/github-icon.png">
                                </a>
                                <a href="mailto:ismael.benadjal@gmail.com" target="_blank">
                                    <img class="socialsImage" src="~/assets/email-icon.png">
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
import axios from 'axios'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { ScrollButton } from '~/components/scrollButton'

export default defineComponent({
    data() {
        return {
            activeOption: '',
            loadingData: true,
            techData: [],
            showScrollButton: [false, true],
            hidden: true
        };
    },
    mounted() {
        axios.get('https://ismaelbena-api.online/technologies')
            .then(techRes => {
                this.techData = techRes.data
                setTimeout(() => {
                    this.$stopScrollingAnimation()
                }, 100)
                this.loadingData = false
                this.hidden = false
                console.log(techRes.data)
            })
    },
    methods: {
        handleProjectsClick() {
            this.$directionalScrollAnimation({direction: 'right', targetSpeed: 50, acceleration: 15})
            this.hidden = true
            setTimeout(() => {
                this.$router.push('/projects')
            }, 300)
        },
        handleMenuClick(name) {
            if (name === 'skills') {
                if (this.activeOption !== 'skills') {
                    this.activeOption = 'skills'
                    this.$directionalScrollAnimation({direction: 'up', targetSpeed: 50, acceleration: 5})
                    setTimeout(() => {
                        this.$stopScrollingAnimation()
                    }, 200)
                } else {
                    this.activeOption = ''
                }
            } else if (name === 'socials') {
                if (this.activeOption !== 'socials') {
                    this.activeOption = 'socials'
                        this.$directionalScrollAnimation({direction: 'down', targetSpeed: 50, acceleration: 5})
                    setTimeout(() => {
                        this.$stopScrollingAnimation()
                    }, 200)
                } else {
                    this.activeOption = ''
                }
            }
        },
        setActiveTarget() {
            this.activeList = this.activeList.map((element, index) => {
                if (index === this.currentTarget) {
                    return !element
                } else {
                    return element
                }
            })
            if ((this.prevTarget !== -1) && (this.currentTarget !== this.prevTarget)) {
                this.activeList = this.activeList.map((element, index) => {
                    if (index === this.prevTarget) {
                        return !element
                    } else {
                        return element
                    }
                })
            }
        },
        skillScroll(dir) {
            if (dir === 'right') {
                this.$refs.carousel.scrollLeft += 200
            } else {
                this.$refs.carousel.scrollLeft -= 200
            }
        },
        manageScrollbuttons() {
            if (this.$refs.carousel.clientWidth > 350) {
                if (this.$refs.carousel.scrollLeft + this.$refs.carousel.clientWidth >= this.$refs.carousel.scrollWidth) {
                    this.showScrollButton = [true, false]
                }
                else if (this.$refs.carousel.scrollLeft === 0) {
                    this.showScrollButton = [false, true]
                }
                else {
                    this.showScrollButton = [true, true]
                }
            }
            else {
                this.showScrollButton = [false, false]
            }
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

.pageContentContainer {
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 5%;
    opacity: 1;
    transform: translateY(-50%);
    transition: transform 0.5s, opacity 0.5s ease-in;
}

.hidden {
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: transform 0.5s, opacity 0.5s ease-in;
}

.row {
    /*border: 1px solid red;*/
    width: max-content;
}

.col {
    /*border: 1px solid blue;*/
    width: max-content;
}

h1 {
    font-size: 100px;
    transition: 0.25s;
    text-shadow: 0px 0px 3px white;
    white-space: nowrap;
}

.glowHover:hover {
    transition: 0.25s;
    text-shadow: 0px 0px 7px rgba(255, 255, 255, 0.9);
}

.underlineBanner {
    position: relative;
    background-color: rgba(50, 50, 50, 0.5);
    max-height: min-content;
    width: 685px;
    overflow-x: hidden;
    text-overflow: clip;
    transform: translateY(-10px);

    border: 3px solid rgba(50, 50, 50, 0.9);
    border-radius: 5px;
    overflow: hidden;
}

.underlineBanner > p {
    color: white;
    margin: 0px;
    white-space: nowrap;
    /* animation properties */
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    
    -moz-animation: my-animation 15s linear infinite;
    -webkit-animation: my-animation 15s linear infinite;
    animation: my-animation 15s linear infinite;
}

/* for Firefox */
@-moz-keyframes my-animation {
  from { -moz-transform: translateX(100%); }
  to { -moz-transform: translateX(-100%); }
}

/* for Chrome */
@-webkit-keyframes my-animation {
  from { -webkit-transform: translateX(100%); }
  to { -webkit-transform: translateX(-100%); }
}

@keyframes my-animation {
  from {
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  to {
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.contactLinksContainer {
    background-color: rgba(50, 50, 50, 0.5);
    border: 3px solid rgba(50, 50, 50, 0.9);
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    width: max-content;
    padding: 5px;
}

.contactLinksContainer > a {
    background-color: rgba(50, 50, 50, 0.5);;
    height: 60px;
    width: 60px;
    margin: 0px 5px;
    border-radius: 7px;
    border: 3px solid rgba(50, 50, 50, 0.9);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-clip: padding-box;
}

.socialsImage {
    aspect-ratio: 1;
    border-radius: 0px;
    width: 60px;
    box-sizing: border-box;
}

.carousel {
    max-height: max-content;
    white-space: nowrap;
    scroll-behavior: smooth;
    overflow: scroll;
    border: 3px solid rgba(50, 50, 50, 0.9);
    border-radius: 5px;
    background-color: rgba(50, 50, 50, 0.5);
    display: flex;
    align-items: center;
}

@media screen and (max-width: 770px) {
    h1 {
        font-size: 60px;
    }

    .underlineBanner {
        width: 411px;
    }

    .carousel {
        max-width: 411px;
    }

    .underlineBanner {
        transform: translateY(-5px);
    }

    .underlineBanner > p {
        font-size: 14px;
    }
}

@media screen and (max-width: 450px) {
    h1 {
        font-size: 45px;
    }

    .underlineBanner {
        width: 308px;
    }

    .carousel {
        max-width: 308px;
    }

    .underlineBanner > p {
        font-size: 12px;
    }
}

.carouselContainer {
    position: relative;
    max-width: 685px;
}

.skillContainer {
    padding: 0 2px;
    max-width: min-content;
    height: max-content;
    display: inline-block;
    text-overflow: clip;
}
</style>