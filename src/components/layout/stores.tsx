import { Filter } from "lucide-react";
import TitleContent from "./title";
import ShowProduct from "./showproduct";
import { ProdectScema } from "@/schemas/product";
import z from "zod";
import AccordionStore from "./accordionStore";
import { useState } from "react";
interface Props {
  title: string;
  products: z.infer<typeof ProdectScema>[];
  setColor: React.Dispatch<React.SetStateAction<string>>;
}
export default function StoreUi({ title, products, setColor }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-12 grid grid-cols-12 ">
      <div className="hidden sticky col-span-2 top-16 self-start border-2 px-4 py-6 mb-2 rounded-[20px] h-fit md:block">
        <div className="flex justify-between items-center">
          <span className=" font-bold">Filters</span>
          <span>
            <Filter size={16} />
          </span>
        </div>
        <AccordionStore setColor={setColor} />
      </div>
      <div className=" col-span-12 md:col-span-10">
        <div className="flex justify-between">
          <TitleContent title={title ?? ""} isRegister={true} />
          <div onClick={() => setOpen(!open)} className="block md:hidden">
            <Filter size={20} />
          </div>
        </div>
        <div className="block md:hidden">
          {open && (
            <>
              <AccordionStore setColor={setColor} />
            </>
          )}
        </div>
        <div className="grid grid-cols-12 gap-4 px-8">
          {products?.map((item) => (
            <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3">
              <ShowProduct
                key={item.id}
                id={item.id!}
                img={item.image}
                name={item.name}
                rating={item.rating}
                price={item.price}
                color={item.images[0].color}
                discountPercentage={item.discountPercentage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
