import { useGetProduct } from "@/API/product";
import Content from "@/components/layout/content";
import Design from "@/components/layout/design";
import { Route } from "@/routes/(proteced)/stores/product/$id";

const Product = () => {
  const { id } = Route.useParams();
  const { data } = useGetProduct(id);
  return (
    <Design>
      <div>
        {data && (
          <Content
            images={data.images}
            storeId={data.storeId}
            id={data.id}
            type="products"
            name={data.name}
            image={data.image}
            price={data.price}
            storeName={data.storeName}
            description={data.description}
            typeOfProduct={data.type}
          />
        )}
      </div>
    </Design>
  );
};

export default Product;
