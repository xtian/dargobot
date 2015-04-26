import Promise from 'bluebird'

import Character from './models/character'

export default function(text) {
  const [firstWord, ...rest] = text.split(' ')
  const message = rest.join(' ')

  switch(firstWord.toLowerCase()) {
    case 'gearscore':
      return gearscore(message)
    case 'ilvl':
      return ilvl(message)
    default:
      return new Promise((_, reject) => {
        reject('Message did not match a handler.')
      })
  }
}

function gearscore(text) {
  const [name, realm, region] = text.split(' ')

  return Character.fetch(name, realm, region).then(character => {
    return character.gearscore.toString()
  })
}

function ilvl(text) {
  const [name, realm, region] = text.split(' ')

  return Character.fetch(name, realm, region).then(character => {
    return character.averageItemLevel.toString()
  })
}
