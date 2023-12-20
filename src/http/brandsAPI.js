import { $host, $authHost } from './index';

export const fetchBrands = async () => {
  const { data } = await $host.get('/api/brand')
  return data
}

export const createBrand = async (brand) => {
  const response = await $authHost.post('/api/brand', brand)
  return response
}

export const editBrand = async (brand) => {
  const response = await $authHost.patch('/api/brand', brand)
  return response
}