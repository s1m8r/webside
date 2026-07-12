import { Link, useNavigate } from "@tanstack/react-router";
import OnlyCard from "./onlyCard";
import TextContent from "./textContent";
import { useGetProducts } from "@/API/product";
import TitleContent from "./title";
interface Props {
  type: "products" | "stores";
  id: number;
  name: string;
  image: string;
  price: number;
  storeName: string;
  description?: string;
  typeOfProduct?: string;
}
export default function Content({
  id,
  type,
  name,
  image,
  price,
  storeName,
  description,
  typeOfProduct,
}: Props) {
  const { data } = useGetProducts(1, storeName);
  const products = data?.data.filter((item) => Number(item.id) !== Number(id));
  const navigator = useNavigate();
  return (
    <>
      <div>
        <TitleContent title={name} />
        <div className=" flex mb-24">
          <OnlyCard
            type={type}
            id={id}
            name={name}
            image={image}
            price={price}
          />
          <div className="ml-6 mt-6">
            <TextContent header="Name">{name}</TextContent>
            <TextContent header="Description">{description}</TextContent>
            <TextContent header="Store">
              <Link to={"/"} className="text-blue-700">
                {storeName}
              </Link>
            </TextContent>
            <TextContent header="Price">{price}$</TextContent>
            <TextContent header="Type">{typeOfProduct}</TextContent>
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
