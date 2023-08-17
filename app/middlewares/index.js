module.exports = (app) => {
  app.use(
    require('./cors'),
    require('./body-parser-json'),
    require('./body-parser-url-encoder'),
    require('./timestamp')
    // require("./public"),
  )
}
