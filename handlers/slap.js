import Promise from 'bluebird'

const handler = (text) => {
  const [_, name] = text.split(' ')

  return new Promise.resolve(`_slaps ${name} around a bit with a large trout_`)
}

handler.pattern = /!?slap \S+/

handler.helpMessage = `!slap [name]`

export default handler
