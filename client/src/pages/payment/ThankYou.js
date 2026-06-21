import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();

  const details = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      status: params.get("status") || "success",
      order: params.get("order") || "",
      txn: params.get("txn") || "",
      amount: params.get("amount") || "",
      code: params.get("code") || "",
    };
  }, [location.search]);

  const success = details.status === "success";

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16">
        <div className="rounded-[28px] border border-[#e5e5e5] bg-[#f7f7f7] p-8 shadow-sm sm:p-10">
          <p className="text-[13px] uppercase tracking-[0.24em] text-[#707072]">Nike Checkout</p>
          <h1 className="mt-3 text-4xl font-semibold text-[#111] sm:text-5xl">
            {success ? "Cảm ơn bạn đã mua hàng" : "Thanh toán chưa hoàn tất"}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#707072]">
            {success
              ? "Chúng tôi đã ghi nhận giao dịch của bạn. Đơn hàng sẽ được xử lý ngay khi VNPay xác nhận thành công."
              : "Giao dịch chưa thành công hoặc đã bị hủy. Bạn có thể quay lại checkout để thử lại."}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[20px] bg-white p-4">
              <p className="text-[12px] text-[#707072]">Order</p>
              <p className="mt-1 text-[16px] font-medium text-[#111]">{details.order || "-"}</p>
            </div>
            <div className="rounded-[20px] bg-white p-4">
              <p className="text-[12px] text-[#707072]">Transaction</p>
              <p className="mt-1 text-[16px] font-medium text-[#111]">{details.txn || "-"}</p>
            </div>
            <div className="rounded-[20px] bg-white p-4">
              <p className="text-[12px] text-[#707072]">Amount</p>
              <p className="mt-1 text-[16px] font-medium text-[#111]">
                {details.amount ? new Intl.NumberFormat("en-US").format(Number(details.amount) / 100) + "₫" : "-"}
              </p>
            </div>
          </div>

          {!success && details.code ? (
            <p className="mt-4 text-[14px] text-[#707072]">VNPay response code: {details.code}</p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#d5d5d5] px-6 text-[14px] font-medium text-[#111] transition-colors hover:border-[#111] hover:bg-white"
            >
              Về trang chủ
            </Link>
            <Link
              to="/cart"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#111] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#2a2a2a]"
            >
              Quay lại giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
