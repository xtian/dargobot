import Promise from 'bluebird'

import Character from './models/character'

export default function(text) {
  const firstWord = text.split(' ')[0].toLowerCase()

  switch(firstWord) {
    case 'ilvl':
      return ilvl(text)
    default:
      return new Promise((_, reject) => {
        reject('Message did not match a handler.')
      })
  }
}

function ilvl(text) {
  const [_, name, realm = defaultRealm, region = defaultRegion] = text.split(' ')

  const url = `https://${region}.api.battle.net/wow/character` +
    `/${realm}/${name}?apikey=${bnetApiKey}&fields=items`

  return Character.fetch(name, realm, region).then(character => {
    return character.averageItemLevel.toString()
  })
}
