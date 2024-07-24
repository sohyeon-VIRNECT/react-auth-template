export type BooleanPartial<T> = {
  [K in keyof T]?: boolean
}
