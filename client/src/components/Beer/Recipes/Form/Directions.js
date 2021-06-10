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

      <HStack w={{ base: "80%", md: "40%" }} justify="space-evenly" mb="20px">
        <VStack>
          <Text textStyle="headingSmall">Temp</Text>
          <NumberInput value={recipeData.mashTemp} required="required">
            <InputGroup>
              <NumberInputField
                placeholder="0"
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
          <NumberInput value={recipeData.mashLength} required="required">
            <InputGroup>
              <NumberInputField
                placeholder="0"
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
        textAlign="center"
        w="90%"
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
        <NumberInput value={recipeData.boilLength} required="required">
          <InputGroup>
            <NumberInputField
              placeholder="0"
              w="100px"
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
        textAlign="center"
        w="90%"
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

      <HStack w={{ base: "80%", md: "40%" }} justify="space-evenly" mb="20px">
        <VStack>
          <Text textStyle="headingSmall">Temp</Text>
          <NumberInput value={recipeData.fermentTemp} required="required">
            <InputGroup>
              <NumberInputField
                placeholder="0"
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
          <NumberInput value={recipeData.fermentLength} required="required">
            <InputGroup>
              <NumberInputField
                placeholder="0"
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
        textAlign="center"
        w="90%"
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
        textAlign="center"
        w="90%"
        value={recipeData.otherDirections}
        onChange={(e) =>
          setRecipeData({ ...recipeData, otherDirections: e.target.value })
        }
      />
    </VStack>
  );
};

export default Directions;
