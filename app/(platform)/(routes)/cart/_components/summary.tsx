"use client";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Suspense } from 'react'

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const totalPrice = items.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const afterSuccess = async () => {
    toast.success("Payment completed.");
    removeAll();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/success`,
        {
          session_id: searchParams.get("session_id"),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const afterCancelled = async () => {
    toast.error("Something went wrong.");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/cancelled`,
        {
          session_id: searchParams.get("session_id"),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (
      searchParams.get("success") &&
      sessionId !== searchParams.get("session_id")
    ) {
      afterSuccess();
      localStorage.setItem("session_id", searchParams.get("session_id") || "");
    }
    if (
      searchParams.get("cancelled") &&
      sessionId !== searchParams.get("session_id")
    ) {
      afterCancelled();
      localStorage.setItem("session_id", searchParams.get("session_id") || "");
    }
  }, []);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
        total: totalPrice,
      }
    );

    window.location = response.data.url;
  };

  return (
    <Suspense>
      <div className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-base font-medium text-gray-400">Order Total</div>
            <Currency value={totalPrice} />
          </div>
        </div>
        <Button
          disabled={items.length === 0}
          className="w-full mt-6"
          onClick={onCheckout}
        >
          Checkout
        </Button>
      </div>
    </Suspense>
  );
};

export default Summary;
