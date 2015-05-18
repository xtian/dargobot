import dedent from 'dedent'
import groupBy from 'lodash.groupby'
import map from 'lodash.map'
import sortBy from 'lodash.sortby'
import Promise from 'bluebird'
import request from 'request'
import sparkline from 'sparkline'

const get = Promise.promisify(request.get)

const handler = () => {
  const spot = get({
    url: 'https://api.coinbase.com/v1/prices/spot_rate'
  , json: true
  })

  const history = get('https://api.coinbase.com/v1/prices/historical')
    .spread((_, csv) => csv.split('\n').map(line => line.split(',')))

  return Promise.all([spot, history]).spread(([_, spot], history) => {
    const [dateString, priceString] = history[history.length - 1]

    const date = new Date(dateString)
    const oldestDate = `${date.getUTCMonth() + 1}/${date.getUTCDate()}`
    const oldestPrice = parseFloat(priceString).toFixed(2)

    const graph = sparkline(averagesByDay(history))

    return dedent`
      _Current Bitcoin Price:_
      *$${spot.amount}*

      _Since ${oldestDate} ($${oldestPrice}):_
      ${graph}
      `
  })
}

function averagesByDay(rows) {
  const byDay = groupBy(rows, ([dateString]) => truncateDateString(dateString))

  const sorted = sortBy(byDay, (_, dateString) => new Date(dateString))

  return map(sorted, array => {
    const average = array
      .map(row => parseFloat(row[1]))
      .reduce((sum, i) => sum + i) / array.length

    return average.toFixed(4) * 10000
  })
}

function truncateDateString(dateString) {
  const date = new Date(dateString)
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
}

handler.pattern = /^!?btc\b/

handler.helpMessage = '!btc'

export default handler
