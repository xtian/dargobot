import Promise from 'bluebird'

import handlers from './handlers'

export default function(text) {
  for (let key in handlers) {
    let handler = handlers[key]

    if (handler.pattern.test(text)) {
      return handler(text)
    }
  }

  return new Promise((_, reject) => {
    reject('Message did not match a handler.')
  })
}
