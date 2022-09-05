function attachTitle(name) {
  return 'DR. ' + name;
}
Promise.resolve('Manhattan')
  .then(attachTitle)
  .then(console.log);