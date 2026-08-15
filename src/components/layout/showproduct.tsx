import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import Rating from "./rading";
import { useNavigate } from "@tanstack/react-router";
import { useGetColors } from "@/API/colors";

interface Props {
  id: number;
  img: string;
  name: string;
  rating: number;
  price: number;
  color?: string;
  discountPercentage: number;
}

export default function ShowProduct({
  id,
  img,
  name,
  rating,
  price,
  color,
  discountPercentage,
}: Props) {
  const priceAfter = price - (price * discountPercentage) / 100;
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const { data: colors } = useGetColors();
  // const color = colors?.data.find((i) => i.color === selectcolor[0])?.path;
  const nameColor = colors?.data.find((i) => i.color === color)?.path;
  const {
    items: cartItems,
    decreaseQuantity,
    increaseQuantity,
  } = useCartStore();
  const cartItem = cartItems.find((item) => item.productId === id);
  return (
    <div className="overflow-hidden rounded-xl bg-white w-64">
      <div className="relative">
        <img
          onClick={() => navigate({ to: `/stores/product/${id}` })}
          src={img}
          alt={name}
          className="max-h-64 w-full object-cover rounded-xl cursor-pointer"
        />

        {discountPercentage > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{discountPercentage}%
          </span>
        )}
      </div>

      <div className="">
        <h3
          className="truncate text-lg font-semibold cursor-pointer"
          onClick={() => navigate({ to: `/stores/product/${id}` })}
        >
          {name}
        </h3>
        <div className="flex">
          <Rating rating={rating} type="main" />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">${priceAfter.toFixed(2)}</span>

            {discountPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
          <div>
            {cartItem ? (
              <>
                <div
                  className="flex items-center gap-2"
                  key={cartItem.productId}
                >
                  <button
                    onClick={() => decreaseQuantity(cartItem.productId)}
                    className="w-4 h-4 rounded border hover:bg-gray-100"
                  >
                    <Minus size={12} className="mx-auto" />
                  </button>
                  <span className="w-3 text-center">{cartItem.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(cartItem.productId)}
                    className="w-4 h-4 rounded border hover:bg-gray-100"
                  >
                    <Plus size={12} className="mx-auto" />
                  </button>
                </div>
              </>
            ) : (
              <Button
                size="sm"
                className="rounded-full px-5"
                onClick={() => {
                  if (nameColor) {
                    addToCart({
                      productId: id,
                      name: name,
                      image: img,
                      price: priceAfter,
                      quantity: 1,
                      color: nameColor,
                      discount: price,
                    });
                  }
                }}
              >
                Buy
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
