import { expect, test } from '@playwright/test';

test('has localhost title', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const h1 = await page.$('h1')

  expect(h1).toBeTruthy()

  await page.close()
});

test('Add a new task', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const input = page.locator('#inputTask')
  const button = page.locator('#addBtn')
  const createdTasks = page.locator('#createdTasks')
  const taskContent = page.locator('#taskContent')

  await input.fill('new task')
  await button.click()

  expect(await createdTasks.innerText()).toBe('1')
  expect(await taskContent.innerText()).toBe('new task')

  await page.close()
})

test('Delete a task', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const input = page.locator('#inputTask')
  const addBtn = page.locator('#addBtn')
  const deleteBtn = page.locator('#deleteBtn')
  const createdTasks = page.locator('#createdTasks')
  const taskContent = page.locator('#taskContent')

  await input.fill('new task')
  await addBtn.click()

  await deleteBtn.click()

  expect(await createdTasks.innerText()).toBe('0')
  await expect(taskContent).not.toBeAttached()
  await page.close()
})


test('Change a task status', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const input = page.locator('#inputTask')
  const addBtn = page.locator('#addBtn')
  const checkBtn = page.locator('#checkBtn')
  const taskContent = page.locator('#taskContent')

  await input.fill('new task')
  await addBtn.click()

  await checkBtn.click()

  const textDecoration = await taskContent.evaluate((el) => getComputedStyle(el).textDecorationLine)

  expect(textDecoration).toBe('line-through')
  await page.close()
})