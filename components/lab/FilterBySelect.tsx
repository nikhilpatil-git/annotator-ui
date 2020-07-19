import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/core";
import { useState } from "react";

export interface Iprops {
  placeholder: string;
}

export const FilterBySelect: React.FunctionComponent = () => {
  const [filter, setFilter] = useState("Filter By Category");
  const categories = () => {
    const data: string[] = ["Data Science", "SQL", "ML"];
    return data.map((data: string, index: number) => {
      return (
        <MenuItem
          key={index}
          onClick={() => {
            setFilter(() => data);
          }}
        >
          {data}
        </MenuItem>
      );
    });
  };
  return (
    <Menu>
      <MenuButton as={Button} w="200px">
        {filter}
      </MenuButton>
      <MenuList>{categories}</MenuList>
    </Menu>
  );
};

// <Button
//   w="200px"
//   _focus={{
//     outline: 0,
//   }}
//   rightIcon="chevron-down"
//   variant="solid"
//   justifyContent="space-between"
// ></Button>;
