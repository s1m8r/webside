import { Link, useNavigate } from "@tanstack/react-router";
import OnlyCard from "./onlyCard";
import TextContent from "./textContent";
import { useGetProducts } from "@/API/product";
import TitleContent from "./title";
import { Star } from "lucide-react";
interface Props {
  type: "products" | "stores";
  id: number;
  name: string;
  image: string;
  email: string;
  phone: string;
  website: string;
  categories: string[];
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
  rating: number;
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
}
export default function ContentStore({
  id,
  type,
  name,
  image,
  email,
  phone,
  website,
  categories,
  country,
  state,
  city,
  street,
  zipCode,
  rating,
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
}: Props) {
  const { data } = useGetProducts(1, name);
  const products = data?.data.filter((item) => Number(item.id) !== Number(id));
  const navigator = useNavigate();
  const padding = "p-1";
  return (
    <>
      <div>
        <TitleContent title={name} />
        <div className=" flex mb-24">
          <OnlyCard type={type} id={id} name={name} image={image} />
          <div className="ml-6 mt-6">
            <TextContent header="Name">{name}</TextContent>
            <TextContent header="Email">{email}</TextContent>
            <TextContent header="Store">
              <Link to={website} className="text-blue-700">
                {name} website
              </Link>
            </TextContent>
            <TextContent header="Phone">{phone}</TextContent>
            <TextContent header="Categories">
              {categories.map((categorie, index) => (
                <span key={index}>
                  {categorie}
                  {index < categories.length - 1 && ", "}
                </span>
              ))}
            </TextContent>
            <TextContent header="Address">
              {country} - {state} - {city} - {street} /zipCode: {zipCode}
            </TextContent>
            <TextContent header="Rating">
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-3 py-1 font-semibold text-amber-600">
                {rating}
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </span>
            </TextContent>
            <table className="w-fit border-collapse border border-gray-300 text-center">
              <thead>
                <th className={`${padding}`}>Sunday</th>
                <th className={`${padding}`}>Monday</th>
                <th className={`${padding}`}>Tuesday</th>
                <th className={`${padding}`}>Wednesday</th>
                <th className={`${padding}`}>Thursday</th>
                <th className={`${padding}`}>Friday</th>
                <th className={`${padding}`}>Saturday</th>
              </thead>
              <tbody>
                <td className={`${padding}`}>{sunday}</td>
                <td className={`${padding}`}>{monday}</td>
                <td className={`${padding}`}>{tuesday}</td>
                <td className={`${padding}`}>{wednesday}</td>
                <td className={`${padding}`}>{thursday}</td>
                <td className={`${padding}`}>{friday}</td>
                <td className={`${padding}`}>{saturday}</td>
              </tbody>
            </table>
          </div>
        </div>
        <TitleContent title="Products" isRegister={true} />
        {!products?.length && (
          <div className="flex h-20 items-center justify-center">
            No other items
          </div>
        )}
        {products && (
          <>
            <div className="flex">
              {products.map((item) => (
                <OnlyCard
                  key={item.id}
                  type="products"
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  onClick={() =>
                    navigator({ to: `/stores/product/${item.id}` })
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
