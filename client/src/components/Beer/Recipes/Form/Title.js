import React from "react";
import FileBase from "react-file-base64";

import {
  VStack,
  Image,
  Spacer,
  Select,
  NumberInput,
  NumberInputField,
  InputRightAddon,
  InputGroup,
  HStack,
  Editable,
  EditableInput,
  EditablePreview,
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
      <HStack
        w="100%"
        h="350px"
        alignSelf="center"
        borderRadius="lg"
        overflow="hidden"
      >
        <HStack
          w={["100%", "100%", "90%", "90%"]}
          mx="auto"
          align="flex-start"
          justify="space-between"
        >
          <VStack>
            <Image
              h={["150px", "150px", "250px", "250px"]}
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

          <VStack w="50%" h="275px" m="10px" textAlign="center" spacing={4}>
            <HStack justify="space-evenly" textStyle="headingSmall" wrap="wrap">
              <NumberInput value={recipeData.targetABV}>
                <InputGroup>
                  <NumberInputField
                    w={["50px", "50px", "100px", "100px"]}
                    value={recipeData.targetABV}
                    onChange={(e) =>
                      setRecipeData({
                        ...recipeData,
                        targetABV: e.target.value,
                      })
                    }
                  />
                  <InputRightAddon children="% ABV" />
                </InputGroup>
              </NumberInput>

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

              <Select
                w="100px"
                onChange={(e) =>
                  setRecipeData({ ...recipeData, method: e.target.value })
                }
              >
                <option value="All Grain">All Grain</option>
                <option value="Extract">Extract</option>
              </Select>
            </HStack>

            <Editable
              px="15px"
              textStyle="descriptive"
              value={recipeData.description}
            >
              <EditableInput
                onChange={(e) =>
                  setRecipeData({ ...recipeData, description: e.target.value })
                }
              />
              <EditablePreview />
            </Editable>
            <Spacer />
          </VStack>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default Title;
