'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import configPromise from '../../../payload.config'
import { importMap } from './importMap.js'

export async function serverFunction(args: Parameters<ServerFunctionClient>[0]) {
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}
