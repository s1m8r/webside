import ShowProduct from "@/components/layout/showproduct";
import { Button } from "@/components/ui/button";
import { ProdectScema } from "@/schemas/product";
import z from "zod";

type ProductFormData = z.infer<typeof ProdectScema>;

interface Props {
  title: string;
  product: ProductFormData[];
  goToShow?: () => void;
}

export default function ProductsHome({ title, product, goToShow }: Props) {
  return (
    <section className="container py-10 flex flex-col items-center space-y-8 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{title.toUpperCase()}</h1>
      </div>

      {product.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {product.map((item) => (
            <ShowProduct
              key={item.id}
              color={item.images[0].color}
              id={item.id!}
              img={item.image}
              name={item.name}
              rating={item.rating}
              price={item.price}
              discountPercentage={item.discountPercentage}
            />
          ))}
        </div>
      )}
      <Button
        variant="outline"
        className="w-fit px-12 rounded-full"
        onClick={goToShow}
      >
        View All
      </Button>
    </section>
  );
}
