import request from 'request'
import Promise from 'bluebird'

const get = Promise.promisify(request.get)

const bnetApiKey = process.env.BNET_API_KEY
const defaultRegion = process.env.DEFAULT_REGION
const defaultRealm = process.env.DEFAULT_REALM

export default function(text) {
  const firstWord = text.split(' ')[0].toLowerCase()

  switch(firstWord) {
    case 'ilvl':
      return ilvl(text)
    default:
      return new Promise((_, reject) => reject('Message did not match a handler.'))
  }
}

function ilvl(text) {
  const [_, name, realm = defaultRealm, region = defaultRegion] = text.split(' ')

  const url = `https://${region}.api.battle.net/wow/character` +
    `/${realm}/${name}?apikey=${bnetApiKey}&fields=items`

  return get({ url, json: true }).spread((_, body) => {
    return body.items.averageItemLevel.toString()
  })
}
