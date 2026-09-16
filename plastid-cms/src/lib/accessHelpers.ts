/**
 * Access control helpers for tenant-scoped collections.
 */
import type { Access, PayloadRequest } from 'payload'

/** Check if a user is a super-admin */
export const isSuperAdmin = (user: PayloadRequest['user']): boolean => {
  if (!user) return false
  const u: any = user
  return Boolean(u.isSuperAdmin)
}

/** Check if a user has access to a specific tenant slug */
export const hasAccessToTenant = (
  user: PayloadRequest['user'],
  tenantSlug: string,
): boolean => {
  if (!user) return false
  if (isSuperAdmin(user)) return true

  const u: any = user
  const tenants = u.tenants
  if (!tenants || !Array.isArray(tenants)) return false

  return tenants.some((rel: any) => {
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
