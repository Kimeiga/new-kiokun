// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Kiokun',
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/satellite-min.css' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: "anonymous" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400&family=Noto+Sans+SC:wght@400&family=Noto+Sans+TC:wght@400&display=swap' }
      ]

    }
  },
  ssr: false,
})
