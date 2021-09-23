export const PROTOCOL = process.env.API_PROTOCOL;
export const DOMAIN = process.env.API_DOMAIN;
export const PORT = process.env.API_PORT;

export default {
  API: {
    URL: `${PROTOCOL}://${DOMAIN}:${PORT}`,
    ImageURL: `${PROTOCOL}://${DOMAIN}:${PORT}`,
    InvoiceURL: `${PROTOCOL}://${DOMAIN}:${PORT}`,
  },
};
