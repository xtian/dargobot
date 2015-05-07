import Promise from 'bluebird'
import zip from 'lodash.zip'

export default class Character {
  constructor(title, options) {
    this.hasVoted = new Set()
    this.options = options
    this.title = title
    this.votes = options.map(_ => 0)

    this._promise = Promise.delay(process.env.POLL_DURATION_MS)
      .then(() => this.results)
  }

  vote(input, user) {
    if (this.hasVoted.has(user)) { return }

    let digit

    if (+input) {
      digit = +input - 1
    } else if (this.options.indexOf(input) !== -1) {
      digit = this.options.indexOf(input)
    } else {
      return
    }

    this.hasVoted.add(user)
    this.votes[digit]++
  }

  get promise() {
    return this._promise
  }

  get results() {
    return `_Results for “${this.title}”_\n` + zip(this.options, this.votes)
      .map(([option, votes]) => `*${option}:* ${votes}`).join('\n')
  }
}
