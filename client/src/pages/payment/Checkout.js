import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const CART_STORAGE_KEY = "nike-demo-cart";

const DEFAULT_ITEMS = [
  {
    _id: "demo-1",
    title: "Nike Air Max 90 'Mercurial' Men's Trainers",
    description: "Leather and synthetic upper with a responsive foam midsole.",
    size: "EU 45",
    quantity: 1,
    price: 4109000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "demo-2",
    title: "Nike Air Max 90 'Mercurial' Men's Trainers",
    description: "Neutral cushioning for everyday wear and a clean finish.",
    size: "EU 43",
    quantity: 1,
    price: 4109000,
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "demo-3",
    title: "Jordan Tiempo Maestro Elite SE Firm-Ground Low-Top Football Boots",
    description: "Lightweight boot with a textured touch zone and grippy outsole.",
    size: "EU 40",
    quantity: 1,
    price: 7759000,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80",
  },
];

const parsePrice = (value) => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const normalizedValue = value.replace(/[^0-9.-]/g, "").replace(/,/g, "");
    const parsedValue = Number(normalizedValue);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
  }

  return 0;
};

const formatPrice = (value) => `${new Intl.NumberFormat("en-US").format(parsePrice(value))}₫`;

const readJsonStorage = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return fallback;
  }
};

const getImage = (item) => {
  if (Array.isArray(item?.img) && item.img.length) {
    return item.img[0];
  }

  return item?.image || item?.Image || "";
};

const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="space-y-3">
    <p className="text-[15px] font-medium text-[#111]">{eyebrow}</p>
    <h2 className="text-[18px] font-medium text-[#111]">{title}</h2>
    {description ? <p className="max-w-[38rem] text-[15px] leading-6 text-[#707072]">{description}</p> : null}
  </div>
);

const Field = ({ label, placeholder, className = "", type = "text", icon }) => (
  <label className="block">
    <span className="sr-only">{label}</span>
    <div
      className={`group flex h-14 items-center rounded-[4px] border border-[#bbb] bg-white px-4 text-[15px] text-[#111] transition-colors focus-within:border-[#111] hover:border-[#111] ${className}`}
    >
      {icon ? <span className="mr-3 text-[#9e9ea0]">{icon}</span> : null}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-0 bg-transparent p-0 text-[15px] outline-none placeholder:text-[#8f8f93]"
      />
    </div>
  </label>
);

const PaddedCard = ({ children, className = "" }) => (
  <div className={`rounded-[4px] border border-[#e5e5e5] bg-white ${className}`}>{children}</div>
);

const SummaryRow = ({ label, value, emphasis = false }) => (
  <div className="flex items-start justify-between gap-4">
    <span className={`text-[14px] ${emphasis ? "text-[#111]" : "text-[#707072]"}`}>{label}</span>
    <span className={`text-[14px] ${emphasis ? "font-medium text-[#111]" : "text-[#111]"}`}>{value}</span>
  </div>
);

const VNPAY_API_URL = "http://127.0.0.1:3001/vnpay/create-payment-url";

const makePaymentDescription = (subtotal) => `Thanh toan ${String(Math.round(subtotal)).slice(-6)}`;

const CheckoutPage = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentNotice, setPaymentNotice] = useState("");

  useEffect(() => {
    document.title = "Payment. Nike VN";
    setItems(readJsonStorage(CART_STORAGE_KEY, []));
  }, []);

  const previewItems = items.length ? items : DEFAULT_ITEMS;

  const subtotal = useMemo(
    () => previewItems.reduce((sum, item) => sum + parsePrice(item.price) * Number(item.quantity || 1), 0),
    [previewItems]
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const shippingProgress = Math.min(100, Math.max(68, Math.round((subtotal / 15977000) * 100)));

  const createVNPayUrl = useCallback(async () => {
    if (typeof window === "undefined") {
      return;
    }

    setPaymentLoading(true);
    setPaymentError("");

    try {
      const response = await fetch(VNPAY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(total),
          orderInfo: makePaymentDescription(subtotal),
          orderType: "other",
          locale: "vn",
          returnUrl: `${window.location.origin}/payment/return`,
        }),
      });

      const responseText = await response.text();
      let payload = null;

      try {
        payload = responseText ? JSON.parse(responseText) : null;
      } catch (error) {
        payload = null;
      }

      if (!response.ok) {
        const fallbackMessage = responseText && responseText.trim().startsWith("<") ? "VNPay backend returned HTML instead of JSON. Check that the server is running and the route is registered." : "Không thể tạo URL thanh toán VNPay.";
        throw new Error(payload?.message || fallbackMessage);
      }

      if (!payload?.paymentUrl) {
        throw new Error("VNPay backend did not return a paymentUrl.");
      }

      window.location.assign(payload.paymentUrl);
    } catch (error) {
      setPaymentError(error.message || "Không thể tạo URL thanh toán VNPay.");
    } finally {
      setPaymentLoading(false);
    }
  }, [subtotal, total]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const responseCode = params.get("vnp_ResponseCode");
    if (responseCode === "00") {
      setPaymentNotice("Thanh toán VNPay thành công.");
    } else if (responseCode) {
      setPaymentNotice(`VNPay trả về mã ${responseCode}.`);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <header className="border-b border-[#f1f1f1] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
            <Link to ="/">
                <svg
                      className="pre-logo-svg"
                      height="75px"
                      width="75px"
                      fill="#111"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"></path>
                </svg>
            </Link>
          <div className="flex items-center gap-3 text-[#111]">
            <Link to="/cart">
                <div className="button-right">
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                        <path stroke-width="1.5" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451l.76.76.531.531.53-.531.76-.76a4.926 4.926 0 013.504-1.451"></path>
                        <path stroke="currentColor" stroke-width="1.5" d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"></path>
                    </svg>
                </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_272px] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_292px]">
          <section className="min-w-0 max-w-[760px]">
            <div className="lg:hidden">
              <PaddedCard className="mb-10">
                <button
                  type="button"
                  onClick={() => setSummaryOpen((value) => !value)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left"
                >
                  <div>
                    <h2 className="text-[18px] font-medium text-[#111]">Order Summary</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] text-[#707072]">Subtotal</p>
                    <p className="text-[15px] font-medium text-[#111]">{formatPrice(subtotal)}</p>
                  </div>
                </button>
                {summaryOpen ? (
                  <div className="border-t border-[#e5e5e5] px-4 py-4">
                    <SummaryRow label="Shipping" value="Free" />
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#ededed]">
                      <div className="h-full rounded-full bg-[#007d48]" style={{ width: `${shippingProgress}%` }} />
                    </div>
                    <div className="mt-4 space-y-4">
                      {previewItems.map((item) => (
                        <div key={`${item._id}-${item.size}`} className="flex gap-3">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[3px] bg-[#f7f7f7]">
                            <img src={getImage(item)} alt={item.title} className="h-full w-full object-cover" />
                          </div>
                          <div className="min-w-0 text-[13px]">
                            <p className="line-clamp-3 leading-4 text-[#111]">{item.title}</p>
                            <p className="mt-1 text-[#707072]">Qty {item.quantity || 1}</p>
                            <p className="text-[#707072]">Size {item.size || "One Size"}</p>
                            <p className="mt-1 text-[#111]">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </PaddedCard>
            </div>

            <div className="space-y-8">
              <section id="delivery" className="scroll-mt-24">
                <p className="pt-1 text-[20px] text-[#111]">Delivery</p>

                <div className="mt-5 space-y-4">
                  <div className="max-w-[380px]">
                    <Field label="Email" placeholder="Email" type="email" />
                  </div>

                  <p className="pt-1 text-[15px] text-[#111]">Enter your name and address:</p>

                  <div className="grid gap-3 sm:max-w-[380px]">
                    <Field label="First Name" placeholder="First Name *" />
                    <Field label="Last Name" placeholder="Last Name *" />
                    <Field
                      label="Street address"
                      placeholder="Start typing a street address or postcode *"
                    />
                    <p className="px-1 text-[12px] text-[#8f8f93]">We do not ship to P.O. boxes</p>
                  </div>

                  <div className="grid gap-3 sm:max-w-[380px]">
                    <Field label="Phone Number" placeholder="Phone Number *" type="tel" />
                    <p className="px-1 text-[12px] text-[#8f8f93]">A carrier might contact you to confirm delivery.</p>
                  </div>
                </div>
              </section>

              <section id="shipping" className="scroll-mt-24 border-t border-[#ececec] pt-7">
                <p className="pt-1 text-[20px] text-[#111]">Shipping</p>
                <div className="mt-6 space-y-3 text-[15px] text-[#707072]">
                  <p>Free Shipping</p>
                <p>Shipment One</p>
                </div>
              </section>

              <section id="payment" className="scroll-mt-24 border-t border-[#ececec] pt-7">
                <p className="pt-1 text-[20px] text-[#111]">Payment</p>

                <div className="mt-6 space-y-4">

                  <div className="max-w-[760px] rounded-[4px] border border-[#e5e5e5] bg-white p-4 sm:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
                      <div className="flex flex-col items-center gap-3 lg:w-[320px] lg:shrink-0">
                        <div className="flex w-full items-center justify-between text-[14px] text-[#707072]">
                          <span>VNPay</span>
                        </div>

                        <div className="flex min-h-[320px] w-full items-center justify-center rounded-[18px] bg-[#f7f7f7] p-4">
                          {paymentLoading ? (
                            <div className="text-center text-[14px] text-[#707072]">
                              <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-[#111] border-t-transparent" />
                              Đang tạo URL thanh toán VNPay...
                            </div>
                          ) : (
                            <div className="max-w-[250px] text-center text-[14px] leading-6 text-[#707072]">
                              <p className="font-medium text-[#111]">Thanh toán VNPay</p>
                              <p className="mt-2">
                                {paymentError || "Nhấn nút bên dưới để mở cổng thanh toán VNPay."}
                              </p>
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#111] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:bg-[#707072]"
                          onClick={createVNPayUrl}
                          disabled={paymentLoading}
                        >
                          Mở cổng thanh toán VNPay
                        </button>
                      </div>

                      <div className="min-w-0 flex-1 space-y-4 text-[14px] text-[#111]">
                        <div>
                          <p className="text-[15px] font-medium text-[#111]">Thanh toán bằng VNPay</p>
                        </div>

                        {paymentNotice ? (
                          <PaddedCard className="bg-[#f5f5f5]">
                            <div className="px-4 py-3 text-[13px] text-[#111]">{paymentNotice}</div>
                          </PaddedCard>
                        ) : null}

                        <div className="grid gap-3 sm:grid-cols-2">
                          <SummaryRow label="Amount" value={formatPrice(total)} />
                          <SummaryRow label="Currency" value="VND" />
                        </div>

                        <PaddedCard className="bg-[#f7f7f7]">
                          <div className="space-y-2 px-4 py-4 text-[13px] text-[#707072]">
                            <div className="flex items-start justify-between gap-4">
                              <span>Transfer content</span>
                              <span className="font-medium text-[#111]">{makePaymentDescription(subtotal)}</span>
                            </div>
                            <div className="flex items-start justify-between gap-4">
                              <span>Expires</span>
                              <span className="font-medium text-[#111]">30 minutes</span>
                            </div>
                          </div>
                        </PaddedCard>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-[4px] border border-[#e5e5e5] bg-white px-5 py-4 shadow-[0_0_0_1px_rgba(0,0,0,0.01)]">
              <h2 className="text-[22px] font-medium text-[#111]">Order Summary</h2>

              <div className="mt-6 space-y-3">
                <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
                <SummaryRow label="Shipping" value="Free" />
              </div>

              <div className="my-5 border-t border-[#e5e5e5]" />

              <SummaryRow label="Total" value={formatPrice(total)} />

              <div className="my-5 border-t border-[#e5e5e5]" />


              <div className="mt-4 space-y-7">
                {previewItems.map((item) => (
                  <div key={`${item._id}-${item.size}`} className="grid grid-cols-[120px_minmax(0,1fr)] gap-3">
                    <div className="h-[92px] overflow-hidden rounded-[3px] bg-[#f7f7f7]">
                      <img src={getImage(item)} alt={item.title} className="h-full w-full object-contain" />
                    </div>
                    <div className="text-[13px] leading-5 text-[#111]">
                      <p>{item.title}</p>
                      <p className="text-[#707072]">Qty {item.quantity || 1}</p>
                      <p className="text-[#707072]">Size {item.size || "One Size"}</p>
                      <p className="text-[#707072]">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-8 bg-[#111] text-white">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 text-[12px] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-3 text-white/95">
            <span>•</span>
            <span>Vietnam</span>
            <span>© 2026 Nike, Inc. All Rights Reserved</span>
            <span className="hidden sm:inline">Terms of Use</span>
            <span className="hidden sm:inline">Terms of Sale</span>
            <span className="hidden sm:inline">Privacy Policy</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              "VISA",
              "MC",
              "AE",
              "DISC",
              "PayPal",
              "G Pay",
            ].map((badge) => (
              <span key={badge} className="inline-flex h-6 items-center justify-center rounded-sm bg-white px-2 text-[10px] font-semibold text-[#111]">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;
