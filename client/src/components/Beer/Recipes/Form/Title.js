import React from "react";
import FileBase from "react-file-base64";

import {
  Text,
  VStack,
  Image,
  Select,
  NumberInput,
  NumberInputField,
  InputGroup,
  HStack,
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
  Textarea,
  Spacer,
} from "@chakra-ui/react";

const Title = ({ recipeData, setRecipeData }) => {
  return (
    <VStack className="center-card">
      <Editable textStyle="heading" value={recipeData.title}>
        <EditablePreview />
        <EditableInput
          onChange={(e) =>
            setRecipeData({ ...recipeData, title: e.target.value })
          }
        />
      </Editable>
      <Flex
        direction={{ base: "column", md: "row" }}
        w="97%"
        mx="auto"
        justify="space-between"
      >
        <VStack
          w={{ base: "100%", md: "50%" }}
          minH="300px"
          justify="space-evenly"
        >
          <Image
            h="250px"
            borderRadius="10px"
            fit="cover"
            src={recipeData.selectedFile}
          />
          <FileBase
            mb="20px"
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setRecipeData({ ...recipeData, selectedFile: base64 })
            }
          />
        </VStack>
        <Spacer />

        <VStack w={{ base: "100%", md: "50%" }} minH="280px" textAlign="center">
          <HStack
            w={{ base: "100%", md: "50%" }}
            my={{ base: "10px", md: 0 }}
            justify="space-evenly"
            textStyle="headingSmall"
          >
            <VStack>
              <Text>ABV</Text>
              <NumberInput value={recipeData.targetABV}>
                <InputGroup>
                  <NumberInputField
                    w="50px"
                    value={recipeData.targetABV}
                    onChange={(e) =>
                      setRecipeData({
                        ...recipeData,
                        targetABV: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </NumberInput>
            </VStack>

            <VStack>
              <Text>Style</Text>
              <Select
                w="100px"
                onChange={(e) =>
                  setRecipeData({ ...recipeData, style: e.target.value })
                }
              >
                <option value="IPA">IPA</option>
                <option value="DIPA">DIPA</option>
                <option value="PORTER">PORTER</option>
                <option value="STOUT">STOUT</option>
                <option value="SOUR">SOUR</option>
              </Select>
            </VStack>

            <VStack>
              <Text>Method</Text>
              <Select
                w="100px"
                onChange={(e) =>
                  setRecipeData({ ...recipeData, method: e.target.value })
                }
              >
                <option value="All Grain">All Grain</option>
                <option value="Extract">Extract</option>
              </Select>
            </VStack>
          </HStack>

          <Textarea
            placeholder="Enter description"
            textAlign="center"
            h="150px"
            w="90%"
            value={recipeData.description}
            onChange={(e) =>
              setRecipeData({ ...recipeData, description: e.target.value })
            }
          />
        </VStack>
      </Flex>
    </VStack>
  );
};

export default Title;
