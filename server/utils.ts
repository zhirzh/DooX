/**
 * @example
 * normalizeSimpleMap([{ a: 1 }, { b: 2 }])
 * //> [{ _key: 'a', _value: 1 }, { _key: 'b', _value: 2 }]
 */
export const normalizeSimpleMap = <T>(x: Record<string, T>) => {
  return Object.entries(x).map(([k, v]) => ({ _key: k, _value: v }))
}
