function env(key) {
  const value = process.env[key]

  if (!process.env.hasOwnProperty(key)) {
    throw new Error(`Env error: key "${key}" does not exists`)
  }

  return value
}

env.string = (key) => {
  return env(key)
}

env.number = (key) => {
  const value = +env(key)

  if (!Number.isFinite(value)) {
    throw new Error(`Env error: value of key "${key}" is not a number`)
  }

  return value
}

module.exports = env
