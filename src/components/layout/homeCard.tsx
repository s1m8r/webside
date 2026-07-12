interface Props {
  imgStore: string;
  nameStore: string;
  onClick: () => void;
}

export default function HomeCard({ imgStore, nameStore, onClick }: Props) {
  return (
    <>
      <div
        onClick={onClick}
        className="w-72 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      >
        <img
          src={imgStore}
          alt={nameStore}
          className="w-full h-72 object-cover bg-gray-100"
        />
        <div className="p-4">
          <header className="text-lg font-semibold text-gray-800">
            {nameStore}
          </header>
        </div>
      </div>
    </>
  );
}
