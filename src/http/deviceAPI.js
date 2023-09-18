import { $host, $authHost } from './index';

export const fetchDevices = async () => {
  const { data } = await $host.get('/api/device')
  return data
}

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get('/api/device/' + id)
  return data
}

export const createDevice = async (device) => {
  const response = await $authHost.post('/api/device', device)
  return response
}

export const deleteDevice = async (id) => {
  const response = await $authHost.post('/api/device/delete', id)
  return response
}