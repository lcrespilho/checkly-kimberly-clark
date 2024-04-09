import type { Request } from '@playwright/test'

/**
 * Returns a flattened request URL by combining the URL and postData parameters
 * of the given Request object.
 * @param {Request} req The Request object containing the URL and postData.
 * @return {*}  {string} A string representing the flattened request URL.
 */
export const flatRequestUrl = (req: Request): string => {
  const url = req.url()
  const body = req.postData() || ''
  if (!body) return url
  const flatUrl = `${url}${url.includes('?') ? '&' : '?'}${body}`
  return flatUrl
    .replace(/\r\n|\n|\r/g, '&')
    .replace(/&&/g, '&')
    .replace(/&$/g, '')
}

/**
 * Accepts a pattern, and returns a function that returns true if a
 * request is matched by the pattern.
 * @param pattern - pattern to match the request URL.
 */
export const requestMatcher = (pattern: RegExp | string) => (req: Request) =>
  typeof pattern === 'string' ? flatRequestUrl(req).includes(pattern) : pattern.test(flatRequestUrl(req))

/**
 * Accepts a pattern and a callback function, and returns a function that
 * returns true if a request is matched by the pattern, and executes the
 * callback with the request object as parameter.
 * @param pattern - pattern to match the request URL.
 * @param cb - Callback function that will be executed after if the request is matched.
 */
export const requestMatcherCb = (pattern: RegExp | string, cb: (req: Request) => void) => (req: Request) => {
  if (requestMatcher(pattern)(req)) {
    try {
      cb(req)
    } catch (e) {}
    return true
  } else {
    return false
  }
}

export const tagsToTest = [
  { name: 'GA Universal', re: /google.*collect(?!\/v=2)/ },
  { name: 'GA4', re: /google.*collect\?v=2/ },
  { name: 'Ads', re: /g.doubleclick.net\/pagead\/viewthroughconversion\// },
  { name: 'TikTok', re: /analytics.tiktok.com/ },
  { name: 'Pinterest', re: /ct.pinterest.com\/v3\/\?tid=/ },
  { name: 'Meta', re: /www.facebook.com\/tr/ },
  { name: 'Floodlight', re: /\/gtag\/destination\?id=DC-|\.fls\.doubleclick\.net\/activity/ },
]
