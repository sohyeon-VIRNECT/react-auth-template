import { StringSchema } from 'yup'

declare module 'yup' {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    sequence: (funcList: Array<() => StringSchema>) => StringSchema
  }
}
