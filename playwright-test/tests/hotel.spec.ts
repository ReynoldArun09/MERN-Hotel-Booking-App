import { test, expect } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole("link", { name: "Login" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("one@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("User logged in successfully")).toBeVisible();
});

test("should allow user to add hotel", async ({ page }) => {
  await page.goto(`${BASE_URL}add-hotel`);

  await page.locator("[name=name]").fill("testing");
  await page.locator("[name=city]").fill("mangalore");
  await page.locator("[name=country]").fill("karnataka");
  await page
    .locator("[name=description]")
    .fill("some random description for testing");
  await page.locator('[name="pricePerNight"]').fill("2100");
  await page.selectOption("[name='starRating']", "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("1");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel created")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${BASE_URL}my-hotels`);
  await expect(page.getByText("test hotel")).toBeVisible();
  await expect(page.getByText("test description")).toBeVisible();
  await expect(page.getByText("test city, test country")).toBeVisible();

  await expect(page.getByText("£100 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 4 children")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Edit Details" }).first()
  ).toBeVisible();
});
