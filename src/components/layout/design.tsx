interface Props {
  children: React.ReactNode;
}

export default function Design({ children }: Props) {
  return <div className="pl-8 pr-8 pt-4">{children}</div>;
}
