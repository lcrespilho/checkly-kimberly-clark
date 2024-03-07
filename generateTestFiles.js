const fs = require('fs')
const sites = require('./sites')

for (const site of sites) {
  const checklyProgram = `
    import { test, expect } from '@playwright/test'
    test.setTimeout(119000)
  
    test('${site}', async ({ page }) => {

      const requests: string[] = []
      page.on('request', (request) => requests.push(request.url() + request.postData()))

      await page.goto('${site}')
      await page.evaluate(() => scrollBy({ behavior: 'smooth', top: 1000 }))
      await page.waitForTimeout(7000)

      const re = /google.*collect|g.doubleclick.net|analytics.tiktok.com|ct.pinterest.com\\/v3\\/\\?tid=/
      requests.forEach((request) => expect.soft(request).not.toMatch(re))
    })`

  const filename = site.replace('https://', '').replace(/\/$/, '').replace(/\//g, '-') + '.spec.ts'

  fs.writeFileSync(`./__checks__/${filename}`, checklyProgram)
}
