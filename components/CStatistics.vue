<script setup>
const props = defineProps(['statistics'])

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

const stat2Sentence = (n, v) => {
    switch (n) {
        case "hskLevel":
            return `HSK Level ${v}`
        case "movieCharContextsPercent":
            return `Appears in ${(v * 100).toFixed(4)}% of movies`
        case "movieCharRank":
            return `${v}th most common character in movies`
        case "bookCharRank":
            return `${v}th most common character in books`
        case "movieWordContextsPercent":
            return `Appears in ${(v * 100).toFixed(4)}% of movies`
        case "movieWordRank":
            return `${v}th most common word in movies`
        case "bookWordRank":
            return `${v}th most common word in books`
        default:
            return ""
    }
}
</script>

<template>
    <div v-if="statistics">
        <p class="sense-tags">Statistics</p>

        <div style="font-size: 0.8em; color: grey">
            <div v-for="(value, name, index) in statistics">
                <template v-if="name != 'topWords'">
                    {{ stat2Sentence(name, value) }}
                </template>
            </div>
        </div>
    </div>

    <div v-if="statistics?.topWords" class="top-words-container">
        <p class="sense-tags">Top Words</p>
        <div class="top-words">

            <div v-for="word in statistics.topWords" class="top-word" style="font-size: 0.8em; color: grey; columns: 200px;">
                <!-- <span>{{ word.word }}/{{ word.trad }} {{ word.gloss }}: {{ word.share }}</span> -->
                <span>{{ word.word }}<span v-if="word.word != word.trad">/{{ word.trad }}</span> {{ word.gloss }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.top-words-container {
    width: 100%;
    /* Adjust the width as per your layout */
}

.top-words {
    column-count: 3;
    /* Creates two columns */
    column-gap: 1em;
    /* Adjusts the gap between the columns */
    width: 100%;
}

.top-word {
    break-inside: avoid-column;
    /* Prevents words from breaking across columns */
    padding-bottom: 0.5em;
    /* Adjusts spacing between words */
}
</style>