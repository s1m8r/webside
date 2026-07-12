import { useGetStores } from "@/API/stores";
import Design from "@/components/layout/design";
import HomeCard from "@/components/layout/homeCard";
import { useNavigate } from "@tanstack/react-router";

const Home = () => {
  const { data: dataStores } = useGetStores();
  const navigator = useNavigate();
  return (
    <>
      <div className=" bg-[url('/bgGome.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="h-dvh bg-[url('/chat.png')] bg-repeat-x animate-bg">
          <div className="text-left py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Discover Our Featured Stores
            </h1>
            <p className="text-gray-200 text-sm md:text-base">
              Shop from the best stores and grab exclusive deals waiting for you
            </p>
          </div>
          <div>
            <Design>
              <div className="grid grid-cols-4 gap-2">
                {dataStores?.data.map((item) => (
                  <HomeCard
                    key={item.id}
                    imgStore={item.image}
                    nameStore={item.name}
                    onClick={() =>
                      navigator({
                        to: `/stores/$id`,
                        params: { id: item.id },
                      })
                    }
                  />
                ))}
              </div>
            </Design>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
