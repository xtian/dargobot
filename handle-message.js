import Promise from 'bluebird'

import Character from './models/character'

export default function(text) {
  const [firstWord, ...rest] = text.split(' ')

  switch(firstWord.toLowerCase()) {
    case 'ilvl':
      return ilvl(rest.join(' '))
    default:
      return new Promise((_, reject) => {
        reject('Message did not match a handler.')
      })
  }
}

function ilvl(text) {
  const [name, realm, region] = text.split(' ')

  return Character.fetch(name, realm, region).then(character => {
    return character.averageItemLevel.toString()
  })
}
