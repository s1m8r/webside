import { useGetCart } from "@/API/cart";
import TitleContent from "@/components/layout/title";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/userStore";
import { useNavigate } from "@tanstack/react-router";

const MyOrders = () => {
  const user = useAuthStore.getState().user?.email;
  const { data } = useGetCart(user ?? "");
  const navigator = useNavigate();

  const orders = data?.data ?? [];

  const totalOrders = orders.length;

  const subtotal = orders.reduce(
    (orderTotal, order) =>
      orderTotal +
      order.data.reduce((total, item) => total + item.price * item.quantity, 0),
    0,
  );

  const total = subtotal;

  return (
    <div className="px-12">
      <TitleContent title="My Orders" />

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <span className="mb-8">No orders yet.</span>

          <Button onClick={() => navigator({ to: "/" })}>Go to Home</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Orders */}
          <div className="px-2 py-4 lg:col-span-8">
            <div className="space-y-5">
              {orders.map((order, index) => {
                const orderTotal = order.data.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0,
                );

                return (
                  <div
                    key={order.id}
                    className="rounded-[20px] border-2 border-gray-300 bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                      <div>
                        <h2 className="font-semibold">
                          Order {(data.pagination.totalItems ?? 0) - index}
                        </h2>

                        <p className="text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                          )}
                        </p>
                      </div>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                        Completed
                      </span>
                    </div>

                    {/* Products */}
                    <div className="space-y-3 py-3">
                      {order.data.map((item) => {
                        const itemTotal = item.price * item.quantity;

                        return (
                          <div
                            key={item.productId}
                            className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-16 w-16 rounded-md object-cover"
                              />

                              <div>
                                <h3 className="font-medium">{item.name}</h3>

                                <p className="text-sm text-gray-500">
                                  Price: ${item.price.toFixed(2)}
                                </p>

                                <p className="text-sm text-gray-500">
                                  Color: {item.color}
                                </p>

                                <p className="text-sm text-gray-500">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="font-semibold">
                                ${itemTotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Order Total */}
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>

                        <span>${orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="px-2 py-4 lg:col-span-4">
            <div className="sticky top-20 h-fit rounded-[20px] border-2 border-gray-300 p-5">
              <h1 className="text-xl font-bold">Order Summary</h1>

              <div className="space-y-2 border-b-2 border-gray-300 py-4">
                {/* Total Orders */}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Orders</span>

                  <span className="text-sm font-bold">{totalOrders}</span>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>

                  <span className="text-sm font-bold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="mt-4 flex justify-between">
                <span className="font-bold">Total</span>

                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
