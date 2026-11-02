import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export const toolComponents: Record<string, LazyExoticComponent<ComponentType>> = {
  'json-formatter': lazy(() => import('./JsonFormatter')),
  base64: lazy(() => import('./Base64Tool')),
  'url-encoder': lazy(() => import('./UrlEncoder')),
  'jwt-decoder': lazy(() => import('./JwtDecoder')),
  'hash-generator': lazy(() => import('./HashGenerator')),
  'uuid-generator': lazy(() => import('./UuidGenerator')),
  'timestamp-converter': lazy(() => import('./TimestampConverter'))
}
