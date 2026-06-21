import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const paymentState = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const responseCode = params.get("vnp_ResponseCode");
    const txnRef = params.get("vnp_TxnRef") || "";
    const transactionNo = params.get("vnp_TransactionNo") || "";
    const amount = params.get("vnp_Amount") || "";

    return {
      responseCode,
      txnRef,
      transactionNo,
      amount,
      success: responseCode === "00",
    };
  }, [location.search]);

  useEffect(() => {
    if (!paymentState.responseCode) {
      navigate("/payment", { replace: true });
      return;
    }

    if (paymentState.success) {
      const query = new URLSearchParams();
      if (paymentState.txnRef) query.set("order", paymentState.txnRef);
      if (paymentState.transactionNo) query.set("txn", paymentState.transactionNo);
      if (paymentState.amount) query.set("amount", paymentState.amount);
      query.set("status", "success");
      navigate(`/thank-you?${query.toString()}`, { replace: true });
      return;
    }

    const query = new URLSearchParams();
    query.set("status", "failed");
    query.set("code", paymentState.responseCode);
    if (paymentState.txnRef) query.set("order", paymentState.txnRef);
    navigate(`/thank-you?${query.toString()}`, { replace: true });
  }, [navigate, paymentState]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 text-[#111]">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#111] border-t-transparent" />
        <p className="text-[15px] text-[#707072]">Đang xác minh kết quả thanh toán...</p>
      </div>
    </div>
  );
};

export default PaymentReturn;
