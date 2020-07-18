import {
  SimpleGrid,
  Text,
  Flex,
  Tag,
  TagIcon,
  TagLabel,
  TagCloseButton,
  theme,
} from "@chakra-ui/core";
import { useEffect, useState } from "react";

interface IWordsListProps {
  words: string[];
}

export const Sentence = () => {
  const words: string[] = "The first argument specifies the number of repetitions. The second argument is a track list, which is repeated that number of times.".split(
    " "
  );

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleFocus = (index: number) => {
    // event.preventDefault();
    console.log("selected " + index);
    setSelectedIndex(() => index);
  };

  useEffect(() => {
    console.log("remove all ranges");
    var s = window.getSelection();
    if (s) {
      s.removeAllRanges();
    }
  }, [selectedIndex]);

  const wordsList = words.map((item: string, index: number) => {
    return (
      <Text
        bg={selectedIndex == index ? "rgba(255,225,132,1.0)" : "white"}
        p={1}
        key={index}
        fontSize="lg"
      >
        <Flex
          align="center"
          justify="center"
          direction={"row"}
          wrap={"wrap"}
          onMouseUp={() => handleFocus(index)}
        >
          {item}{" "}
          {selectedIndex == index && (
            <Tag
              fontWeight={"bold"}
              size={"md"}
              key={"sm"}
              color="primary.green"
              bg={"rgba(255,225,132,1.0)"}
            >
              <TagLabel>PERSON</TagLabel>
              <TagCloseButton
                _focus={{
                  outline: 0,
                }}
                outline={0}
                onClick={() => setSelectedIndex(() => -1)}
              />
            </Tag>
          )}
        </Flex>
      </Text>
    );
  });

  return (
    <Flex
      align="center"
      direction={"row"}
      wrap={"wrap"}
      bg="white"
      color="black"
      p={4}
    >
      {wordsList}
    </Flex>
  );
};

// <SimpleGrid
//   bg="white"
//   color="black"
//   gridTemplateColumns={"repeat(auto-fill, minmax(0, 200px))"}
//   gridTemplateRows={"30px"}
//   p={4}
//   gridColumnGap={2}
// ></SimpleGrid>
