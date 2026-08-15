import { useGetColors } from "@/API/colors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Filter } from "lucide-react";
import { useState } from "react";
import TitleContent from "./title";
import ShowProduct from "./showproduct";
import { ProdectScema } from "@/schemas/product";
import z from "zod";
interface Props {
  title: string;
  products: z.infer<typeof ProdectScema>[];
  setColor: React.Dispatch<React.SetStateAction<string>>;
}
export default function StoreUi({ title, products, setColor }: Props) {
  const [selectedColor, setSelectedColor] = useState("");
  const checkColor = (color: string) => {
    const newColor = selectedColor === color ? "" : color;
    setSelectedColor(newColor);
    setColor(newColor);
  };
  const { data: colors } = useGetColors();

  return (
    <div className="px-12 flex">
      <div className="sticky top-16 self-start border-2 px-4 py-6 mb-2 rounded-[20px] w-fit h-fit">
        <div className="flex justify-between items-center">
          <span className=" font-bold">Filters</span>
          <span>
            <Filter size={16} />
          </span>
        </div>
        <Accordion type="multiple" className="w-3xs">
          <AccordionItem value="T-shirts">
            <AccordionTrigger>T-shirts</AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="Shorts">
            <AccordionTrigger>Shorts</AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="Shirts">
            <AccordionTrigger>Shirts</AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="Shirts">
            <AccordionTrigger>Shirts</AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="Hoodie">
            <AccordionTrigger>Hoodie</AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="Jeans">
            <AccordionTrigger>Jeans</AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="Price">
            <AccordionTrigger>Price</AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="Colors">
            <AccordionTrigger>Colors</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-6 gap-2">
                {colors?.data.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => checkColor(item.color)}
                    style={{ backgroundColor: item.color }}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      selectedColor === item.color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedColor === item.color && (
                      <span className="text-sm font-bold text-white">
                        <Check />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <div>
          <TitleContent title={title ?? ""} isRegister={true} />
        </div>
        <div className=" grid grid-cols-4 gap-4 px-8">
          {products?.map((item) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
