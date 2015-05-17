import dedent from 'dedent'
import Promise from 'bluebird'

const { abs, floor, random } = Math

const handler = (text, user) => {
  const [_, x = 100, y] = text.split(' ')

  const min = y ? parseInt(x) : 1
  const max = y ? parseInt(y) : parseInt(x)

  const roll = floor(random() * (max - min + 1)) + min

  return Promise.resolve(dedent`
    _${user.name} rolls (${min}-${max})_:
    *${roll}*
    `)
}

handler.pattern = /!?roll/

handler.helpMessage = `!roll [min] [max]`

export default handler
