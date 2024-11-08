// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* Application Settings */
    app: {
        /* Application Header */
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Cast Poker — 100% Provably Fair Gaming',
            meta: [
                { name: 'description', content: 'The first fairplay, permissionless real-money gaming network.' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ],
        },
    },

    /* Application Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss',

        /* Pinia */
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',

        /* Plausible */
        '@nuxtjs/plausible',
    ],

    /* Route Rules */
    routeRules: {
        /* Disable server-side rendering for Admin area. */
        '/admin/**': { ssr: false },

        /* Add CORS headers to API. */
        '/v1/**': { cors: true },
    },

    /* Set compatibility date. */
    compatibilityDate: '2024-11-8',
})