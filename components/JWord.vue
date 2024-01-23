<!-- JWord.vue -->
<script setup>
const props = defineProps(['data'])

// let isCommonWord = props.data.k.some(item => item.c === true) || data.r.some(item => item.c === true);
// const isCommonWord = computed(() => {
//     return props.data.k.some(item => item.c === true) || props.data.r.some(item => item.c === true);
// });

// What we want to do is show only 1 kanji/kana combo and just put the rest in the section at the bottom
// This aligns most closely with jisho

// All other kanji/kana combos can be featured at the bottom

// Then you can handle the appliesToKanji stuff after...

</script>

<template>
    {{ data }}
    <div class="element">

        <div class="element-left-icon">

            <img class="word-icon" src="/j_w.png" alt="japanese word">
        </div>
        <div class="element-left">
            <!-- In the JMNEDict all kana['appliesToKanji'] == ['*'] -->
            <!-- So for each kana for each kanji we can display -->

            <!-- <div v-if="isCommonWord">
                <KanjiKanaCombinations :kanjis="commonKanjis" :kanas="commonKanas" />
                <div class="common-word-tag">
                    <span>Common word</span>
                </div>
            </div>

            <div v-if="!isCommonWord">
                <KanjiKanaCombinations :kanjis="data.k" :kanas="data.r" />
            </div> -->


            <!-- <div style="font-size: 2rem; width: max-content; display: flex; flex-direction: column; align-items: center;">
                <ruby style="inline" v-for="f in data.k[0].r[0].f">{{ f.r }}<rt>{{ f.t }}</rt></ruby>
                <div style="font-size: 0.5em; color: grey;">{{ data.k[0].r[0].o }}</div>
            </div> -->

            <KanjiFurigana v-if="data.k" :furigana="data.k[0].r[0].f" :romaji="data.k[0].r[0].o" />
            <KanjiFurigana v-if="!data.k" :kana="data.r[0].t" :romaji="data.r[0].r" />

            <!-- <div v-if="data.k.length && data.r.length" class="japanese_word_title">
                <span style=" font-size: 0.5em; text-align: center; margin-bottom: -0.3em;">
                    {{ data.r[0].t }}
                </span>
                <span>{{ data.k[0].t }}</span>
                <span style="font-size: 0.4em; text-align: center;">
                    {{ data.r[0].r }}
                </span>
            </div> -->
            <!-- <span style="margin-top: 1em;" v-if="kana.c">★</span> -->

            <!-- Display other kanji-kana combinations if common words exist -->


            <!-- <div v-for="kana in data.r">
                <div v-for="kanji in data.k" style="display: flex;">
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

            <div v-if="data.k.some(item => item.c === true) || data.r.some(item => item.c === true)" class="common-word-tag">
                <span>Common word</span>
            </div> -->
        </div>
        <div class="element-right">
            <div v-for="sense in data.s">
                <div class="sense-tags">
                    <span v-for="partOfSpeech in sense.p">{{ tag2Full(partOfSpeech) }}</span>
                    <span v-for="misc in sense.m">{{ tag2Full(misc) }}</span>
                </div>


                <div class="translation">

                    <span v-for="(gloss, i) in sense.g">
                        <span class="tag" v-if="gloss.y">{{ gloss.y }}</span> {{ gloss.t }}<span v-if="i < sense.g.length - 1">; </span>
                    </span>
                    <span class="word-supplemental-info">
                        <span v-if="sense.n">{{ sense.n.length > 1 ? "Antonyms: " : "Antonym: " }}

                            <NuxtLink class="antonym" v-for="antonym in sense.n" :to="antonym[0]">
                                <span>{{ antonym[0] }}<span v-if="antonym.length > 1 && !parseInt(antonym[1])">{{ antonym[1].split('・')[0] }}</span>
                                    <span v-if="antonym.length > 1 && parseInt(antonym[1])">: definition {{ antonym[1] }}</span>
                                    <span v-if="antonym.length > 2 && parseInt(antonym[2])">: definition {{ antonym[2] }}</span></span>
                            </NuxtLink>
                        </span>
                    </span>
                </div>

            </div>
            <!-- all other kanji forms, except first one -->
            <div v-if="data.k && (data.k.length > 1 || data.k[0].r.length > 1)">
                <p class="sense-tags">Other Forms</p>
                <div style="font-size: 1.5rem">
                    <template v-for="k, ki in   data.k  ">
                        <template v-for="r, ri in   k.r  ">
                            <template v-if="!(ki == 0 && ri == 0)">
                                <span style="display: inline-flex; align-items: baseline;">
                                    <KanjiFurigana :furigana="r.f" :romaji="r.o" fontSize="1.5rem" />
                                    <span v-if="ki != (data.k ?? []).length - 1 && ri != (data.r ?? []).length - 1">、</span>
                                </span>
                            </template>
                        </template>
                    </template>
                </div>
            </div>
            <div v-if="!data.k && data.r.length > 1">
                <p class="sense-tags">Other Forms</p>
                <div style="font-size: 1.5rem">
                    <template v-for="r, ri in data.r  ">
                        <template v-if="ri != 0">
                            <span style="display: inline-flex; align-items: baseline;">
                                <KanjiFurigana :kana="r.t" :romaji="r.r" fontSize="1.5rem" />
                                <span v-if="ri != (data.r ?? []).length - 1">、</span>
                            </span>
                        </template>
                    </template>
                </div>
            </div>

            <!-- <div v-if="isCommonWord && (otherKanjis.length > 0 || otherKanas.length > 0)" class="other-combinations">
                Other forms
                <KanjiKanaCombinations :kanjis="otherKanjis" :kanas="otherKanas" />
            </div> -->
        </div>
    </div>
</template>

<style scoped>
.kanji-common {
    position: relative;
}

.kanji-common:after {
    content: "★";
    position: absolute;
    font-size: 0.5em;

}

.common-word-tag {
    cursor: auto;
    font-style: normal;
    box-sizing: border-box;
    display: inline-block;
    font-family: "Helvetica Neue", Helvetica, Arial, "Source Han Sans", "源ノ角ゴシック", "Hiragino Sans", "HiraKakuProN-W3", "Hiragino Kaku Gothic ProN W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "Noto Sans", "Noto Sans CJK JP", "メイリオ", Meiryo, "游ゴシック", YuGothic, "ＭＳ Ｐゴシック", "MS PGothic", "ＭＳ ゴシック", "MS Gothic", sans-serif;
    line-height: 1;
    position: relative;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    /* width: 100px; */
    clear: right;
    margin: 4px 0 8px 0;
    padding: 2px 4px 3px 4px;
    font-size: 10px;
    -webkit-font-smoothing: antialiased;
    border-radius: 3px;
    text-transform: lowercase;
    font-weight: bold;
    background: #8abc83;
    color: #222;
}

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