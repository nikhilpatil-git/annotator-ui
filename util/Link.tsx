import Link from "next/link";

interface IProps {
  url: string;
  key?: number;
}

export const CustomLink: React.FunctionComponent<IProps> = ({
  children,
  ...props
}) => {
  return (
    <Link key={props.key} href={props.url}>
      <a style={{ textDecoration: "none" }}>{children}</a>
    </Link>
  );
};
