import React from "react";

import {
  VStack,
  NumberInput,
  NumberInputField,
  InputRightAddon,
  InputGroup,
  HStack,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

const Directions = ({ recipeData, setRecipeData }) => {
  return (
    <>
      <Mash recipeData={recipeData} setRecipeData={setRecipeData} />
      <Boil recipeData={recipeData} setRecipeData={setRecipeData} />
      <Ferment recipeData={recipeData} setRecipeData={setRecipeData} />
      <Other recipeData={recipeData} setRecipeData={setRecipeData} />
    </>
  );
};

const Mash = ({ recipeData, setRecipeData }) => {
  return (
    <VStack
      my="20px"
      p="20px"
      maxW="950px"
      mx="auto"
      bg="white"
      border="1px solid black"
      borderRadius="4px"
      textStyle="descriptive"
    >
      <Text textStyle="heading">The Mash</Text>

      <HStack w={{ base: "60%", md: "40%" }} justify="space-evenly" mb="20px">
        <VStack>
          <Text textStyle="headingSmall">Temp</Text>
          <NumberInput value={recipeData.mashTemp}>
            <InputGroup>
              <NumberInputField
                value={recipeData.mashTemp}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, mashTemp: e.target.value })
                }
              />
              <InputRightAddon children="°C" />
            </InputGroup>
          </NumberInput>
        </VStack>
        <VStack>
          <Text textStyle="headingSmall">Length</Text>
          <NumberInput value={recipeData.mashLength}>
            <InputGroup>
              <NumberInputField
                value={recipeData.mashLength}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, mashLength: e.target.value })
                }
              />
              <InputRightAddon children="mins" />
            </InputGroup>
          </NumberInput>
        </VStack>
      </HStack>
      <Text textStyle="headingSmall">Mash Directions</Text>
      <Editable textStyle="descriptive" value={recipeData.mashDirections}>
        <EditableInput
          onChange={(e) =>
            setRecipeData({ ...recipeData, mashDirections: e.target.value })
          }
        />
        <EditablePreview />
      </Editable>
    </VStack>
  );
};

const Boil = ({ recipeData, setRecipeData }) => {
  return (
    <VStack
      my="20px"
      p="20px"
      maxW="950px"
      mx="auto"
      bg="white"
      border="1px solid black"
      borderRadius="4px"
      textStyle="descriptive"
    >
      <Text textStyle="heading">The Boil</Text>

      <VStack w={{ base: "60%", md: "40%" }} justify="space-evenly" mb="20px">
        <Text textStyle="headingSmall">Length</Text>
        <NumberInput value={recipeData.boilLength}>
          <InputGroup>
            <NumberInputField
              value={recipeData.boilLength}
              onChange={(e) =>
                setRecipeData({ ...recipeData, boilLength: e.target.value })
              }
            />
            <InputRightAddon children="mins" />
          </InputGroup>
        </NumberInput>
      </VStack>
      <Text textStyle="headingSmall">Boil Directions</Text>
      <Editable textStyle="descriptive" value={recipeData.boilDirections}>
        <EditableInput
          onChange={(e) =>
            setRecipeData({ ...recipeData, boilDirections: e.target.value })
          }
        />
        <EditablePreview />
      </Editable>
    </VStack>
  );
};

const Ferment = ({ recipeData, setRecipeData }) => {
  return (
    <VStack
      my="20px"
      p="20px"
      maxW="950px"
      mx="auto"
      bg="white"
      border="1px solid black"
      borderRadius="4px"
      textStyle="descriptive"
    >
      <Text textStyle="heading">The Ferment</Text>

      <HStack w={{ base: "60%", md: "40%" }} justify="space-evenly" mb="20px">
        <VStack>
          <Text textStyle="headingSmall">Temp</Text>
          <NumberInput value={recipeData.fermentTemp}>
            <InputGroup>
              <NumberInputField
                value={recipeData.fermentTemp}
                onChange={(e) =>
                  setRecipeData({
                    ...recipeData,
                    fermentTemp: e.target.value,
                  })
                }
              />
              <InputRightAddon children="°C" />
            </InputGroup>
          </NumberInput>
        </VStack>
        <VStack>
          <Text textStyle="headingSmall">Length</Text>
          <NumberInput value={recipeData.fermentLength}>
            <InputGroup>
              <NumberInputField
                value={recipeData.fermentLength}
                onChange={(e) =>
                  setRecipeData({
                    ...recipeData,
                    fermentLength: e.target.value,
                  })
                }
              />
              <InputRightAddon children="days" />
            </InputGroup>
          </NumberInput>
        </VStack>
      </HStack>
      <Text textStyle="headingSmall">Fermenting Directions</Text>
      <Editable textStyle="descriptive" value={recipeData.fermentDirections}>
        <EditableInput
          onChange={(e) =>
            setRecipeData({
              ...recipeData,
              fermentDirections: e.target.value,
            })
          }
        />
        <EditablePreview />
      </Editable>
    </VStack>
  );
};

const Other = ({ recipeData, setRecipeData }) => {
  return (
    <VStack
      my="20px"
      p="20px"
      maxW="950px"
      mx="auto"
      bg="white"
      border="1px solid black"
      borderRadius="4px"
      textStyle="descriptive"
    >
      <Text textStyle="heading">Other Directions</Text>
      <Editable textStyle="descriptive" value={recipeData.otherDirections}>
        <EditableInput
          onChange={(e) =>
            setRecipeData({ ...recipeData, otherDirections: e.target.value })
          }
        />
        <EditablePreview />
      </Editable>
    </VStack>
  );
};

export default Directions;
