let res;
for (let i = 2; i < process.argv.length; i++) {
  res += Number(process.argv[i]);
}
console.log(res);
