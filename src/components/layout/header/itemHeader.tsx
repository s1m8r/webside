import { Link } from "@tanstack/react-router";
interface Props {
  children: string;
  link: string;
}

export default function Items({ children, link }: Props) {
  return (
    <Link
      to={link}
      className="mx-3 relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"

      activeProps={{
        className: "text-orange-500 after:w-full",
      }}
    >
      {children.toUpperCase()}
    </Link>
  );
}
