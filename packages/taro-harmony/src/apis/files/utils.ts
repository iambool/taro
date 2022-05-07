import { IAsyncParams, FunctionType } from '../utils/types'
import { callAsyncSuccess, callAsyncFail } from '../utils'

const ability_featureAbility = require('@ohos.ability.featureAbility')

export async function getCacheDir (): Promise<string> {
  const context = ability_featureAbility.getContext()
  return await context.getCacheDir()
}

export function callCallbackSuccess<T extends FunctionType> (res, options?: IAsyncParams<T>) {
  options?.success?.(res)
  options?.complete?.(res)
}

export function callCallbackFail<T extends FunctionType> (res, options?: IAsyncParams<T>) {
  options?.fail?.(res)
  options?.complete?.(res)
}

export function notSupport<T extends FunctionType> (apiName, options?: IAsyncParams<T>) {
  const errMsg = `不支持 API ${apiName}`
  if (process.env.NODE_ENV !== 'production') {
    console.error(errMsg)
    callCallbackFail({ errMsg }, options)
  } else {
    console.warn(errMsg)
    callCallbackSuccess({ errMsg }, options)
  }
}

export function notSupportAsync <T extends FunctionType> (apiName, options?: IAsyncParams<T>): Promise<TaroGeneral.CallbackResult> {
  return new Promise((resolve, reject) => {
    const errMsg = `不支持 API ${apiName}`
    if (process.env.NODE_ENV !== 'production') {
      console.error(errMsg)
      return callAsyncFail(reject, { errMsg }, options)
    } else {
      console.warn(errMsg)
      return callAsyncSuccess(resolve, { errMsg }, options)
    }
  })
}
