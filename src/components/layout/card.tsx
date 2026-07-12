import { useGetProducts } from "@/API/product";
import { Button } from "../ui/button";

import { ArrowRight } from "lucide-react";
import OnlyCard from "./onlyCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "@tanstack/react-router";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}
interface Store {
  id: number;
  price?: number;
  name: string;
  image: string;
}

interface title {
  textButton: string;
  onClick: () => void;
}
interface Props {
  title: string;
  items?: Product[] | Store[];
  hasTitle?: title;
  isLoading: boolean;
  type: "stores" | "products";
  storeName?: string;
  page?: number;
}

export default function Card({
  items,
  hasTitle,
  type,
  storeName,
  page = 1,
  title,
}: Props) {
  const { textButton, onClick } = hasTitle ?? {};

  const search = storeName;
  const { data } = useGetProducts(page, search);
  const itemdata: Product[] | Store[] = items ?? data?.data ?? [];
  const navigator = useNavigate();
  return (
    <>
      {itemdata?.length !== 0 && (
        <>
          {hasTitle && (
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

              <Button
                onClick={onClick}
                className="inline-flex items-center gap-1 cursor-pointer hover:gap-2 transition-all"
              >
                {textButton}
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
          <div className="p-4 flex justify-center">
            <Carousel className="w-full max-w-7xl">
              <CarouselContent>
                {itemdata.map((item) => {
                  const onclickGo = () =>
                    type === "products"
                      ? navigator({ to: `/stores/product/${item.id}` })
                      : navigator({ to: `/shops/shop/${item.id}` });
                  return (
                    <CarouselItem key={item.id} className="basis-1/5">
                      <OnlyCard
                        type={type}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        onClick={onclickGo}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </>
      )}
    </>
  );
}
