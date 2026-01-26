// Fisher-Yates 셔플 알고리즘 (crypto 사용)
export function cryptoShuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  const randomValues = new Uint32Array(shuffled.length)
  crypto.getRandomValues(randomValues)

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomValues[i] % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}
