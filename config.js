module.exports = {
  nitrogenBases: ['A','C','T','G'],
  mutantChainRegex: /(A{4}|T{4}|C{4}|G{4})/g,
  minMutantChainChanges: 1,
  port: 3000,
  persist: true,
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
}
