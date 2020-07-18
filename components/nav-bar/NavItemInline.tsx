import { Stack, Text, Grid, Link as CLink } from "@chakra-ui/core";
import Link from "next/link";
import { NavItems, NavItem } from "../../util/Data";
import { CustomLink } from "../../util/Link";

export const NavItemsInline = () => {
  const navItems = NavItems.map((item: NavItem, index: number) => {
    return (
      <CustomLink key={index} url={item.link}>
        <Text color="white" fontWeight="bold" fontSize="md">
          {item.text}
        </Text>
      </CustomLink>
    );
  });
  return (
    <>
      <Grid
        columnGap="2rem"
        justifyItems="center"
        gridTemplateColumns={"auto repeat(3, 100px)"}
      >
        {navItems}
      </Grid>
    </>
  );
};
