// import { useNavigate } from "@tanstack/react-router";
// import OnlyCard from "./onlyCard";
// import TextContent from "./textContent";
// import { useGetProducts } from "@/API/product";
// import TitleContent from "./title";
// import { PlusCircle, Star } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";

// interface Props {
//   type: "products" | "stores";
//   id: number;
//   name: string;
//   image: string;
//   email: string;
//   phone: string;
//   website: string;
//   categories: string[];
//   country: string;
//   state: string;
//   city: string;
//   street: string;
//   zipCode: string;
//   rating: number;
//   sunday: string;
//   monday: string;
//   tuesday: string;
//   wednesday: string;
//   thursday: string;
//   friday: string;
//   saturday: string;
// }

// export default function ContentStore({
//   id,
//   type,
//   name,
//   image,
//   email,
//   phone,
//   website,
//   categories,
//   country,
//   state,
//   city,
//   street,
//   zipCode,
//   rating,
//   sunday,
//   monday,
//   tuesday,
//   wednesday,
//   thursday,
//   friday,
//   saturday,
// }: Props) {
//   const [page, setPage] = useState(1);
//   const { data } = useGetProducts(page, name);

//   const products = useMemo(
//     () =>
//       data?.data.filter(
//         (item) => !(type === "products" && Number(item.id) === Number(id)),
//       ),
//     [data, id, type],
//   );

//   const [dataProduct, setDataProduct] = useState<typeof products>([]);

//   useEffect(() => {
//     if (!products) return;

//     setDataProduct((prev) => {
//       const base = page === 1 ? [] : (prev ?? []);
//       const merged = [...base, ...products];

//       return Array.from(new Map(merged.map((p) => [p.id, p])).values());
//     });
//   }, [products, page]);

//   const navigator = useNavigate();
//   const padding = "p-1";

//   return (
//     <>
//       <div>
//         <TitleContent title={name} />
//         <div className=" flex mb-24">
//           <OnlyCard type={type} id={id} name={name} image={image} />
//           <div className="ml-6 mt-6">
//             <TextContent header="Name">{name}</TextContent>
//             <TextContent header="Email">{email}</TextContent>
//             <TextContent header="Store">
//               <a
//                 href={website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-700"
//               >
//                 {name} website
//               </a>
//             </TextContent>
//             <TextContent header="Phone">{phone}</TextContent>
//             <TextContent header="Categories">
//               {categories.map((categorie, index) => (
//                 <span key={index}>
//                   {categorie}
//                   {index < categories.length - 1 && ", "}
//                 </span>
//               ))}
//             </TextContent>
//             <TextContent header="Address">
//               {country} - {state} - {city} - {street} /zipCode: {zipCode}
//             </TextContent>
//             <TextContent header="Rating">
//               <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-3 py-1 font-semibold text-amber-600">
//                 {rating}
//                 <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
//               </span>
//             </TextContent>
//             <table className="w-fit border-collapse border border-gray-300 text-center">
//               <thead>
//                 <tr>
//                   <th className={`${padding}`}>Sunday</th>
//                   <th className={`${padding}`}>Monday</th>
//                   <th className={`${padding}`}>Tuesday</th>
//                   <th className={`${padding}`}>Wednesday</th>
//                   <th className={`${padding}`}>Thursday</th>
//                   <th className={`${padding}`}>Friday</th>
//                   <th className={`${padding}`}>Saturday</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className={`${padding}`}>{sunday}</td>
//                   <td className={`${padding}`}>{monday}</td>
//                   <td className={`${padding}`}>{tuesday}</td>
//                   <td className={`${padding}`}>{wednesday}</td>
//                   <td className={`${padding}`}>{thursday}</td>
//                   <td className={`${padding}`}>{friday}</td>
//                   <td className={`${padding}`}>{saturday}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <TitleContent title="Products" isRegister={true} />
//         {!dataProduct?.length && (
//           <div className="flex h-20 items-center justify-center">
//             No other items
//           </div>
//         )}
//         {!!dataProduct?.length && (
//           <>
//             <div className="flex mb-4">
//               {dataProduct.map((item) => (
//                 <OnlyCard
//                   key={item.id}
//                   type="products"
//                   id={item.id}
//                   name={item.name}
//                   image={item.image}
//                   price={item.price}
//                   onClick={() =>
//                     navigator({ to: `/stores/product/${item.id}` })
//                   }
//                 />
//               ))}
//             </div>
//             {data?.pagination.hasNextPage && (
//               <p
//                 onClick={() => setPage((p) => p + 1)}
//                 className="flex justify-center cursor-pointer mb-10"
//               >
//                 <PlusCircle />
//               </p>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }
