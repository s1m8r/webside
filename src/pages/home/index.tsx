import { Button } from "@/components/ui/button";
import ChlidrenHome from "./children";
import { useNavigate } from "@tanstack/react-router";

const Home = () => {
  const navigation = useNavigate();
  return (
    <>
      <div className="h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat flex justify-end items-center">
        <div className="max-w-2xl space-y-6 mb-48">
          <div>
            <p className="text-4xl font-bold leading-tight md:text-6xl">
              Welcome to <span className="text-orange-500">Samer Store</span>
            </p>

            <p className="max-w-xl text-base leading-7 md:text-lg mb-20">
              Browse thousands of high-quality products from trusted brands at
              competitive prices. Fast, secure, and convenient shopping.
            </p>

            <Button
              className="rounded-full px-8 py-6 text-base font-semibold"
              onClick={() => navigation({ to: "/stores" })}
            >
              Go to Store
            </Button>
          </div>
        </div>
      </div>
      <div className="my-16">
        <ChlidrenHome />
      </div>
    </>
  );
};

export default Home;
