import { useGetStores } from "@/API/stores";
import Card from "@/components/layout/card";
import Design from "@/components/layout/design";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const Stores = () => {
  const [page, setPage] = useState(1);

  const { data: dataStores, isLoading } = useGetStores(page);

  const navigator = useNavigate();
  const plusPage = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <>
      <Design>
        {dataStores?.data.map((name) => (
          <Card
            key={name.name}
            title={name.name}
            storeName={name.name}
            hasTitle={{
              textButton: `Go to ${name.name} Store`,
              onClick: () =>
                navigator({
                  to: `/stores/$id`,
                  params: { id: name.id },
                }),
            }}
            isLoading={isLoading}
            type="products"
          />
        ))}
        {dataStores?.pagination.hasNextPage && (
          <button onClick={plusPage}>show More</button>
        )}
      </Design>
    </>
  );
};

export default Stores;
