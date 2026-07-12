import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
interface Props {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "destructive";
  size?: "default" | "xs" | "sm" | "lg";
  backgroundColor?: "default";
  onClick?: () => void;
  disabled?: boolean;
  isPending?: boolean;
  type: "normal" | "button";
}
export default function ButtonChlidren({
  children,
  variant = "default",
  size = "default",
  backgroundColor = "default",
  onClick,
  type,
  isPending,
  disabled,
}: Props) {
  const base =
    " flex items-center justify-center font-medium transition disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";
  const style = {
    default: "bg-orange-500 text-white hover:bg-orange-400 ",
  };
  return (
    <>
      {type === "normal" && (
        <Button
          variant={variant}
          size={size}
          className={`${base} ${style[backgroundColor]}`}
          onClick={onClick}
        >
          {children}
        </Button>
      )}
      {type === "button" && (
        <Button
          variant={variant}
          size={size}
          className={`${variant} w-full cursor-pointer`}
          onClick={onClick}
          disabled={disabled}
        >
          {isPending ? (
            <>
              <Spinner data-icon="inline-start" />
              {children}
            </>
          ) : (
            children
          )}
        </Button>
      )}
    </>
  );
}
