import { Link } from "@mui/material";
import NextLink from "next/link";

// Router
import { useRouter } from "next/router";

interface Props {
  href: string;
  children: React.ReactNode;
}

const ActiveLink = ({ children, href }: Props) => {
  const { asPath } = useRouter();

  return (
    <NextLink href={href} passHref>
      <Link
        className={
          asPath === href ? "navbar-link active-navbar" : "navbar-link"
        }
      >
        {children}
      </Link>
    </NextLink>
  );
};

export { ActiveLink };
