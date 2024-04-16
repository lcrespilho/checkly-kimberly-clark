import { test, expect } from '@playwright/test'
import { flatRequestUrl, tagsToTest } from '../../utils'

test.setTimeout(119000)

test('https://www.huggies.com/en-us/', async ({ page }) => {
  const requests: string[] = []
  await page.goto('https://www.huggies.com/en-us/')
  await page.getByRole('button', { name: 'Reject Cookies' }).click()
  page.on('request', request => requests.push(flatRequestUrl(request)))
  await page.reload()
  await page.evaluate(() => scrollBy({ behavior: 'smooth', top: 1000 }))
  await page.waitForTimeout(7000)
  
  test.step('🕵️ TAGS CHECK: TAGS SHOULD NOT FIRE BEFORE CONSENTED', () => {
    tagsToTest.forEach(({ name, re }) =>
      test.step(name, () =>
        expect
          .soft(
            requests.every(request => !re.test(request)),
            `${name} tag fired before consented`
          )
          .toBeTruthy()
      )
    )
  })
})
