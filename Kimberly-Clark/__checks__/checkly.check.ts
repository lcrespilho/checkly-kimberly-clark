// @ts-ignore
import { CheckGroup } from 'checkly/constructs'

new CheckGroup('kimberly-clark', {
  locations: ['us-east-1', 'eu-west-1', 'sa-east-1'],
  activated: true,
  name: 'Kimberly Clark',
  tags: ['consent-check'],
  browserChecks: {
    testMatch: '**/*.spec.ts',
  },
})
