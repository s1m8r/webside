import { Link, useNavigate } from "@tanstack/react-router";
import Items from "./itemHeader";
import { ShoppingCart } from "lucide-react";
import ButtonChlidren from "../button";
import { useAuthStore } from "@/stores/userStore";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/API/cart";

const Header = () => {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalPrice,
    clearCart,
  } = useCartStore();
  const sIcon =
    "bg-white p-1 rounded-md transition-all duration-300 hover:scale-105 hover:rotate-1 cursor-pointer";
  const size = 30;
  const mr = "ml-2 mr-2";
  const navigator = useNavigate();
  const goToLogin = () => {
    navigator({ to: "/login" });
  };
  const user = useAuthStore.getState().user;
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useCart();
  const goCart = () => {
    const array = items.map((item) => ({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));
    const user = useAuthStore.getState().user;
    if (user)
      mutate(
        {
          data: array,
          email: user.email,
        },
        {
          onSuccess: () => {
            clearCart();
            setIsOpen(false);
          },
        },
      );
  };
  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white/60 backdrop-blur-md border-b border-gray-200/50 mb-18">
      <header className="h-18 flex items-center justify-between p-2">
        <Link to="/">
          <div className="logo flex items-center cursor-pointer">
            <img src="/logo.png" alt="Logo" className="w-20" />
            <span className=" font-bold ">Samer Shop</span>
          </div>
        </Link>
        <div className="items">
          <Items link="/">home</Items>
          <Items link="/stores">stores</Items>
          <Items link="/about">about</Items>
          <Items link="/orders">Orders</Items>
        </div>
        <div className="flex">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <button className={mr}>
                    <ShoppingCart
                      size={size}
                      className={`${sIcon} ${items.length > 0 ? "text-orange-500" : ""}`}
                    />
                  </button>
                </DialogTrigger>
              </TooltipTrigger>

              <TooltipContent>
                <p>My Cart</p>
              </TooltipContent>
            </Tooltip>

            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>My Cart</DialogTitle>
                <DialogDescription>
                  Products you have added to your cart.
                </DialogDescription>
              </DialogHeader>
              {items.length !== 0 && (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />

                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">${item.price}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.productId)}
                          className="w-8 h-8 rounded border hover:bg-gray-100"
                        >
                          <Minus size={16} className="mx-auto" />
                        </button>

                        <span className="w-6 text-center">{item.quantity}</span>

                        <button
                          onClick={() => increaseQuantity(item.productId)}
                          className="w-8 h-8 rounded border hover:bg-gray-100"
                        >
                          <Plus size={16} className="mx-auto" />
                        </button>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between border-t pt-3 font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalPrice()}</span>
                  </div>
                  <Button onClick={goCart}>Buy</Button>
                </div>
              )}
              {items.length === 0 && (
                <>
                  <div className="flex items-center justify-center text-gray-500">
                    Your cart is empty.
                  </div>
                  <Button onClick={() => setIsOpen(false)}>close</Button>
                </>
              )}
            </DialogContent>
          </Dialog>

          {!user && (
            <ButtonChlidren type="normal" onClick={goToLogin}>
              Login
            </ButtonChlidren>
          )}
          {user && (
            <button className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm font-semibold transition-all duration-300 hover:scale-105 hover:rotate-2 hover:bg-orange-600 hover:shadow-md">
              {user.firstName.charAt(0).toUpperCase()}
              {user.lastName.charAt(0).toUpperCase()}
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
