import { useCart } from "@/API/cart";
import TitleContent from "@/components/layout/title";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/userStore";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";

const MyCart = () => {
  const { mutate } = useCart();
  const user = useAuthStore.getState().user;
  const goCart = () => {
    if (totalPrice() === 0) return null;
    const array = items.map((item) => ({
      color: item.color,
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      discount: item.discount,
    }));

    if (user)
      mutate(
        {
          data: array,
          email: user.email,
        },
        {
          onSuccess: () => {
            clearCart();
          },
        },
      );
  };
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalPrice,
    clearCart,
    Subtotal,
  } = useCartStore();
  const navigator = useNavigate();
  return (
    <div className="px-12">
      <TitleContent title="My Cart" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8 px-2 py-4">
          <div>
            {items.length !== 0 && (
              <div className="space-y-3 max-h-[calc(80vh-80px)] overflow-y-auto">
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
                        <p className="text-sm text-gray-500">
                          Pricex: {item.discount.toFixed(2)}$
                        </p>
                        <p className="text-sm text-gray-500">
                          Color:{item.color}
                        </p>

                        <p className="text-sm text-gray-500">
                          <span> Discount:</span>
                          <span className="text-sm text-red-500">
                            -{(item.discount - item.price).toFixed(2)}$
                          </span>
                        </p>
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
              </div>
            )}
            {items.length === 0 && (
              <>
                <div className="flex flex-col items-center justify-center text-gray-500 ">
                  <span className="mb-8">Your cart is empty.</span>
                  <Button onClick={() => navigator({ to: "/" })}>
                    Go to Home
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 px-2 py-4 border-2 border-gray-300 h-fit rounded-[20px]">
          <h1>Order Summary</h1>
          <div className=" space-y-1 border-b-2 border-gray-300 py-2 pb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>

              <span className="text-sm font-bold">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Discount</span>
              <span className="text-sm text-red-500 font-bold">
                ${(Subtotal() - totalPrice()).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between mt-2">
              <span className="text-sm font-bold">Total</span>
              <span className="text-sm font-bold">
                ${(totalPrice() - (totalPrice() - Subtotal())).toFixed(2)}
              </span>
            </div>
            <div>
              <Button
                onClick={goCart}
                className="w-full"
                disabled={totalPrice() === 0}
              >
                Buy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
