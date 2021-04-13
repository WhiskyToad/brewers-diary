import React, { useState } from "react";

import { DeleteIcon } from "@chakra-ui/icons";
import {
  VStack,
  Input,
  NumberInput,
  NumberInputField,
  InputRightAddon,
  InputGroup,
  HStack,
  Button,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

const Ingredients = ({ recipeData, setRecipeData }) => {
  //saving inputs to push to recipeData
  const [others, setOthers] = useState("");
  const [malt, setMalt] = useState({ name: "", grams: 0 });
  const [hop, setHop] = useState({
    name: "",
    grams: 0,
    minutes: 0,
    alphaAcids: 0,
    additionalInfo: "",
  });

  //adds malt to schema and clears the input
  const addMalt = (e) => {
    setRecipeData({
      ...recipeData,
      malts: [...recipeData.malts, { name: malt.name, grams: malt.grams }],
    });
    setMalt({ name: "", grams: 0 });
  };

  const deleteMalt = (index) => {
    setRecipeData({
      ...recipeData,
      malts: [
        ...recipeData.malts.slice(0, index),
        ...recipeData.malts.slice(index + 1),
      ],
    });
  };

  //adds hops to schema and clears input
  const addHop = (e) => {
    setRecipeData({
      ...recipeData,
      hops: [
        ...recipeData.hops,
        {
          name: hop.name,
          grams: hop.grams,
          minutes: hop.minutes,
          alphaAcids: hop.alphaAcids,
          additionalInfo: hop.additionalInfo,
        },
      ],
    });
    setHop({
      name: "",
      grams: 0,
      minutes: 0,
      alphaAcids: 0,
      additionalInfo: "",
    });
  };

  const deleteHop = (index) => {
    setRecipeData({
      ...recipeData,
      hops: [
        ...recipeData.hops.slice(0, index),
        ...recipeData.hops.slice(index + 1),
      ],
    });
  };

  // adds others to the schema and clears input
  const addOthers = (e) => {
    setRecipeData({
      ...recipeData,
      others: [...recipeData.others, others],
    });
    setOthers("");
  };

  const deleteOthers = (index) => {
    setRecipeData({
      ...recipeData,
      others: [
        ...recipeData.others.slice(0, index),
        ...recipeData.others.slice(index + 1),
      ],
    });
  };

  return (
    <VStack
      my="20px"
      p="20px"
      maxW="950px"
      mx="auto"
      bg="white"
      border="1px solid black"
      borderRadius="4px"
    >
      <Text textStyle="heading">Ingredients</Text>

      <HStack w="100%" justify="space-between" align="flex-start" wrap="wrap">
        <VStack h="100%" w="33%">
          <Text textStyle="headingSmall">Hops</Text>
          {recipeData.hops.map((item, index) => (
            <HStack key={index}>
              <Text textStyle="descriptive">
                {item.name} - {item.grams} grams
              </Text>
              <DeleteIcon cursor="pointer" onClick={() => deleteHop(index)} />
            </HStack>
          ))}
          <HStack>
            <Input
              value={hop.name}
              onChange={(e) => setHop({ ...hop, name: e.target.value })}
              placeholder="Hop"
            />

            <NumberInput value={hop.grams}>
              <InputGroup>
                <NumberInputField
                  value={hop.grams}
                  onChange={(e) => setHop({ ...hop, grams: e.target.value })}
                  placeholder="Grams"
                />
                <InputRightAddon children="g" />
              </InputGroup>
            </NumberInput>
          </HStack>

          <Button onClick={addHop} variant="outline">
            Add Hop
          </Button>
        </VStack>

        <VStack w="33%">
          <Text textStyle="headingSmall">Malts / Grains</Text>
          {recipeData.malts.map((item, index) => (
            <HStack key={index}>
              <Text textStyle="descriptive">
                {item.name} - {item.grams} grams
              </Text>
              <DeleteIcon cursor="pointer" onClick={() => deleteMalt(index)} />
            </HStack>
          ))}
          <HStack>
            <Input
              value={malt.name}
              onChange={(e) => setMalt({ ...malt, name: e.target.value })}
              placeholder="Malt"
            />

            <NumberInput value={malt.grams}>
              <InputGroup>
                <NumberInputField
                  value={malt.grams}
                  onChange={(e) => setMalt({ ...malt, grams: e.target.value })}
                  placeholder="Grams"
                />
                <InputRightAddon children="g" />
              </InputGroup>
            </NumberInput>
          </HStack>

          <Button onClick={addMalt} variant="outline">
            Add Malt
          </Button>
        </VStack>

        <VStack w="33%">
          <Text textStyle="headingSmall">Others</Text>
          <Editable textStyle="descriptive" value={recipeData.yeast}>
            <EditableInput />
            <EditablePreview />
          </Editable>
          {recipeData.others.map((item, index) => (
            <HStack key={index}>
              <Text textStyle="descriptive">{item}</Text>
              <DeleteIcon
                cursor="pointer"
                onClick={() => deleteOthers(index)}
              />
            </HStack>
          ))}
          <Input value={others} onChange={(e) => setOthers(e.target.value)} />
          <Button onClick={addOthers} variant="outline">
            Add
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Ingredients;
