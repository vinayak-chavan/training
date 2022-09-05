function withBind (namespace) {
  return console.log.bind(console, namespace)
}
module.exports = withBind