export const PROTOCOL = process.env.API_PROTOCOL;
export const DOMAIN = process.env.API_DOMAIN;
export const PORT = process.env.API_PORT;
export const MAP_URL = process.env.IMAGE_SRC;

export default {
  API: {
    URL: `${PROTOCOL}://${DOMAIN}:${PORT}`,
    ImageURL: `${PROTOCOL}://${DOMAIN}:${PORT}`,
    InvoiceURL: `${PROTOCOL}://${DOMAIN}:${PORT}`,
    MapImageUrl: MAP_URL,
  },
};
