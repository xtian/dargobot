import gearscore from 'gearscore'
import Promise from 'bluebird'
import request from 'request'

const get = Promise.promisify(request.get)

const bnetApiKey = process.env.BNET_API_KEY
const defaultRegion = process.env.DEFAULT_REGION
const defaultRealm = process.env.DEFAULT_REALM

export default class Character {
  constructor(data = {}) {
    this._data = data

    const { name, realm, region } = data
    Object.assign(this, { name, realm, region })
  }

  static fetch(name, realm = defaultRealm, region = defaultRegion) {
    const url = `https://${region}.api.battle.net/wow/character` +
      `/${realm}/${name}?apikey=${bnetApiKey}&fields=items`

    return get({ url, json: true }).spread((_, body) => {
      body.region = region.toUpperCase()
      return new Character(body)
    })
  }

  get averageItemLevel() {
    const items = this._data.items
    return items && items.averageItemLevel
  }

  get gearscore() {
    return this._data.items && gearscore(this._data)
  }
}
