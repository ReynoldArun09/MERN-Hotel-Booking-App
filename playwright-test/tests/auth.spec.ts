
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/'

test('login user', async ({ page }) => {
  await page.goto(BASE_URL)
  await page.getByRole('link', {name: 'Login'}).click()
  await expect(page.getByRole('heading', {name: 'Sign In'})).toBeVisible()
  await page.locator("[name=email]").fill("one@gmail.com")
  await page.locator("[name=password]").fill("123456")
  await page.getByRole("button", {name: "Login"}).click()

  await expect(page.getByText("User logged in successfully")).toBeVisible()

});


test('register user', async({page}) => {
  const testEmail = `testemail${Math.floor(Math.random() * 9000) + 1000}@test.com`;

  await page.goto(BASE_URL)
  await page.getByRole("link", {name: "Login"}).click()
  await page.getByRole("link", {name: "Sign up"}).click()
  await expect(page.getByRole("heading", {name: "Sign Up"})).toBeVisible()
  await page.locator("[name=firstName]").fill("testfirstname")
  await page.locator("[name=lastName]").fill("lastName")
  await page.locator("[name=email]").fill(testEmail)
  await page.locator("[name=password]").fill("123456")
  await page.locator("[name=confirmPassword]").fill("123456");

  await page.getByRole('button', {name: "Register"}).click()
  await expect(page.getByText("User registered successfully")).toBeVisible()

})


