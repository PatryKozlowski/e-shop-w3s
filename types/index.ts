import { ReactElement } from 'react'
import type Prisma from '@prisma/client'

export interface Icon { icon: ReactElement }

export interface aboutItems {
  title: string
  href: string
}

export interface storeItems extends Icon {
  title: string
}

export interface paymentItems extends Icon {
  title: string
}

export interface socialItems extends Icon {
  href: string
}

export type HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH'

export interface FetcherConfig {
  readonly method: HTTPMethod
  readonly body?: object
  readonly config?: RequestInit
}

export interface ProductsProps {
  products: Prisma.Jeans[]
}

export interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    image: string
    price: number
    info: Prisma.JeansInfo
    type: Prisma.JeansType
    createdAt: Date
    updatedAt: Date
  }
  sizes: Array<{
    id: string
    jeansId: string
    size: string
    stock: number
    createdAt: Date
    updatedAt: Date
  }>
}
