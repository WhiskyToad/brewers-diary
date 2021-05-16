import React from "react";

import {
  VStack,
  NumberInput,
  NumberInputField,
  InputRightAddon,
  InputGroup,
  HStack,
  Text,
  Textarea,
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
    <VStack className="center-card">
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

      <Textarea
        placeholder="Mash directions"
        value={recipeData.mashDirections}
        onChange={(e) =>
          setRecipeData({ ...recipeData, mashDirections: e.target.value })
        }
      />
    </VStack>
  );
};

const Boil = ({ recipeData, setRecipeData }) => {
  return (
    <VStack className="center-card">
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

      <Textarea
        placeholder="Boil directions"
        value={recipeData.boilDirections}
        onChange={(e) =>
          setRecipeData({ ...recipeData, boilDirections: e.target.value })
        }
      />
    </VStack>
  );
};

const Ferment = ({ recipeData, setRecipeData }) => {
  return (
    <VStack className="center-card">
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

      <Textarea
        placeholder="Fermentation directions"
        value={recipeData.fermentDirections}
        onChange={(e) =>
          setRecipeData({
            ...recipeData,
            fermentDirections: e.target.value,
          })
        }
      />
    </VStack>
  );
};

const Other = ({ recipeData, setRecipeData }) => {
  return (
    <VStack className="center-card">
      <Text textStyle="heading">Other Directions</Text>

      <Textarea
        placeholder="Other directions"
        value={recipeData.otherDirections}
        onChange={(e) =>
          setRecipeData({ ...recipeData, otherDirections: e.target.value })
        }
      />
    </VStack>
  );
};

export default Directions;
