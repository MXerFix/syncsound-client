import { $host, $authHost } from './index';

export const fetchColors = async () => {
  const { data } = await $host.get('/api/color')
  return data
}

export const createColor = async (color) => {
  const response = await $authHost.post('/api/color', color)
  return response
}

export const editColor = async (color) => {
  const response = await $authHost.patch('/api/color', color)
  return response
}