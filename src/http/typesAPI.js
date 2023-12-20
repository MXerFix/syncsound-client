import { $host, $authHost } from './index';

export const fetchTypes = async () => {
  const { data } = await $host.get('/api/type')
  return data
}

export const createType = async (type) => {
  const response = await $authHost.post('/api/type', type)
  return response
}

export const editType = async (type) => {
  const response = await $authHost.patch('/api/type', type)
  return response
}
