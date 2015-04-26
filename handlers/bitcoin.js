import dedent from 'dedent'
import Promise from 'bluebird'
import request from 'request'

const get = Promise.promisify(request.get)

const handler = () => {
  const buy = get({ url: 'https://api.coinbase.com/v1/prices/buy', json: true })
  const sell = get({ url: 'https://api.coinbase.com/v1/prices/sell', json: true })

  return Promise.all([buy, sell]).spread(([_br, buy], [_sr, sell]) => {
    return dedent`
      _Current Bitcoin Prices:_
      *Buy:* $${buy.amount}
      *Sell:* $${sell.amount}
      `
  })
}

handler.pattern = /^!?btc\b/

handler.helpMessage = '!btc'

export default handler
