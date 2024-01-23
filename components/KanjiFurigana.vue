<script setup>
const props = defineProps({
    furigana: Array,
    romaji: String,
    kana: {
        type: String,
        default: null
    },
    fontSize: {
        type: String,
        default: "2rem"
    }
});
</script>
<template>
    <div :style="{ 'font-size': fontSize }" style="width: max-content; display: flex; flex-direction: column; align-items: center;">
        <div>
            <ruby v-if="!kana" v-for="f in furigana">{{ f.r }}<rt>{{ f.t }}</rt></ruby>
            <span v-if="kana">{{ kana }}</span>
        </div>
        <div style="font-size: 0.5em; color: grey;">{{ romaji }}</div>
    </div>
</template>