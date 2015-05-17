import dedent from 'dedent'
import Promise from 'bluebird'
import requireDirectory from 'require-directory'

const handlers = requireDirectory(module)

const handler = () => {
  const messages = Object.keys(handlers)
    .map(key => handlers[key].helpMessage)
    .filter(Boolean)
    .sort()
    .map(message => '`' + message + '`')

  return Promise.resolve(dedent`
    _Commands:_
    ${messages.join('\n')}
  `)
}

handler.pattern = /!?help\b/

export default handler
