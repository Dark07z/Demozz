const crypto = require('crypto');

const VNPAY_URL = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
const VNPAY_TMN_CODE = process.env.VNP_TMN_CODE || 'TNBNK8OK';
const VNPAY_HASH_SECRET = process.env.VNP_HASH_SECRET || 'E17X3MADTWR0D745E3XC2UH4GUFFGD83';

const pad2 = (value) => String(value).padStart(2, '0');

const formatVietnamTime = (date) => {
  const vietnamTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  return (
    vietnamTime.getUTCFullYear().toString() +
    pad2(vietnamTime.getUTCMonth() + 1) +
    pad2(vietnamTime.getUTCDate()) +
    pad2(vietnamTime.getUTCHours()) +
    pad2(vietnamTime.getUTCMinutes()) +
    pad2(vietnamTime.getUTCSeconds())
  );
};

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    return String(forwardedFor).split(',')[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || '127.0.0.1';
};

const vnpEncode = (value) => encodeURIComponent(String(value)).replace(/%20/g, '+');

const buildVnpayUrl = ({ amount, orderInfo, orderType, locale, bankCode, returnUrl, ipAddr, orderId }) => {
  const createDate = formatVietnamTime(new Date());
  const expireDate = formatVietnamTime(new Date(Date.now() + 15 * 60 * 1000));
  const vnpAmount = Math.round(Number(amount)) * 100;

  const inputData = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: VNPAY_TMN_CODE,
    vnp_Amount: String(vnpAmount),
    vnp_CreateDate: createDate,
    vnp_CurrCode: 'VND',
    vnp_IpAddr: ipAddr,
    vnp_Locale: locale || 'vn',
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType || 'other',
    vnp_ReturnUrl: returnUrl,
    vnp_TxnRef: String(orderId),
    vnp_ExpireDate: expireDate,
  };

  const sortedKeys = Object.keys(inputData).filter((key) => inputData[key] !== '' && inputData[key] !== undefined && inputData[key] !== null).sort();
  const queryParts = [];
  const hashParts = [];

  sortedKeys.forEach((key) => {
    const value = inputData[key];
    queryParts.push(`${vnpEncode(key)}=${vnpEncode(value)}`);
    hashParts.push(`${vnpEncode(key)}=${vnpEncode(value)}`);
  });

  const queryString = queryParts.join('&');
  const signData = hashParts.join('&');
  const secureHash = crypto.createHmac('sha512', VNPAY_HASH_SECRET).update(signData).digest('hex');

  return `${VNPAY_URL}?${queryString}&vnp_SecureHash=${secureHash}`;
};

const registerVNPayRoutes = (app) => {
  app.post('/vnpay/create-payment-url', (req, res) => {
    try {
      const {
        amount,
        orderInfo,
        orderType = 'other',
        locale = 'vn',
        bankCode = '',
        returnUrl = 'http://localhost:3000/payment/return',
      } = req.body || {};

      if (!amount || Number(amount) <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0' });
      }

      const orderId = Date.now();
      const ipAddr = getClientIp(req);
      const finalOrderInfo = orderInfo || `Thanh toan don hang ${orderId}`;

      const paymentUrl = buildVnpayUrl({
        amount: Number(amount),
        orderInfo: finalOrderInfo,
        orderType,
        locale,
        bankCode,
        returnUrl,
        ipAddr,
        orderId,
      });

      return res.json({
        paymentUrl,
        orderId,
        amount: Math.round(Number(amount)) * 100,
        vnp_TmnCode: VNPAY_TMN_CODE,
        vnp_Url: VNPAY_URL,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to create VNPay payment URL',
        error: error.message,
      });
    }
  });
};

module.exports = registerVNPayRoutes;
