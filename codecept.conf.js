exports.config = {
  helpers: {
    WebDriver: {
      url: 'http://0.0.0.0',
      host: 'selenium',
      port: 4444,
      browser: 'chrome',
      restart: false,
      keepBrowserState: true,
      keepCookies: false,
      waitForTimeout: 4000,
      smartWait: 4000
    }
  },
  bootstrap: null,
  mocha: {
    reporterOptions: {
      reportDir: "./server/public/output",
      json: false,
      reportPageTitle: "QA Tester",
      reportTitle: "QA Tester",
      showPending: false
    }
  },
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: false
    },
    tryTo: {
      enabled: false
    },
    screenshotOnFail: {
      enabled: false
    }
  }
}