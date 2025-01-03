// @ts-check
import { test, expect } from '@playwright/test'
// const CAT_PREFIX_URL = 'https://catasa.com'
const LOCAL_HOST_URL = 'http://localhost:5173/'

test('app shows random fact an image ', async ({ page }) => {
  await page.goto(LOCAL_HOST_URL)

  const text = await page.getByRole('paragraph')
  const img = await page.getByRole('img').nth(0)

  const textContent = await text.textContent()
  const imgSrc = await img.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(img).toBeVisible() // Verifica que la imagen es visible const src = await img.getAttribute('src'); expect(src).not.toBeNull(); // Verifica que el atributo 'src' no es nulo 
  await expect(imgSrc).not.toBe('')
  // await expect(imgSrc?.startsWith(CAT_PREFIX_URL)).toBeTruthy
})
