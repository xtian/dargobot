import Promise from 'bluebird'

import handlers from './handlers'

export default function(text, user) {
  for (let key in handlers) {
    const handler = handlers[key]

    if (handler.pattern.test(text)) {
      return handler(text, user)
    }
  }

  return Promise.reject('Message did not match a handler.')
}
