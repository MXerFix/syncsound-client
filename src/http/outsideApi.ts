import { $host } from "."

const url = process.env.REACT_APP_API_URL

export const get_boxberry_cities = async () => {
  try {
    const response = await $host.get(url + 'api/boxberry/cities')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const get_boxberry_points = async () => {
  try {
    const response = await $host.get(url + 'api/boxberry/points')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const get_boxberry_price = async ({ target, sum }: { target: string, sum: string }) => {
  try {
    const response = await $host.get(url + `api/boxberry/price?target=${target}&sum=${sum}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const get_boxberry_price_courier = async ({ zip, sum }: { zip: string, sum: string }) => {
  try {
    const response = await $host.get(url + `api/boxberry/price?zip=${zip}&sum=${sum}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const create_yookassa_payment = async (payload: any) => {
  try {
    const response = await $host.post(url + `api/payment/create`, { payload })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const check_yookassa_payment = async (id: string) => {
  try {
    const response = await $host.post(url + `api/payment/check`, {id})
    console.log(response)
    return response.data.status === 'waiting_for_capture' && response.data.paid
  } catch (error) {
    console.log(error)
  }
}