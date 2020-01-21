Feature("welcome");

Scenario("visit the page", I => {
  I.amOnPage(process.env.TEST_URL);
  I.see("Welcome to Next.js!");
});
