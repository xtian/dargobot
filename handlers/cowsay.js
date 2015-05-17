import dedent from 'dedent'
import Promise from 'bluebird'
import cow from 'cowsay'

const handler = (text) => {
  const [command, ...input] = text.split(' ')
  const options = { text: input.join(' ') }

  if (/!$/.test(options.text)) { options.e = '><' }

  let output

  if (/!?cowsay/.test(command)) {
    output = cow.say(options)
  } else {
    output = cow.think(options)
  }

  return Promise.resolve('```\n' + output + '\n```')
}

handler.pattern = /!?cow(say|think) \w+/

handler.helpMessage = `!cowsay [text]`

export default handler
