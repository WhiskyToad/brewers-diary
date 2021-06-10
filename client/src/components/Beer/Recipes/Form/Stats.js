import React from "react";

import {
  VStack,
  NumberInput,
  NumberInputField,
  InputRightAddon,
  InputGroup,
  Flex,
  Text,
} from "@chakra-ui/react";

const Stats = ({ recipeData, setRecipeData }) => {
  return (
    <VStack className="center-card">
      <Text textStyle="heading">Stats</Text>
      <Flex
        direction={{ base: "column", md: "row" }}
        w="100%"
        justify="space-evenly"
        wrap="wrap"
      >
        <VStack>
          <Text textStyle="headingSmall">Efficiency</Text>
          <NumberInput value={recipeData.efficiency} required="required">
            <InputGroup>
              <NumberInputField
                placeholder="0"
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
          <NumberInput value={recipeData.batchSize} required="required">
            <InputGroup>
              <NumberInputField
                placeholder="0"
                w="60px"
                value={recipeData.batchSize}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, batchSize: e.target.value })
                }
              />
              <InputRightAddon children="L" />
            </InputGroup>
          </NumberInput>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">OG</Text>
          <NumberInput
            w="70px"
            precision={2}
            value={recipeData.targetOG}
            required="required"
          >
            <NumberInputField
              placeholder="0.00"
              value={recipeData.targetOG}
              onChange={(e) =>
                setRecipeData({ ...recipeData, targetOG: e.target.value })
              }
            />
          </NumberInput>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">FG</Text>
          <NumberInput w="70px" value={recipeData.targetFG} required="required">
            <NumberInputField
              placeholder="0.00"
              value={recipeData.targetFG}
              onChange={(e) =>
                setRecipeData({ ...recipeData, targetFG: e.target.value })
              }
            />
          </NumberInput>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">IBUs</Text>
          <NumberInput w="70px" value={recipeData.IBUs} required="required">
            <NumberInputField
              placeholder="0"
              value={recipeData.IBUs}
              onChange={(e) =>
                setRecipeData({ ...recipeData, IBUs: e.target.value })
              }
            />
          </NumberInput>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default Stats;
