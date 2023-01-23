/* eslint-disable indent */
export const PROTOCOL = process.env.API_PROTOCOL;
export const DOMAIN = process.env.API_DOMAIN;
export const PORT = process.env.API_PORT;
export const MAP_URL = process.env.IMAGE_SRC;

export const PROTOCOL_LIVE = process.env.API_PROTOCOL_LIVE;
export const DOMAIN_LIVE = process.env.API_DOMAIN_LIVE;
export const MAP_URL_LIVE = process.env.IMAGE_SRC_LIVE;
export const SPIN_IMAGE_URL_LIVE = process.env.IMAGE_SRC_SPIN;
export const USER_IMAGE_SRC_LIVE = process.env.USER_IMAGE_SRC;

const IS_LIVE = process.env.IS_LIVE === 'true';
export default {
  API: IS_LIVE
    ? {
        URL: `${PROTOCOL_LIVE}://${DOMAIN_LIVE}`,
        ImageURL: `${PROTOCOL_LIVE}://${DOMAIN_LIVE}`,
        InvoiceURL: `${PROTOCOL_LIVE}://${DOMAIN_LIVE}`,
        MapImageUrl: MAP_URL_LIVE,
        SpinImageUrl: SPIN_IMAGE_URL_LIVE,
        UserImageUrl: USER_IMAGE_SRC_LIVE,
      }
    : {
        URL: `${PROTOCOL}://${DOMAIN}`,
        ImageURL: `${PROTOCOL}://${DOMAIN}`,
        InvoiceURL: `${PROTOCOL}://${DOMAIN}`,
        MapImageUrl: MAP_URL,
        SpinImageUrl: SPIN_IMAGE_URL_LIVE,
        UserImageUrl: USER_IMAGE_SRC_LIVE,
      },
};
