<template>
    <div class="pageContent" @scroll="handleScroll" ref="pageContent">
        <button @click="handleClick()">go to projects</button>
        <button @click="handleTransitionClick()">toggle transition</button>
        <div id="pageContentContainer" class="container">
            <div class="row gy-3">
                <div class="col-12">
                    <transition name="landingTransition" appear>
                        <div v-show="showLanding" id="landingBlock" class="contentBlock border" ref="landing">
                            <h1>Ismael</h1>
                            <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, veritatis commodi, vel doloribus accusantium dolorum reprehenderit natus sapiente, fugiat possimus magni perferendis consectetur. Ipsa minus eos rem deserunt nulla, itaque odio, placeat modi recusandae quaerat officia delectus sunt a ea repellat explicabo accusantium! Facilis incidunt similique praesentium dolorem numquam iure eum quos quis officia ut alias placeat architecto nulla iste ratione et earum quaerat aliquam, tempora impedit sed aut quae quas! Reprehenderit et debitis incidunt nobis? Aut repellendus aliquid, culpa velit magni sapiente tempora est ea quasi maiores fuga illo tenetur cumque repudiandae omnis beatae nam reprehenderit sint quod eius!</h2>
                        </div>
                    </transition>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div id="skillsBlock border" class="contentBlock border">
                        <h1>Skills</h1>
                        <div class="row">                        
                            <div v-for="i in 10" class="col">
                                <SkillCard />
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div id="projectsPreview" class="contentBlock border">
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
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div id="contactBlock" class="contentBlock border">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { projectPreviewCard } from '~/components/projectPreviewCard'

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
            showContacts: false
        }
    },
    mounted() {
        this.showLanding = true
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
            if (this.prevScrollTop - this.$refs.pageContent.scrollTop > 0) {
                this.$scrollDownAnimation()
            }
            else {
                this.$scrollUpAnimation()
            }
            this.prevScrollTop = this.$refs.pageContent.scrollTop
        },
        handleTransitionClick() {
            console.log("transition clicked")
            this.showLanding = !this.showLanding
        }
    }
})
</script>

<style scoped>

.container {
    padding-top: 250px;
}

.contentBlock {
    min-height: 500px;
    background-color: rgba(50, 50, 50, 0.5);
    margin: 10px;
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