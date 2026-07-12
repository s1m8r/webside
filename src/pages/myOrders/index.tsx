import { useGetCart } from "@/API/cart";
import { useAuthStore } from "@/stores/userStore";

const MyOrders = () => {
  const user = useAuthStore.getState().user?.email;
  const { data } = useGetCart(user ?? "xxxxxx");

  return (
    <div className="max-w-md mx-auto bg-white p-2 rounded-2xl">
      {!data?.data.length && (
        <p className="text-center text-gray-400 py-10 text-sm">No orders yet</p>
      )}

      {data?.data.map((order) => {
        const total = order.data.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );

        return (
          <div key={order.id} className="mb-6 last:mb-0">
            <div className="flex items-baseline justify-between pb-2 border-b border-gray-300">
              <span className="text-sm font-medium">Order #{order.id}</span>
              <span className="text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleDateString("en-US")}
              </span>
            </div>

            {order.data.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-3 py-2 border-b border-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-9 h-9 rounded-sm object-cover"
                />
                <span className="flex-1 text-sm">{item.name}</span>
                <span className="text-sm text-gray-400 w-10 text-center">
                  x{item.quantity}
                </span>
                <span className="text-sm w-12 text-right">${item.price}</span>
              </div>
            ))}

            <div className="flex justify-between pt-2">
              <span className="text-sm text-gray-500">Total</span>
              <span className="text-sm font-medium">${total}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
