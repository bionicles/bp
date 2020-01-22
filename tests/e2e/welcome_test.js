Feature("welcome");

Scenario("visit the page", I => {
  I.amOnPage(process.env.TEST_URL);
  I.see("Bion is Cool");
});
