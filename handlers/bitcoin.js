import dedent from 'dedent'
import Promise from 'bluebird'
import request from 'request'

const get = Promise.promisify(request.get)

const handler = () => {
  const buy = get({
    url: 'https://api.coinbase.com/v1/prices/spot_rate'
  , json: true
  })

  return buy.spread((_, buy) => {
    return dedent`
      _Current Bitcoin Price:_
      *$${buy.amount}*
      `
  })
}

handler.pattern = /^!?btc\b/

handler.helpMessage = '!btc'

export default handler
