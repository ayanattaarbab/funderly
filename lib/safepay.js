import Safepay from '@sfpy/node-core';

const isProd = process.env.SAFEPAY_ENV === 'production';

export const SAFEPAY_HOST = isProd
  ? 'https://api.getsafepay.com'
  : 'https://sandbox.api.getsafepay.com';

export const safepay = new Safepay(process.env.SAFEPAY_SECRET_KEY, {
  authType: 'secret',
  host: SAFEPAY_HOST,
});