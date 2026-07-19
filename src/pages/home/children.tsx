import { useGetStores } from "@/API/stores";
import Design from "@/components/layout/design";
import { useNavigate } from "@tanstack/react-router";

const ChlidrenHome = () => {
  const { data: dataStores } = useGetStores();
  const navigator = useNavigate();
  return (
    <Design>
      <div className="grid gap-14 md:grid-cols-2 xl:grid-cols-4 cursor-pointer">
        {dataStores?.data.map((item) => (
          <div
            className="relative inline-block rounded-xl h-56"
            key={item.id}
            onClick={() => navigator({ to: `/stores/${item.id}` })}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 rounded bg-gray-500/40"></div>

            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white drop-shadow-lg">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </Design>
  );
};

export default ChlidrenHome;
