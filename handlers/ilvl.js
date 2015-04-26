import dedent from 'dedent'

import Character from '../models/character'

const handler = (text) => {
  const [_, name, realm, region] = text.split(' ')

  return Character.fetch(name, realm, region).then(char => {
    const message = dedent`
      _Average iLvl for ${char.name} of ${char.region}-${char.realm}:_
      *${char.averageItemLevel.toString()}*
      `

    return message
  })
}

handler.pattern = /!?ilvl \S+/

handler.helpMessage = `!ilvl [name] [realm] [region]`

export default handler
