const Slack = require('slack-client')

const handleMessage = require('./bot')

const token = process.env.SLACK_TOKEN
const autoReconnect = true
const autoMark = true

const slack = new Slack(token, autoReconnect, autoMark)

slack.on('message', message => {
  const parsedMessage = parseMessage(message)
  const { type, ts, channel, user, text } = parsedMessage

  console.log(`${type} ${ts}: #${channel.name} @${user.name} ${text}`)

  if (text.trim() && channel.is_channel) {
    const response = handleMessage(parsedMessage)

    response.then(text => channel.send(text))
    response.catch(err => console.error(err))
  }
})

slack.on('error', err => console.error(err))

function parseMessage({ type, ts, channel, user, text }) {
  return { type, ts, text

  , user: slack.getUserByID(user) || { name: 'UNKNOWN_USER' }

  , channel: slack.getChannelGroupOrDMByID(channel) ||
    { name: 'UNKNOWN_CHANNEL'
    , is_channel: false
    }
  }
}

export default function() {
  slack.login()
}
