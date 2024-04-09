const fs = require('fs')
const sites = require('./sites')
const { exec } = require('child_process')
const { promisify } = require('util')

const execPromise = promisify(exec)

execPromise('rm -f ./__checks__/*.spec.ts').then(() => {
  for (const site of sites) {
    const checklyProgram = `import { test, expect } from '@playwright/test'
import { flatRequestUrl, tagsToTest } from '../../utils'

test.setTimeout(119000)

test('${site}', async ({ page }) => {
  const requests: string[] = []
  page.on('request', request => requests.push(flatRequestUrl(request)))

  await page.goto('${site}')
  await page.evaluate(() => scrollBy({ behavior: 'smooth', top: 1000 }))
  await page.waitForTimeout(7000)
  
  test.step('🕵️ TAGS CHECK: TAGS SHOULD NOT FIRE BEFORE CONSENTED', () => {
    tagsToTest.forEach(({ name, re }) =>
      test.step(name, () =>
        expect
          .soft(
            requests.every(request => !re.test(request)),
            \`\${name} tag fired before consented\`
          )
          .toBeTruthy()
      )
    )
  })
})
`

    const filename = site.replace('https://', '').replace(/\/$/, '').replace(/\//g, '-') + '.spec.ts'
    fs.writeFileSync(`./__checks__/${filename}`, checklyProgram)
  }
})
