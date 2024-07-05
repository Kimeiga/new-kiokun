<script setup>
const props = defineProps({
    simp: String,
    trad: String,
    pinyin: String,
    fontSize: {
        type: String,
        default: "2rem"
    }
});
</script>
<template>
    <div :style="{ 'font-size': fontSize }" style="width: max-content; display: flex; flex-direction: column; align-items: center;">
        <span style="line-height: 1.1;">{{ simp }}</span>
        <span v-if="simp != trad" style="line-height: 1.1;">{{ trad }}</span>
        <div style="margin-top: 0.3em; font-size: 0.5em; color: grey;">{{ pinyin }}</div>
    </div>
</template>