import Character from '../models/character'

export default function(text) {
  const [name, realm, region] = text.split(' ')

  return Character.fetch(name, realm, region).then(char => {
    const message =
      `_Gearscore for ${char.name} of ${char.region}-${char.realm}:_` +
      `\n*${char.gearscore.toString()}*`

    return message
  })
}
