<script setup>
const props = defineProps(['data'])

</script>

<template>
    {{ data }}
    <div class="element">
        <div class="element-left-icon">

            <img class="word-icon" src="/j_n.png" alt="japanese name tag">
        </div>
        <div class="element-left">
            <!-- In the JMNEDict all kana['appliesToKanji'] == ['*'] -->
            <!-- So for each kana for each kanji we can display -->

            <!-- names with kanji (have furigana) -->
            <template v-if="data.k" v-for="k in data.k">
                <template v-for="r in k.r">
                    <KanjiFurigana :furigana="r.f" :romaji="r.o" />
                </template>
            </template>

            <!-- names without kanji only have kana -->
            <template v-if="!data.k" v-for="r in data.r">
                <KanjiFurigana :kana="r.t" :romaji="r.r" />
            </template>

            <!-- <div v-for="kana in data.r">
                <div v-for="kanji in data.k" class="japanese_word_title">
                    <span style=" font-size: 0.5em; text-align: center; margin-bottom: -0.3em;">
                        {{ kana.t }}
                    </span>
                    {{ kanji.t }}
                    <span style="font-size: 0.4em; text-align: center;">
                        {{ kana.r }}
                    </span>


                </div>
            </div> -->
        </div>
        <div class="element-right">
            <div v-for="translationGroup in data.t">
                <div class="sense-tags">
                    <span v-for="tag in translationGroup.y">{{ tag2Full(tag) }}</span>
                </div>
                <!-- <ol class="translation-list"> -->
                <div class="translation" v-for="translation in translationGroup.t">{{ translation }}</div>
                <!-- </ol> -->
            </div>
        </div>
    </div>
</template>


<style scoped>
.antonym:after {
    content: ", ";

}

.antonym:last-child:after {
    content: '';
}

a {
    color: lightblue;

}

.japanese_word_title {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2rem;
    margin-bottom: 1rem;
    min-width: max-content
}

main {

    max-width: 1000px;
    padding: 1rem;
    margin: 0 auto;
}

.sense-tags {
    color: #888;
    font-size: 0.8em;
    margin-top: 0.8em;
    font-weight: bold;
}

.sense-tags span:after {
    content: ', ';
}

.sense-tags span:last-child:after {
    content: '';
}

.word-supplemental-info {
    color: #888;
    font-size: 0.8em;
    margin-left: 0.8em;
}

.element {
    display: flex;
    gap: 1rem;
    /* flex-direction: row; */
    /* align-items: center; */
    /* justify-content: center; */
    /* font-size: 2rem; */
}

/* .element {
    align-items: baseline;
} */

.element-right {
    margin-top: 1rem;
}

.element-right {
    counter-reset: item;
}

.translation:before {
    content: counter(item) ". ";
    counter-increment: item;
    color: grey;
}

.translation {
    /* display: inline; */
    margin: 0.3em 0;
}

.tag {
    /* border: 1px solid white;
    border-radius: 20%;
    padding: 0em 0.2em;
    line-height: 0.1;
    font-size: 0.8em; */

    font-family: sans-serif;
    font-size: 0.7em;
    border: 1px solid grey !important;
    border-radius: 5px;
    padding: 2px 5px;
    white-space: nowrap;
    line-height: 1.3;
    width: fit-content
}

/* .char-svg {
    height: ;
} */
svg.acjk {
    height: 200px;
}
</style>