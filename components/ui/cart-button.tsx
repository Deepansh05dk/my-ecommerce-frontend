"use client";
import React from "react";
import { ShoppingBagIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart";

function CartButton() {
  const router = useRouter();
  const cart = useCart();
  const onClick = () => {
    router.push("/cart");
  };
  return (
    <button
      onClick={onClick}
      className={
        "relative rounded-full flex items-center justify-center bg-white border shadow-md p-2 transition"
      }
    >
      <ShoppingBagIcon className="h-5 w-5" />
      <div className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
        {cart.items.length}
      </div>
    </button>
  );
}

export default CartButton;
