import { useCart } from "@/API/cart";
import TitleContent from "@/components/layout/title";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/userStore";
import { Minus, Plus, Trash2 } from "lucide-react";

const MyCart = () => {
  const { mutate } = useCart();
  const user = useAuthStore.getState().user;
  const goCart = () => {
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
  } = useCartStore();
  return (
    <div className="px-12">
      <TitleContent title="My Cart" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
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
                          Price: {item.price.toFixed(2)}$
                        </p>
                        <p className="text-sm text-gray-500">{item.color}</p>
                        <p className="text-sm text-red-500">
                          -{(item.discount - item.price).toFixed(2)}$
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
                <div className="sticky bottom-0 z-10 bg-white">
                  <div className="flex justify-between border-t pt-3 font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalPrice()}</span>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={goCart}>Buy</Button>
                  </div>
                </div>
              </div>
            )}
            {items.length === 0 && (
              <>
                <div className="flex items-center justify-center text-gray-500">
                  Your cart is empty.
                </div>
                {/* <Button onClick={() => setIsOpen(false)}>close</Button> */}
              </>
            )}
          </div>
        </div>

        <div className="col-span-4">Last div</div>
      </div>
    </div>
  );
};

export default MyCart;
