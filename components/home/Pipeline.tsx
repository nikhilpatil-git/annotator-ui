import { Box, Button, Icon, SimpleGrid } from "@chakra-ui/core";

interface IPipelineItemProps {
  showIcon: boolean;
}
const PipelineItem: React.FC<IPipelineItemProps> = ({ ...props }) => {
  return (
    <SimpleGrid
      gridTemplateColumns="100px 48px"
      alignItems="center"
      justifyItems="center"
    >
      <Button variantColor="gray" variant="solid">
        LEMMA
      </Button>
      <Icon hidden={!props.showIcon} name="chevron-right" size="48px" />
    </SimpleGrid>
  );
};

export const Pipeline = () => {
  return (
    <SimpleGrid
      gridTemplateColumns={"repeat(auto-fit, 140px)"}
      bg="#343c4b"
      boxShadow="5px 5px 10px rgba(0,0,0,0.5)"
      borderRadius={4}
      mb={2}
      p={1}
      justifyContent="center"
      alignItems="center"
    >
      <PipelineItem showIcon={true} />
      <PipelineItem showIcon={true} />
      <PipelineItem showIcon={true} />
      <PipelineItem showIcon={true} />
      <PipelineItem showIcon={false} />
    </SimpleGrid>
  );
};
