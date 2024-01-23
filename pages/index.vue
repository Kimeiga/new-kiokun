<script setup>

import { useRoute } from '#imports'
import { AisInstantSearch, AisSearchBox, AisHits, AisHighlight, AisConfigure, AisPagination } from 'vue-instantsearch/vue3/es'
// import algoliasearch from 'algoliasearch/lite';

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const searchClient = new TypesenseInstantSearchAdapter({
    server: {
        apiKey: "GSV3UjDj0By3HYzmgWSiCsprcn7khNRY3EVyVfHcOXOMaV3y", // Be sure to use the search-only-api-key
        nodes: [
            {
                host: "localhost",
                port: 8108,
                protocol: "http"
            }
        ]
    },
    // The following parameters are directly passed to Typesense's search API endpoint.
    //  So you can pass any parameters supported by the search endpoint below.
    //  queryBy is required.
    additionalSearchParameters: {
        query_by: 'w_s, w_t, w_p, w_d, c_t, c_v, c_s, c_g, c_p, k, v, j, n',
        query_by_weights: '4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1',
        per_page: 50,
        infix: 'always'
    }
}).searchClient;

const copyToClipboard = (item) => {
    navigator.clipboard.writeText(JSON.stringify(item))
}

const future = { preserveSharedStateOnUnmount: true }

</script>

<template>
    <div>
        <header class="header">
            <h1>kiokun</h1>
        </header>

        <div class="container">
            <ais-instant-search :search-client="searchClient" index-name="dictionary" :future="future">
                <ais-configure :hits-per-page.camel="8" />
                <div class="search-panel">
                    <!-- <div class="search-panel__filters">
            <ais-dynamic-widgets>
            </ais-dynamic-widgets>
          </div> -->
                    <div class="search-panel__results">
                        <div class="searchbox">
                            <ais-search-box placeholder="" />
                        </div>
                        <ais-hits>
                            <template v-slot:item="{ item }">
                                <button @click="copyToClipboard(item)">Copy Obj</button>
                                <NuxtLink :to="'/' + item.e">
                                    <div>

                                        <div v-if="item._highlightResult.w_t != null" lang="zh" class="chinese-word-entry entry ">
                                            <span class="entry-icon">🥮</span>
                                            <div>

                                                <div v-for="(pinyin, pinyinIndex) in  item._highlightResult.w_p " :key="pinyinIndex">
                                                    <div class="entry-title">
                                                        <span v-html="item._highlightResult.w_t?.value" lang="zh-Hant"></span><span>&nbsp;</span>
                                                        <span v-if="item._highlightResult.w_s?.value != item._highlightResult.w_t?.value" v-html="item._highlightResult.w_s.value"></span>&nbsp;
                                                        <b v-html="pinyin.value.split(' ')[0]"></b><b>: </b>
                                                    </div>
                                                    <ol>
                                                        <li>
                                                            <span v-html="item._highlightResult.w_d[pinyinIndex].value"></span>
                                                        </li>
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- chinese hanzi -->
                                        <div v-if="item._highlightResult.c_t != null" lang="zh" class="chinese-char-entry entry ">
                                            <span class="entry-icon">㊗️</span>
                                            <div>
                                                <div class="entry-title">
                                                    <span v-html="item._highlightResult.c_t?.value"></span><span>&nbsp;</span>
                                                    <span v-if="item._highlightResult.c_s">
                                                        <span v-for="(s, i) in item._highlightResult.c_s" :key="i"><span v-html="s?.value"></span></span><span>:&nbsp;</span>
                                                    </span>
                                                    <span v-html="item._highlightResult.c_p?.value"></span><span>: </span>
                                                </div>
                                                <span v-html="item._highlightResult.c_g?.value"></span>
                                            </div>
                                        </div>

                                        <div v-for=" (j1, i)  in  item._highlightResult.j " :key="i" lang="ja" class="japanese-word-entry entry ">
                                            <span class="entry-icon">🎌</span>

                                            <!-- handle kanji/kana tags like oK for (old) kana -->
                                            <div>
                                                <div class="entry-title">
                                                    <span v-for="( kanji, kanjiIndex ) in  j1.k  " :key="kanjiIndex">
                                                        <span v-html="kanji.t.value"></span><span v-if="kanji.c">★</span><span v-if="kanjiIndex < j1.k.length - 1">、</span>
                                                    </span>

                                                    【<span v-for="(  kana, kanaIndex  ) in  j1.r  " :key="kanaIndex">
                                                        <span v-html="kana.t.value"></span><span v-if="kana.c">★</span><span v-if="kanaIndex < j1.r.length - 1">、</span>
                                                    </span>】
                                                    <!-- <span style="flex: 1; text-align: right;">🇯🇵</span> -->
                                                </div>
                                                <ol>
                                                    <li v-for="( sense, senseIndex ) in  j1.s " :key="senseIndex">
                                                        <span v-for="( gloss, glossIndex ) in  sense.g " :key="glossIndex"><span v-html="gloss.t.value"></span><span v-if="glossIndex < j1.s[senseIndex].g.length - 1">, </span></span>
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>

                                        <!-- japanese kanji -->
                                        <div v-if="item._highlightResult.k" lang="ja" class="japanese-char-entry entry ">
                                            <span class="entry-icon" lang="en">🈳</span>
                                            <div>
                                                <div class="entry-title">
                                                    <span v-html="item._highlightResult.k.k.value"></span><span>:&nbsp;</span>
                                                    <span v-for="(o1, i) in item._highlightResult.k.m.o" :key="i"><span v-html="o1.value"></span><span>, </span></span>
                                                    <span v-for="(k1, i) in item._highlightResult.k.m.k" :key="i"><span v-html="k1.value"></span><span>, </span></span>
                                                </div>
                                                <span v-for="(m1, i) in item._highlightResult.k.m.m" :key="i"><span v-html="m1.value"></span><span>, </span></span>
                                            </div>
                                        </div>

                                        <div v-for=" (n1, i)  in  item._highlightResult.n " lang="ja" :key="i" style="width: 100%;" class="japanese-name-entry entry">
                                            <span class="entry-icon">🆔</span>

                                            <div>
                                                <!-- handle kanji/kana tags like oK for (old) kana -->
                                                <div class="entry-title">
                                                    <span v-for="( kanji, kanjiIndex ) in  n1.k  " :key="kanjiIndex">
                                                        <span v-html="kanji.t.value"></span><span v-if="kanji.c">★</span><span v-if="kanjiIndex < n1.k.length - 1">、</span>
                                                    </span>

                                                    【<span v-for="(  kana, kanaIndex  ) in  n1.r  " :key="kanaIndex">
                                                        <span v-html="kana.t.value"></span><span v-if="kana.c">★</span><span v-if="kanaIndex < n1.r.length - 1">、</span>
                                                    </span>】
                                                    <!-- <span style="flex: 1; text-align: right;">🆔</span> -->
                                                </div>
                                                <ol>
                                                    <li v-for="( translation, translationIndex ) in  n1.t " :key="translationIndex">
                                                        <span v-for="( gloss, glossIndex ) in  translation.t " :key="glossIndex"><span v-html="gloss.value"></span><span v-if="glossIndex < n1.t[translationIndex].t.length - 1">, </span></span>
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                        <!-- <div v-if="item._highlightResult.n" lang="ja">
                    <div style="display: flex;">
                      <span v-html="item._highlightResult.n.j.value"></span>
                      <span style="flex: 1; text-align: right;">🆔</span>
                    </div>

                    <div v-for="(k, ki) in item._highlightResult.n.k" :key="ki">
                      <span v-html="k.t.value"></span><span v-if="ki < item._highlightResult.n.k.length - 1">, </span>
                      <br>

                    </div>
                    <span v-for="t1 in item._highlightResult.n.t">
                      <span v-for="(t, ti) in t1">
                        <span v-html="t.value"></span><span v-if="ti < item._highlightResult.n.t.length - 1">, </span>
                      </span>
                    </span> -->
                                        <!-- <div>
                  
                  {{ item }}
                </div> -->
                                        <!-- <article>
                  <h1>
                    <ais-highlight :hit="item" attribute="j" />
                  </h1>
                  <p>
                    <ais-highlight :hit="item" attribute="name" />
                  </p>
                  <p>
                    <ais-highlight :hit="item" attribute="description" />
                  </p>
                </article> -->
                                    </div>
                                </NuxtLink>
                            </template>
                        </ais-hits>

                        <div class="pagination">
                            <ais-pagination />
                        </div>
                    </div>
                </div>
            </ais-instant-search>
        </div>
    </div>
</template>



<style>
a {
    color: #fff;
    text-decoration: none;
}

/* Common styles for all entries */
/* .entry {
  position: relative;
  padding-left: 2.3ch;
} */
.entry-icon {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    ;
    font-size: 1.2rem;
    line-height: 1.5;
}

.entry {
    /* position: absolute;
  top: 0;
  left: 2.2ch;
  transform: translateX(-100%);
  content: ''; */
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
}

.entry:last-child {
    margin-bottom: 0;
}

ul,
ol {
    padding-left: 2ch;
}

h2 {
    margin: 0;
    /* padding: 0; */
    font-weight: 400;
    ;
}

.entry-title {
    font-size: 1.2rem;
    line-height: 1.5;
}

.ais-Hits-item {
    flex-direction: column;
    align-items: start;
    background: #111;
    border-bottom: 1px solid #333;
    border-left: 1px solid #333;
    border-right: 1px solid #333;

    /* box-shadow: 0 0 0 1px rgba(235, 236, 241, 0.15), 0 1px 3px 0 rgba(235, 236, 241, 0.15); */
    ;
}

.ais-Hits-item:first-child {
    border-top: 1px solid #333;

}


h1 {
    font-size: 1rem;
}

em {
    background: cyan;
    font-style: normal;
}

.header {
    display: flex;
    align-items: center;
    min-height: 50px;
    padding: 0.5rem 1rem;
    background-image: linear-gradient(to right, #4dba87, #2f9088);
    color: #fff;
    margin-bottom: 1rem;
}

.header a {
    color: #fff;
    text-decoration: none;
}

.header-title {
    font-size: 1.2rem;
    font-weight: normal;
}

.header-title::after {
    content: ' ▸ ';
    padding: 0 0.5rem;
}

.header-subtitle {
    font-size: 1.2rem;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
}

.search-panel {
    display: flex;
}

.search-panel__filters {
    flex: 1;
}

.search-panel__results {
    flex: 3;
}

.searchbox {
    margin-bottom: 2rem;
}

.pagination {
    margin: 2rem auto;
    text-align: center;
}
</style>
