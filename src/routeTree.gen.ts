/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as InvoicesIndexImport } from './routes/invoices.index'
import { Route as InvoicesCreateImport } from './routes/invoices_.create'
import { Route as InvoicesIdImport } from './routes/invoices.$id'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const InvoicesIndexRoute = InvoicesIndexImport.update({
  id: '/invoices/',
  path: '/invoices/',
  getParentRoute: () => rootRoute,
} as any)

const InvoicesCreateRoute = InvoicesCreateImport.update({
  id: '/invoices_/create',
  path: '/invoices/create',
  getParentRoute: () => rootRoute,
} as any)

const InvoicesIdRoute = InvoicesIdImport.update({
  id: '/invoices/$id',
  path: '/invoices/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/invoices/$id': {
      id: '/invoices/$id'
      path: '/invoices/$id'
      fullPath: '/invoices/$id'
      preLoaderRoute: typeof InvoicesIdImport
      parentRoute: typeof rootRoute
    }
    '/invoices_/create': {
      id: '/invoices_/create'
      path: '/invoices/create'
      fullPath: '/invoices/create'
      preLoaderRoute: typeof InvoicesCreateImport
      parentRoute: typeof rootRoute
    }
    '/invoices/': {
      id: '/invoices/'
      path: '/invoices'
      fullPath: '/invoices'
      preLoaderRoute: typeof InvoicesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/invoices/$id': typeof InvoicesIdRoute
  '/invoices/create': typeof InvoicesCreateRoute
  '/invoices': typeof InvoicesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/invoices/$id': typeof InvoicesIdRoute
  '/invoices/create': typeof InvoicesCreateRoute
  '/invoices': typeof InvoicesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/invoices/$id': typeof InvoicesIdRoute
  '/invoices_/create': typeof InvoicesCreateRoute
  '/invoices/': typeof InvoicesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/invoices/$id' | '/invoices/create' | '/invoices'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/invoices/$id' | '/invoices/create' | '/invoices'
  id: '__root__' | '/' | '/invoices/$id' | '/invoices_/create' | '/invoices/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  InvoicesIdRoute: typeof InvoicesIdRoute
  InvoicesCreateRoute: typeof InvoicesCreateRoute
  InvoicesIndexRoute: typeof InvoicesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  InvoicesIdRoute: InvoicesIdRoute,
  InvoicesCreateRoute: InvoicesCreateRoute,
  InvoicesIndexRoute: InvoicesIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/invoices/$id",
        "/invoices_/create",
        "/invoices/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/invoices/$id": {
      "filePath": "invoices.$id.tsx"
    },
    "/invoices_/create": {
      "filePath": "invoices_.create.tsx"
    },
    "/invoices/": {
      "filePath": "invoices.index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
