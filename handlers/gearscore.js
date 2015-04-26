import dedent from 'dedent'

import Character from '../models/character'

const handler = (text) => {
  const [_, name, realm, region] = text.split(' ')

  return Character.fetch(name, realm, region).then(char => {
    const message = dedent`
      _Gearscore for ${char.name} of ${char.region}-${char.realm}:_
      *${char.gearscore.toString()}*
      `

    return message
  })
}

handler.pattern = /^!?gearscore \S+/

handler.helpMessage = `!gearscore [name] [realm] [region]`

export default handler
