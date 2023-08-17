module.exports = async function (req, res, next) {
  const now = new Date()

  await next()

  console.log(
    `[${now.toISOString()}] ${res.statusCode || 500} ${req.method} ${
      req.originalUrl
    }`
  )
}
