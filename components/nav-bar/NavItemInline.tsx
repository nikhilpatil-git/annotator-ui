import { Stack, Text, Link } from "@chakra-ui/core";
import { NavItems, NavItem } from "../../util/Data";

export const NavItemsInline = () => {
  const navItems = NavItems.map((item: NavItem, index: number) => {
    return (
      <Link key={index} href={item.link} style={{ textDecoration: "none" }}>
        <Text color="white" fontWeight="bold" fontSize="lg">
          {item.text}
        </Text>
      </Link>
    );
  });
  return (
    <>
      <Stack isInline spacing={8}>
        {navItems}
      </Stack>
    </>
  );
};
