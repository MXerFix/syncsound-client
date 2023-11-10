import { $host, $authHost } from "./index";

export const createOfferFn = async offer => {
  const { data } = await $host.post("/api/offer/addoffer", offer);
  return data;
};

export const get_all_offers = async () => {
  const { data } = await $authHost.get("/api/offer/getoffers");
  return data;
};

export const createOfferDeviceFn = async device => {
  const { data } = await $host.post("/api/offer/addofferdevice", device);
  return data;
};

export const change_offer_status = async ({ id, status }) => {
  const { data } = await $host.post("/api/offer/changeofferstatus", {
    id,
    status,
  });
  return data;
};

export const get_offer = async (id) => {
  try {
    const { data } = await $host.post(`/api/offer`, { id });
    return data;
  } catch (error) {
    console.log(error)
  }
};
