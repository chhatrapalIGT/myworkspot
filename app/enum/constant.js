import { ENV } from '../config';

export default {
  API_URL: ENV.API.URL,
  // API_URL: 'https://6fec-122-170-3-194.ngrok.io',
  INVOICE_URL: ENV.API.InvoiceURL,
  MAP_IMAGE_URL: ENV.API.MapImageUrl,
  SPIN_IMAGE_URL_LIVE: ENV.API.SpinImageUrl,
};
