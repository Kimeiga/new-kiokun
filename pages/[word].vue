<script setup>
import { useRoute } from 'vue-router';
import { useFetch } from '#app';
import { toRaw } from 'vue';
const route = useRoute();
const { data, pending, error } = await useFetch(`http://localhost:8000/${route.params.word}`);

console.log(toRaw(data.value));  // Access data.value in the script setup
</script>

<template>
    <main>
        <!-- Show loading indicator when data is being fetched -->
        <div v-if="pending">
            Loading...
        </div>

        <!-- Show error message if there was an error fetching the data -->
        <div v-if="error">
            There was an error: {{ error.message }}
        </div>

        <div v-if="data.c_c">
            <CChar :data="data.c_c" :svgSimp="data?.g?.s" :svgTrad="data?.g?.t"></CChar>
        </div>

        <div v-if="data.j_c">
            <JChar :data="data.j_c"></JChar>
        </div>

        <div v-if="data.c_w">
            <template v-for="cw in data.c_w">
                <CWord :data="cw"></CWord>
            </template>
        </div>

        <div v-if="data.j_w">
            <div v-for="jw in data.j_w">
                <JWord :data="jw"></JWord>

            </div>
        </div>
        <div v-if="data.j_n">

            <div v-for="jn in data.j_n">

                <JName :data="jn"></JName>


            </div>
        </div>

        <!-- <div v-if="data.g">
            <div v-for="g in data.g">
                <div class="char-svg" v-if="g.j" v-html="g.j"></div>
                <div class="char-svg" v-if="g.s" v-html="g.s"></div>
                <div class="char-svg" v-if="g.t" v-html="g.t"></div>
            </div>
        </div>
        <div v-if="data && data.g && data.g.j" v-html="data.g.j">
        </div>
        <div v-if="data && data.g && data.g.s" v-html="data.g.s">
        </div>
        <div v-if="data && data.g && data.g.t" v-html="data.g.t">
        </div>
        <p>{{ $route.params.word }}</p>
        <p>{{ data }}</p> -->
    </main>
</template>

<style>
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

.word-icon {
    margin-top: 2.1rem;

    height: 1rem;
}

/* .element {
    align-items: baseline;
} */

.element-left {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    min-width: 10rem;
}


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
    /* height: 200px; */
}
</style>