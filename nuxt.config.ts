// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    ssr: false,
    build: {
        transpile: ['@heroicons/vue']
    },

    // head: {
    //     title: 'SVG-Converter', // Other meta information
    //     script: [
    //       { hid: 'jquery', src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js', defer: true }
    //     ]
    // }

})
