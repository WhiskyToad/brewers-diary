import React from "react";

import {
  VStack,
  NumberInput,
  NumberInputField,
  InputRightAddon,
  InputGroup,
  HStack,
  Text,
} from "@chakra-ui/react";

const Stats = ({ recipeData, setRecipeData }) => {
  return (
    <VStack
      maxW="950px"
      mx="auto"
      my="20px"
      p="20px"
      bg="white"
      border="1px solid black"
      borderRadius="4px"
    >
      <Text textStyle="heading">Stats</Text>
      <HStack
        w="100%"
        justify="space-evenly"
        textStyle="descriptive"
        wrap="wrap"
      >
        <VStack>
          <Text textStyle="headingSmall">Efficiency</Text>
          <NumberInput value={recipeData.efficiency}>
            <InputGroup>
              <NumberInputField
                w="70px"
                value={recipeData.efficiency}
                onChange={(e) =>
                  setRecipeData({
                    ...recipeData,
                    efficiency: e.target.value,
                  })
                }
              />
              <InputRightAddon children="%" />
            </InputGroup>
          </NumberInput>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">Batch Size</Text>
          <NumberInput value={recipeData.batchSize}>
            <InputGroup>
              <NumberInputField
                w="60px"
                value={recipeData.batchSize}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, batchSize: e.target.value })
                }
                placeholder="Batch Size"
              />
              <InputRightAddon children="Litres" />
            </InputGroup>
          </NumberInput>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">OG</Text>
          <NumberInput w="70px" precision={2} value={recipeData.targetOG}>
            <InputGroup>
              <NumberInputField
                value={recipeData.targetOG}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, targetOG: e.target.value })
                }
              />
            </InputGroup>
          </NumberInput>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">FG</Text>
          <NumberInput w="70px" precision={2} value={recipeData.targetFG}>
            <InputGroup>
              <NumberInputField
                precision={2}
                value={recipeData.targetFG}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, targetFG: e.target.value })
                }
              />
            </InputGroup>
          </NumberInput>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">IBUs</Text>
          <NumberInput w="70px" value={recipeData.IBUs}>
            <InputGroup>
              <NumberInputField
                value={recipeData.IBUs}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, IBUs: e.target.value })
                }
                placeholder="0"
              />
            </InputGroup>
          </NumberInput>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Stats;
