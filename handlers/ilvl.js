import Character from '../models/character'

const handler = (text) => {
  const [_, name, realm, region] = text.split(' ')

  return Character.fetch(name, realm, region).then(char => {
    const message =
      `_Average iLvl for ${char.name} of ${char.region}-${char.realm}:_` +
      `\n*${char.averageItemLevel.toString()}*`

    return message
  })
}

handler.pattern = /!?ilvl \S+/

export default handler
