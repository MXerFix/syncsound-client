import { $host, $authHost } from './index';

export const createOfferFn = async (offer) => {
  const { data } = await $host.post('/api/offer/addoffer', offer)
  return data
}

export const createOfferDeviceFn = async (device) => {
  const { data } = await $host.post('/api/offer/addofferdevice', device)
  return data
}