/**
 * @example
 * normalizeSimpleMap({ a: 1, b: 2 })
 * //> [{ _key: 'a', _value: 1 }, { _key: 'b', _value: 2 }]
 */
export const normalizeSimpleMap = <T>(x: Record<string, T>) =>
  Object.entries(x).map(([k, v]) => ({ _key: k, _value: v }))

/**
 * @example
 * const data = [{ _key: 'a', _value: 1 }, { _key: 'b', _value: 2 }]
 * denormalizeIntoSimpleMap(data)
 * //> { a: 1, b: 2 }
 */
export const denormalizeIntoSimpleMap = <T>(x: Array<{ _key: string; _value: T }>) =>
  Object.fromEntries(x.map(y => [y._key, y._value]))

export const delay = (ms: number = 5000) => new Promise(res => setTimeout(res, ms))
