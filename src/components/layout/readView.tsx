import { useGetreviews } from "@/API/reviews";
import Rating from "./rading";
interface Props {
  id: number;
  name: string;
  storeName: string;
}
export default function ReadView({ id, name, storeName }: Props) {
  const search = id + name + storeName;
  const { data: myReviews } = useGetreviews(search);
  return (
    <div className="grid grid-cols-2 gap-4">
      {myReviews?.data.map((item) => (
        <div
          className="border-2 flex p-4 rounded-[12px] gap-4 col-span-2 md:col-span-1"
          key={item.id}
        >
          <div className="flex flex-col justify-between">
            <div key={item.id} className="">
              <div>
                <Rating rating={item.rating} type="main" />
              </div>
              <div className="font-bold">{item.name}</div>
              <div>{item.textreview}</div>
            </div>
            <div className="text-gray-400 text-sm">
              Posted on:
              {new Date(item.createdAt!).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
