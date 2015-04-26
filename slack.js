import Slack from 'slack-client'

import handleMessage from './bot'

const token = process.env.SLACK_TOKEN
const autoReconnect = true
const autoMark = true

const slack = new Slack(token, autoReconnect, autoMark)

slack.on('message', message => {
  const parsedMessage = parseMessage(message)
  const { type, ts, channel, user, text } = parsedMessage

  console.log(`${type} ${ts}: #${channel.name} @${user.name} ${text}`)

  const mentionRegExp = new RegExp(`^<@${slack.self.id}>:?`)
  const isMention = mentionRegExp.test(text)
  const isDM = channel.name === user.name

  if (isDM || isMention) {
    const messageText = text.replace(mentionRegExp, '').trim()
    const response = handleMessage(messageText)

    response.then(text => channel.send(text))
    response.catch(err => console.error(err))
  }
})

slack.on('error', err => console.error(err))

function parseMessage({ type, ts, channel, user, text }) {
  return { type, ts, text

  , user: slack.getUserByID(user) ||
    { name: 'UNKNOWN_USER' }

  , channel: slack.getChannelGroupOrDMByID(channel) ||
    { name: 'UNKNOWN_CHANNEL' }
  }
}

export default function() {
  slack.login()
}
