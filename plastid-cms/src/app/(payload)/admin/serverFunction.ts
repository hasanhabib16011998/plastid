'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'

export async function serverFunction(args: Parameters<ServerFunctionClient>[0]) {
  return handleServerFunctions(args as any)
}
