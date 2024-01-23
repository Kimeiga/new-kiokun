<!-- KanjiKanaCombination.vue -->
<script setup>
// Props for individual kanji, kana, and their common status
const props = defineProps({
    kanjis: Array,
    kanas: Array,
});
// isCommon: Boolean
</script>

<template>
    <div v-for="kana in kanas">
        <!-- handle appliesToKanji in a sec -->
        <div v-for="kanji in kanjis" style="display: flex;">
            <div class="japanese_word_title">
                <span style=" font-size: 0.5em; text-align: center; margin-bottom: -0.3em;">
                    {{ kana.t }}
                </span>
                <span>{{ kanji.t }}</span>
                <span style="font-size: 0.4em; text-align: center;">
                    {{ kana.r }}
                </span>
            </div>
            <span style="margin-top: 1em;" v-if="kana.c">★</span>
        </div>
    </div>
</template>

<style scoped>
.japanese_word_title {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2rem;
    margin-bottom: 1rem;
    min-width: max-content;
}
</style>
