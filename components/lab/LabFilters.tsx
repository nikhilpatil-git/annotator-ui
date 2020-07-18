import { Grid, Tabs, TabList, Tab } from "@chakra-ui/core";
import { FilterBySelect } from "./FilterBySelect";

export const FilterByTabs = () => {
  return (
    <Tabs>
      <TabList>
        <Tab
          _focus={{
            outline: 0,
          }}
        >
          One
        </Tab>
        <Tab
          _focus={{
            outline: 0,
          }}
        >
          Two
        </Tab>
        <Tab
          _focus={{
            outline: 0,
          }}
        >
          Three
        </Tab>
      </TabList>
    </Tabs>
  );
};

export const LabFilters = () => {
  return (
    <Grid
      boxShadow="5px 5px 10px rgba(0,0,0,0.5)"
      borderRadius={4}
      justifyItems="center"
      alignItems="center"
      p={5}
      gridTemplateColumns="repeat(3, 1fr)"
    >
      <FilterByTabs />
      <FilterBySelect />
      <FilterBySelect />
    </Grid>
  );
};
