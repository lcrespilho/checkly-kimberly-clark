import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

/**
 * See https://www.checklyhq.com/docs/cli/project-structure/
 */
const config = defineConfig({
  projectName: 'Kimberly Clark',
  logicalId: 'kimberly-clark',
  repoUrl: 'https://github.com/checkly/checkly-cli',
  checks: {
    frequency: Frequency.EVERY_24H,
    locations: ['us-east-1', 'eu-west-1', 'sa-east-1'],
    runtimeId: '2023.09',
    browserChecks: {
      testMatch: '**/*.spec.ts',
    },
    checkMatch: '**/*.check.ts',
    playwrightConfig: {
      use: {
        viewport: { width: 1440, height: 1080 },
      },
    },
  },
  cli: {
    runLocation: 'sa-east-1',
    reporters: ['list'],
  },
})

export default config
