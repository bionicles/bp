module.exports = {
  extends: "lighthouse:default",
  settings: {
    scores: {
      performance: 90,
      accessibility: 90,
      "best-practices": 90,
      seo: 90
    },
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
  }
};
