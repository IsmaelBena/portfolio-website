<template>
    <div id="projectPreviewCard" class="card border">
        <div class="card-body">
            <h3 class="card-title">Project Name</h3>
            <div class="row gx-0">
                <div class="col">
                    <SkillCard />
                </div>
                <div class="col">
                    <SkillCard />
                </div>
                <div class="col">
                    <SkillCard />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { SkillCard } from '~/components/skillCard'

export default defineComponent({
    setup () {
        return {}
    },
    methods: {
        handleClick() {
            
        }
    }
})
</script>

<style scoped>
#projectPreviewCard {
    background-color: rgba(100, 100, 100, 0.5);
}
</style>