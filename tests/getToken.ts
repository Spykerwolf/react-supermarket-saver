import { test, expect, request } from "@playwright/test";

test("Get bearer token", async ({ browser }) => {
  test.setTimeout(120000);

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.route("**/*", (route) => {
    console.log(route.request().headers());
    return route.continue();
  });

  await page.goto("https://www.paknsave.co.nz/shop/search?q=milk");
  await page.close();
  await context.close();
});
