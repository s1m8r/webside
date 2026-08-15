import { useGetStores } from "@/API/stores";
// import Card from "@/components/layout/card";
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
        <div>same</div>
      </Design>
    </>
  );
};

export default Stores;
