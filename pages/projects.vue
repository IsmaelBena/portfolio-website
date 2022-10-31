<template>    
    <div class="pageContent">
        <button @click="btnToProjects()">back to home</button>
        <button @click="btnToggleZoom()">Toggle Zoom</button>
        <div id="pageContentContainer" class="container">
            <div class="row align-items-center">
                <div id="filterBlock" class="col">
                    <div  class="contentBlock border">
                        <FilterTab />
                    </div>
                </div>
                <div class="col">
                    <div id="projectsBlock" class="contentBlock border">

                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { defineComponent } from 'vue'
import { FilterTab } from '~/components/filterTab'

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
    top: 50%;
    height: calc(100% - 75px);
    transform: translateY(-50%);
    min-width: 100%;
}

.container {
    border: solid red;
    padding: 75px;
}

.row {
    height: 100%;
    border: solid blue;
}

.col {
    min-width: 350px;
}

.contentBlock {
    height: 800px;
    background-color: rgba(50, 50, 50, 0.5);
    margin: 10px;
}

#filterBlock {
    max-width: 350px;
}

h1 {
    text-align: center;
}

h2 {
    text-align: justify;
    text-justify: inter-word;
}
</style>