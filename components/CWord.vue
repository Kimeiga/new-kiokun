<script setup>

const props = defineProps(['data'])

const stat2Plain = {
    hskLevel: "HSK Level",
    movieWordCount: "Movie Word Count",
    movieWordCountPercent: "Movie Word Count Percent",
    movieWordRank: "Movie Word Rank",
    movieWordContexts: "Movie Word Contexts",
    movieWordContextsPercent: "Movie Word Contexts Percent",
    bookWordCount: "Book Word Count",
    bookWordCountPercent: "Book Word Count Percent",
    bookWordRank: "Book Word Rank",
    movieCharCount: "Movie Char Count",
    movieCharCountPercent: "Movie Char Count Percent",
    movieCharRank: "Movie Char Rank",
    movieCharContexts: "Movie Char Contexts",
    movieCharContextsPercent: "Movie Char Contexts Percent",
    bookCharCount: "Book Char Count",
    bookCharCountPercent: "Book Char Count Percent",
    bookCharRank: "Book Char Rank",
}
</script>

<template>
    <div v-for="item, i in data.items" class="element">

        <template v-if="item.definitions && item.source != 'unicode'">

            <div class="element-left-icon">

                <img class="word-icon" src="/c_w.png" alt="chinese word tag">
            </div>
            <div class="element-left">
                <SimpTradPinyin :simp="data.simp" :trad="data.trad" :pinyin="item.pinyin" />

                <p style="color: grey">{{ data.gloss }}</p>
            </div>
            <div class="element-right">
                <div class="translation">{{ item.definitions.join(', ') }}</div>
                <!-- <div class="sense-tags">
                    <span v-for="tag in translationGroup.y">{{ tag2Full(tag) == "female term or language" ? "female name" :
                        (tag2Full(tag) == "male term or language" ? "male name" :
                            tag2Full(tag)) }}</span>
                </div> -->
                <!-- <ol class="translation-list"> -->
                <!-- </ol> -->

                <!-- if this is the final element -->

                <template v-if="i == data.items.length - 1">

                    <!-- <div v-if="data.statistics">
                        <p class="sense-tags">Statistics</p>

                        <div style="font-size: 0.8em; color: grey">
                            <div v-for="(value, name, index) in data.statistics">
                                <template v-if="name != 'topWords'">

                                    {{ stat2Plain[name] ?? name }}:
                                    {{ value }}
                                </template>
                            </div>
                        </div>
                    </div>

                    <div v-if="data.statistics?.topWords">
                        <p class="sense-tags">Top Words</p>

                        <div v-for="word in data.statistics.topWords" style="font-size: 0.8em; color: grey">
                            <span>{{ word.word }}/{{ word.trad }} {{ word.gloss }}: {{ word.share }}</span>
                        </div>
                    </div> -->
                    <CStatistics :statistics="data.statistics" />
                </template>
            </div>
        </template>

    </div>
    <hr style="border-color: grey;">
</template>