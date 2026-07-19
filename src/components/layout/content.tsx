import { Link, useNavigate } from "@tanstack/react-router";
import OnlyCard from "./onlyCard";
import TextContent from "./textContent";
import { useGetProducts } from "@/API/product";
import TitleContent from "./title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
interface Props {
  type: "products" | "stores";
  id: number;
  name: string;
  image: string;
  price: number;
  storeName: string;
  images: string[];
  description?: string;
  typeOfProduct?: string;
  storeId?: number;
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
  storeId,
  images,
}: Props) {
  const { data } = useGetProducts(1, storeName);
  const products = data?.data.filter((item) => Number(item.id) !== Number(id));
  const navigator = useNavigate();
  const [open, setOpen] = useState(false);
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
              <Link to={`/stores/${storeId}`} className="text-blue-700">
                {storeName}
              </Link>
            </TextContent>
            <TextContent header="Price">{price}$</TextContent>
            <TextContent header="Type">{typeOfProduct}</TextContent>
            <TextContent header="Imges">
              <div
                className="grid grid-cols-2 gap-2 border-4 rounded-2xl p-2 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                {images.slice(0, 3).map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
                {images.length === 4 && (
                  <img
                    className="w-full h-32 object-cover rounded-md"
                    src={images[3]}
                  />
                )}
                {images.length > 4 && (
                  <div className="relative">
                    <img
                      className="w-full h-32 object-cover rounded-md"
                      src={images[3]}
                    />

                    <div className="absolute inset-0 bg-black/40 rounded-md flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        +{images.length - 4}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </TextContent>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-3xl p-4">
                <Carousel className="w-full">
                  <CarouselContent>
                    {images.map((item) => (
                      <CarouselItem key={item}>
                        <div className="flex items-center justify-center">
                          <img
                            src={item}
                            className="w-full max-h-[70vh] object-contain rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </DialogContent>
            </Dialog>
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
