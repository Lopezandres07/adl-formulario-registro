import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4173',
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      // puedes agregar más hooks aquí si los necesitas
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  video: true,
  screenshotOnRunFailure: true,
})
