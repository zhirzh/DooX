export interface Routes {}

export type GetRoutes = {
  [K in keyof Routes]: Routes[K]
}
