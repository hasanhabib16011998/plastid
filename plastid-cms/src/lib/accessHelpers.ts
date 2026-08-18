/**
 * Access control helpers for tenant-scoped collections.
 */
import type { Access, PayloadRequest } from 'payload'

type UserWithTenants = {
  isSuperAdmin?: boolean | null
  tenants?: Array<{ id?: string; slug?: string } | string> | null
}

/** Check if a user is a super-admin */
export const isSuperAdmin = (user: PayloadRequest['user']): boolean => {
  if (!user) return false
  return Boolean((user as UserWithTenants).isSuperAdmin)
}

/** Check if a user has access to a specific tenant slug */
export const hasAccessToTenant = (
  user: PayloadRequest['user'],
  tenantSlug: string,
): boolean => {
  if (!user) return false
  if (isSuperAdmin(user)) return true

  const typedUser = user as UserWithTenants
  const tenants = typedUser.tenants
  if (!tenants || !Array.isArray(tenants)) return false

  return tenants.some((rel) => {
    if (typeof rel === 'string') return false
    return rel && typeof rel === 'object' && 'slug' in rel && rel.slug === tenantSlug
  })
}

/**
 * Returns a Payload access function that restricts to a given tenant slug.
 * Super-admins always pass.
 */
export const tenantAccess = (slug: string): Access => {
  return ({ req }: { req: PayloadRequest }): boolean => {
    return hasAccessToTenant(req.user, slug)
  }
}
