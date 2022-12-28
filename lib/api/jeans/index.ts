import type { ProductsProps } from '../../../types/index'
import { fetcher } from '../../fetcher'

export const getJeans = async (): Promise<ProductsProps> => {
  // return await fetcher('/api/getJeans', {
  //   method: 'GET',
  //   schema: productsSchema
  // })
  return await fetcher('/api/getJeans', {
    method: 'GET'
  })
}

export const getOneJeans = async (id: string): Promise<ProductsProps> => {
  // return await fetcher(`/api/getJeans/${id}`, {
  //   method: 'GET',
  //   schema: productsSchema
  // })
  // const res = await fetch(`/api/getJeans/${id}`, {
  //   method: 'GET'
  // })
  // return await res.json()
  return await fetcher(`/api/getJeans/${id}`, {
    method: 'GET'
  })
}
