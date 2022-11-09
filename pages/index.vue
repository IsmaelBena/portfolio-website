<template>
    <div class="pageContent" @scroll="handleScroll" ref="pageContent">
        <!-- <button @click="handleClick()">go to projects</button> -->
        <div id="pageContentContainer" class="container" ref="landingBlock">
            <div class="row gy-3 contentRow">
                <div class="col-12">
                    <div id="landingBlock" class="contentBlock border d-flex flex-column justify-content-between">
                        <div></div>
                        <div class="innerContentEnd">
                            <h1>Ismael</h1>
                            <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, veritatis commodi, vel doloribus accusantium dolorum reprehenderit natus sapiente, fugiat possimus magni perferendis consectetur. Ipsa minus eos rem deserunt nulla, itaque odio, placeat modi recusandae quaerat officia delectus sunt a ea repellat explicabo accusantium! Facilis incidunt similique praesentium dolorem numquam iure eum quos quis officia ut alias placeat architecto nulla iste ratione et earum quaerat aliquam, tempora impedit sed aut quae quas! Reprehenderit et debitis incidunt nobis? Aut repellendus aliquid, culpa velit magni sapiente tempora est ea quasi maiores fuga illo tenetur cumque repudiandae omnis beatae nam reprehenderit sint quod eius!</h2>
                        </div>
                        <ScrollButton direction="down" text="Skills" destination="1" @scroll="(destination) => { scrollToBlock(destination) }"/>
                    </div>
                </div>
            </div>
            <div class="row contentRow" ref="skillsBlock">
                <div class="col-12">
                    <div id="skillsBlock border" class="contentBlock border d-flex flex-column justify-content-between">
                        <ScrollButton direction="up" text="Landing" destination="0" @scroll="(destination) => { scrollToBlock(destination) }"/>
                        <div class="innerContent">
                            <h1>Skills</h1>
                            <div class="row">                        
                                <div v-for="i in 10" class="col">
                                    <SkillCard />
                                </div>                            
                            </div>
                        </div>
                        <ScrollButton direction="down" text="Projects Preview" destination="2" @scroll="(destination) => { scrollToBlock(destination) }"/>
                    </div>
                </div>
            </div>
            <div class="row contentRow" ref="projectPreviewBlock">
                <div class="col-12">
                    <div id="projectsPreview" class="contentBlock border d-flex flex-column justify-content-between">
                        <ScrollButton direction="up" text="Skills" destination="1" @scroll="(destination) => { scrollToBlock(destination) }"/>
                        <div class="innerContent">
                            <h1>Highlighted Projects</h1>
                            <div class="row">
                                <div class="col">
                                    <projectPreviewCard />
                                </div>
                                <div class="col">
                                    <projectPreviewCard />
                                </div>
                                <div class="col">
                                    <projectPreviewCard />
                                </div>
                            </div>

                        </div>
                        <ScrollButton direction="down" text="Contact Me" destination="3" @scroll="(destination) => { scrollToBlock(destination) }"/>
                    </div>
                </div>
            </div>
            <div class="row contentRow" ref="contactBlock">
                <div class="col-12">
                    <div id="contactBlock" class="contentBlock border d-flex flex-column justify-content-between">
                        <ScrollButton direction="up" text="Projects Preview" destination="2" @scroll="(destination) => { scrollToBlock(destination) }"/>
                        <div class="innerContentEnd">
                            <h1>Contact Me</h1>
                            <div class="row">
                                <div class="col">
                                    <projectPreviewCard />
                                </div>
                                <div class="col">
                                    <projectPreviewCard />
                                </div>
                                <div class="col">
                                    <projectPreviewCard />
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { projectPreviewCard } from '~/components/projectPreviewCard'
import { ScrollButton } from '~/components/scrollButton'

export default defineComponent({
    setup () {
        return {
            prevScrollTop: 0
        }
    },
    data() {
        return {
            showLanding: false,
            showSkills: false,
            showProjectsPreview: false,
            showContacts: false,
            scrollPosition: 0,
            scrollPoints: ['landingBlock', 'skillsBlock', 'projectPreviewBlock', 'contactBlock']
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
        handleClick() {
            this.$toggleZoom()
            setTimeout(() => {
                this.showLanding = false
                    setTimeout(() => {
                    this.$router.push('/projects')
                }, 500)
            }, 250)            
            
        },
        handleScroll() {
            console.log(this.prevScrollTop - this.$refs.pageContent.scrollTop)
            this.$scrollAnimation(this.prevScrollTop - this.$refs.pageContent.scrollTop)
            this.prevScrollTop = this.$refs.pageContent.scrollTop
        },
        scrollDown() {
            if (this.scrollPosition >= this.scrollPoints.length - 1) {
                this.scrollPosition = this.scrollPoints.length - 1
                console.log('at bottom element')
            } else {
                this.scrollPosition += 1
                console.log('scrolling Down to', this.scrollPosition)
                this.$refs['pageContent'].scrollTo({top: this.$refs[this.scrollPoints[this.scrollPosition]].offsetTop, left: 0, behavior: 'smooth'})
            }
        },
        scrollUp() {
            if (this.scrollPosition <= 0) {
                this.scrollPosition = 0
                console.log('at bottom element')
            } else {
                this.scrollPosition -= 1
                console.log('scrolling up to', this.scrollPosition)
                this.$refs['pageContent'].scrollTo({top: this.$refs[this.scrollPoints[this.scrollPosition]].offsetTop, left: 0, behavior: 'smooth'})
            }
        },
        scrollToBlock(destination) {
            console.log('Scrolling to', destination)
            this.scrollPosition = destination
            console.log('Set this dest to', this.scrollDestination)
            this.$refs['pageContent'].scrollTo({top: this.$refs[this.scrollPoints[this.scrollPosition]].offsetTop, left: 0, behavior: 'smooth'})
        }
    }
})
</script>

<style scoped>

.pageContent {
    overflow: hidden;
}

.contentRow {
    height: 100vh;
    overflow: hidden;
}

.contentBlock {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    height: 80vh;
}

.innerContent {
    max-height: calc(100% - 240px);
    overflow-y: scroll;
    border: 1px solid red;
}

.innerContentEnd {
    max-height: calc(100% - 120px);
    overflow-y: scroll;
    border: 1px solid red;
}

h1 {
    text-align: center;
}

h2 {
    text-align: justify;
    text-justify: inter-word;
}

.landingTransition-enter {
    transform: scale(0) !important;
    opacity: 0 !important;
}

.landingTransition-enter-active {
    transition: all 0.25s ease-in-out;
}

.landingTransition-leave-active {
    transition: all 0.25s ease-in-out;
}

.landingTransition-leave-to {
    transform: scale(2);
    opacity: 0;
}
</style>