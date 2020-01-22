module.exports = {
  extends: "lighthouse:default",
  settings: {
    scores: {
      performance: 80,
      accessibility: 80,
      "best-practices": 80,
      seo: 80,
      pwa: 0
    }
  }
};
