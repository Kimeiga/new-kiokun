<script setup>
const props = defineProps(['data', 'svgSimp', 'svgTrad']);

const simpSVG = ref(null);
const tradSVG = ref(null);

onMounted(async () => {
    await nextTick(); // Ensure the DOM has been updated

    const simpElement = simpSVG.value;
    const tradElement = tradSVG.value;

    if (simpElement) {
        let simpOriginal = simpElement.innerHTML;
        let simpN = (simpOriginal.match(/--d:[0-9]+s/g) || []).length;

        setInterval(() => {
            simpElement.innerHTML = simpOriginal; // Reset the innerHTML to restart the animation
        }, (simpN + 1) * 1000);
    }

    if (tradElement) {
        let tradOriginal = tradElement.innerHTML;
        let tradN = (tradOriginal.match(/--d:[0-9]+s/g) || []).length;

        setInterval(() => {
            tradElement.innerHTML = tradOriginal; // Reset the innerHTML to restart the animation
        }, (tradN + 1) * 1000);
    }
});
</script>


<template>
    <div class="element">
        <div class="element-left-icon">

            <img class="word-icon" src="/c_c.png" alt="chinese character tag">
        </div>
        <div class="element-left">
            <div style="display: flex; flex-direction: row; align-items: center; font-size: 3rem;">
                <span>{{ data.char }}</span>
                <div ref="simpSVG" v-if="svgSimp" style="display: inline; width: 2.1ch; height: 3rem;" v-html="svgSimp"></div>
                <div ref="tradSVG" v-if="svgTrad" style="display: inline; width: 2.1ch; height: 3rem;" v-html="svgTrad"></div>
            </div>
            <div v-if="data.pinyinFrequencies" v-for="pinyin in data.pinyinFrequencies" style="color: grey">
                {{ pinyin.pinyin }}
            </div>
            <div v-if="data.gloss">{{ data.gloss }}</div>
            <div v-if="data.hint" style="font-size: 0.8em; margin-top: 0.5em;">{{ data.hint }}</div>
        </div>
        <div class="element-right">
            <div v-if="data.components.length">

                <p class="sense-tags">Components</p>
                <div style="display: flex; width: 100%; justify-content: space-evenly;">
                    <div v-for="component in data.components" style="text-align: center;">
                        <div style="font-size: 3rem;">{{ component.character }}</div>
                        <div v-for="type in component.type">{{ type }}</div>
                    </div>
                </div>
            </div>

            <div v-if="data.images.length > 1">
                <p class="sense-tags">Evolution</p>
                <div style="display: flex; gap: 0.5em; flex-wrap: wrap;">
                    <div style="display: inline-flex; flex-direction: column; align-items: center; max-width: 100px;" v-for="image in data.images.slice(0, -1)">
                        <img style="filter: invert(1); min-height: 92px; width: 92px;" :src="image.url" :alt="image.type">
                        <div style="font-size: 0.85em;">{{ image.type }}</div>
                        <div style="font-size: 0.75em; text-align: center; color: grey">{{ image.era }}</div>
                    </div>
                </div>
            </div>

            <CStatistics :statistics="data.statistics" />
        </div>
    </div>
    <hr style="border-color: grey;">
</template>

<style scoped>
svg.acjk {
    /* width: 3rem; */
    /* or you can use 100%, 3rem, etc. */
    /* height: 3rem; */
    display: inline-block;
}
</style>