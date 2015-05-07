import dedent from 'dedent'
import Promise from 'bluebird'

import Poll from '../models/poll'

let poll
let resultsReturned = false

function pollHandler(text) {
  if (poll) {
    return Promise.resolve('Wait until the current poll is finished!')
  }

  const [title, rest] = text.split(/: ?/)
  const options = rest.split(' ')
  const optionsList = options.map((option, i) => `${i + 1}. ${option}`)

  poll = new Poll(title, options)

  const message = dedent`
    *New poll: ${title}*

    ${optionsList.join('\n')}

  ` + '\n\n_Vote now with `!vote [digit]`_'

  return Promise.resolve(message)
}

function voteHandler(text, user) {
  if (!poll) {
    return Promise.resolve("There isn't an active poll!")
  }

  const [vote] = text.split(' ')

  poll.vote(vote, user)

  if (resultsReturned) {
    return Promise.resolve()
  } else {
    resultsReturned = true

    poll.promise.then(_ => {
      poll = null
      resultsReturned = false
    })

    return poll.promise
  }
}

const handler = (text, user) => {
  const [command, ...rest] = text.split(' ')

  if (/^!?poll/.test(command)) {
    return pollHandler(rest.join(' '))
  } else {
    return voteHandler(rest.join(' '), user)
  }
}

handler.pattern = /^!?(poll|vote)\b/

handler.helpMessage = '!poll [title]: [option1 option2 ...]'

export default handler
