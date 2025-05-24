// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'es', 'it', 'de', 'nl'],
    localeDetection: false
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
