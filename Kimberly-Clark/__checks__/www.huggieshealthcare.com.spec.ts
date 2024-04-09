import { test, expect } from '@playwright/test'
import { flatRequestUrl, tagsToTest } from '../../utils'

test.setTimeout(119000)

test('https://www.huggieshealthcare.com', async ({ page }) => {
  const requests: string[] = []
  page.on('request', request => requests.push(flatRequestUrl(request)))

  await page.goto('https://www.huggieshealthcare.com')
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