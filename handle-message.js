import Promise from 'bluebird'

import handlers from './handlers'

export default function(text) {
  const [firstWord, ...rest] = text.split(' ')
  const message = rest.join(' ')

  switch(firstWord.toLowerCase()) {
    case 'gearscore':
      return handlers.gearscore(message)
    case 'ilvl':
      return handlers.ilvl(message)
    default:
      return new Promise((_, reject) => {
        reject('Message did not match a handler.')
      })
  }
}
