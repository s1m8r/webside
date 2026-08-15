// import { useCartStore } from "@/stores/cartStore";
// import { Minus, Plus } from "lucide-react";
// import { Button } from "../ui/button";
// interface Props {
//   type: "stores" | "products";
//   id: number;
//   name: string;
//   image: string;
//   price?: number;
//   onClick?: () => void;
// }

// export default function OnlyCard({
//   type,
//   id,
//   name,
//   image,
//   price = 0,
//   onClick,
// }: Props) {
//   const addToCart = useCartStore((state) => state.addToCart);
//   const {
//     items: cartItems,
//     decreaseQuantity,
//     increaseQuantity,
//   } = useCartStore();
//   const cartItem = cartItems.find((item) => item.productId === id);
//   return (
//     <>
//       <div className="cursor-pointer h-77 w-60 mx-1 my-4 rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-52 object-cover"
//           onClick={onClick}
//         />
//         <div className="p-4">
//           <h2
//             className="text-base font-semibold text-gray-800 cursor-pointer"
//             onClick={onClick}
//           >
//             {name}
//           </h2>

//           <div className="mt-3 flex items-center justify-between">
//             <span className="text-xl font-bold text-black">
//               {type === "products" ? `${price}$` : ""}
//             </span>
//             {type === "products" && (
//               <>
//                 {cartItem ? (
//                   <>
//                     <div
//                       className="flex items-center gap-2"
//                       key={cartItem.productId}
//                     >
//                       <button
//                         onClick={() => decreaseQuantity(cartItem.productId)}
//                         className="w-4 h-4 rounded border hover:bg-gray-100"
//                       >
//                         <Minus size={12} className="mx-auto" />
//                       </button>
//                       <span className="w-3 text-center">
//                         {cartItem.quantity}
//                       </span>
//                       <button
//                         onClick={() => increaseQuantity(cartItem.productId)}
//                         className="w-4 h-4 rounded border hover:bg-gray-100"
//                       >
//                         <Plus size={12} className="mx-auto" />
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <Button
//                     size="sm"
//                     className="rounded-full px-5"
//                     onClick={() =>
//                       addToCart({
//                         productId: id,
//                         name: name,
//                         image: image,
//                         price: price,
//                         quantity: 1,
//                       })
//                     }
//                   >
//                     Buy
//                   </Button>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
