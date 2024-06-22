"use client";
import { useProductCart } from "@/store/cart-store";
import { useWishlistCart } from "@/store/wishlist-store";
import {
  Heart,
  Home,
  ShoppingBagIcon,
  ShoppingBasket,
  User,
} from "lucide-react";
import Link from "next/link";
import React from "react";

function BottomNav({ token }) {
  const { cart } = useProductCart();
  const { wishlist } = useWishlistCart();

  return (
    <div className="md:pt-0 pt-12">
      <div className="fixed bottom-0 left-0 right-0 py-4  container lg:hidden bg-white shadow-xl z-40 w-full flex items-center justify-between">
        <Link
          href={"/"}
          className="flex flex-col gap-1 items-center text-center"
        >
          <Home width={1000} height={1000} className="w-5 h-5" />
          <p className="text-xs font-semibold">Shop</p>
        </Link>
        <div className="flex flex-col gap-1 items-center text-center">
          <Link href={"/wishlist"} className="relative">
            <Heart width={1000} height={1000} className="w-5 h-5" />
            <span className="absolute bg-red-600 text-white -top-2 -right-2 w-4 h-4 text-center rounded-full text-[11px]">
              {Object.keys(wishlist)?.length}
            </span>
          </Link>
          <p className="text-xs font-semibold">Wishlist</p>
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <Link href={"/my-cart"} className="relative">
            <ShoppingBagIcon width={1000} height={1000} className="w-5 h-5" />
            <span className="absolute bg-red-600 text-white -top-2 -right-2 w-4 h-4 text-center rounded-full text-[11px]">
              {Object.keys(cart)?.length}
            </span>
          </Link>
          <p className="text-xs font-semibold">Cart</p>
        </div>
        {token ? (
          <Link
            href={"/dashboard?route="}
            className="flex flex-col gap-1 items-center text-center"
          >
            <User width={1000} height={1000} className="w-5 h-5" />
            <p className="text-xs font-semibold">My Account</p>
          </Link>
        ) : (
          <Link
            href={"/login"}
            className="flex flex-col gap-1 items-center text-center"
          >
            <User width={1000} height={1000} className="w-5 h-5" />
            <p className="text-xs font-semibold">My Account</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default BottomNav;
