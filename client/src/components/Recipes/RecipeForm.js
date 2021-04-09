import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";

import { DeleteIcon } from "@chakra-ui/icons";
import {
  Stack,
  VStack,
  Image,
  Spacer,
  Input,
  Select,
  Textarea,
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

import { useDispatch } from "react-redux";
import { createRecipe, updateRecipe } from "../../actions/recipes";
import defaultRecipe from "../Images/defaultRecipe.jpg";

const RecipeForm = () => {
  const dispatch = useDispatch();

  //checking to see if we are updating
  const recipeId = window.location.hash.substr(1);
  const recipe = useSelector((state) =>
    state.recipes.find((r) => r._id === recipeId)
  );

  //populate for edit
  useEffect(() => {
    setRecipeData(recipe);
  }, [recipe]);

  //saving inputs to push to recipeData
  const [malt, setMalt] = useState({ name: "", grams: 0 });
  const [hop, setHop] = useState({
    name: "",
    grams: 0,
    minutes: 0,
    alphaAcids: 0,
    additionalInfo: "",
  });

  // full recipe data
  const [recipeData, setRecipeData] = useState({
    selectedFile: defaultRecipe,
    title: "",
    method: "",
    style: "",
    description: "",
    batchSize: 0,
    targetOG: 0,
    targetFG: 0,
    IBUs: 0,
    targetABV: 0,
    malts: [],
    hops: [],
    others: [],
    yeast: "",
    strikeTemp: 0,
    mashTemp: 0,
    mashDirections: "",
    boilLength: 0,
    boilDirections: "",
    fermentTemp: 0,
    fermentLength: 0,
    fermentDirections: "",
    otherDirections: "",
    //creator: '',
  });

  //submits the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipe !== undefined) {
      dispatch(updateRecipe(recipeId, recipeData));
    } else {
      dispatch(createRecipe(recipeData));
    }
  };

  //adds malt to schema and clears the input
  const addMalt = (e) => {
    setRecipeData({
      ...recipeData,
      malts: [...recipeData.malts, { name: malt.name, grams: malt.grams }],
    });
    setMalt({ name: "", grams: 0 });
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Title recipeData={recipeData} setRecipeData={setRecipeData} />
        <Stack
          maxW="600px"
          mx="auto"
          my="60px"
          alignItems="center"
          spacing={3}
          p="80px"
          bg="white"
          fontSize="30px"
        >
          <HStack minW="75%">
            <Select
              placeholder="Method"
              onChange={(e) =>
                setRecipeData({ ...recipeData, method: e.target.value })
              }
            >
              <option value="All Grain">All Grain</option>
              <option value="Extract">Extract</option>
            </Select>

            <Select
              placeholder="Style"
              onChange={(e) =>
                setRecipeData({ ...recipeData, style: e.target.value })
              }
            >
              <option value="IPA">IPA</option>
              <option value="DIPA">DIPA</option>
            </Select>
          </HStack>

          {/* <Textarea
            placeholder="Enter a description"
            value={recipeData.description}
            onChange={(e) =>
              setRecipeData({ ...recipeData, description: e.target.value })
            }
          ></Textarea> */}

          <HStack>
            <NumberInput value={recipeData.batchSize}>
              <InputGroup>
                <NumberInputField
                  value={recipeData.batchSize}
                  onChange={(e) =>
                    setRecipeData({ ...recipeData, batchSize: e.target.value })
                  }
                  placeholder="Batch Size"
                />
                <InputRightAddon children="Litres" />
              </InputGroup>
            </NumberInput>
          </HStack>

          <HStack>
            <NumberInput value={recipeData.mashTemp}>
              <InputGroup>
                <NumberInputField
                  value={recipeData.mashTemp}
                  onChange={(e) =>
                    setRecipeData({ ...recipeData, mashTemp: e.target.value })
                  }
                  placeholder="Mash Temp"
                />
                <InputRightAddon children="°C" />
              </InputGroup>
            </NumberInput>

            <NumberInput>
              <InputGroup>
                <NumberInputField
                  value={recipeData.strikeTemp}
                  onChange={(e) =>
                    setRecipeData({ ...recipeData, strikeTemp: e.target.value })
                  }
                  placeholder="Strike Temp"
                />
                <InputRightAddon children="°C" />
              </InputGroup>
            </NumberInput>
          </HStack>

          <HStack>
            <NumberInput precision={2} value={recipeData.targetOG}>
              <InputGroup>
                <NumberInputField
                  value={recipeData.targetOG}
                  onChange={(e) =>
                    setRecipeData({ ...recipeData, targetOG: e.target.value })
                  }
                  placeholder="OG"
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </NumberInput>

            <NumberInput precision={2}>
              <InputGroup>
                <NumberInputField
                  value={recipeData.targetFG}
                  onChange={(e) =>
                    setRecipeData({ ...recipeData, targetFG: e.target.value })
                  }
                  placeholder="FG"
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </NumberInput>
          </HStack>

          <HStack>
            <NumberInput>
              <InputGroup>
                <NumberInputField
                  value={recipeData.IBUs}
                  onChange={(e) =>
                    setRecipeData({ ...recipeData, IBUs: e.target.value })
                  }
                  placeholder="0"
                />
                <InputRightAddon children="IBUs" />
              </InputGroup>
            </NumberInput>

            {/* <NumberInput>
              <InputGroup>
                <NumberInputField
                  value={recipeData.targetABV}
                  onChange={(e) =>
                    setRecipeData({ ...recipeData, targetABV: e.target.value })
                  }
                  placeholder="ABV"
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </NumberInput> */}
          </HStack>

          <Text fontWeight="bold">Malts</Text>
          {recipeData.malts.map((item, index) => (
            <HStack key={index}>
              <Text>
                {item.name} - {item.grams} grams
              </Text>
              <DeleteIcon />
            </HStack>
          ))}

          <HStack>
            <Input
              value={malt.name}
              onChange={(e) => setMalt({ ...malt, name: e.target.value })}
              placeholder="Malt"
            />

            <NumberInput>
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

          <Text fontWeight="bold">Hops</Text>
          {recipeData.hops.map((item, index) => (
            <HStack key={index}>
              <Text>
                {item.name} - {item.grams} grams
              </Text>
              <DeleteIcon />
            </HStack>
          ))}

          <HStack>
            <Input
              value={hop.name}
              onChange={(e) => setHop({ ...hop, name: e.target.value })}
              placeholder="Hop"
            />

            <NumberInput>
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

          <Input
            value={recipeData.yeast}
            onChange={(e) =>
              setRecipeData({ ...recipeData, yeast: e.target.value })
            }
            placeholder="Yeast Strain"
          />

          <Textarea
            value={recipeData.mashingDirections}
            onChange={(e) =>
              setRecipeData({
                ...recipeData,
                mashDirections: e.target.value,
              })
            }
            placeholder="Mashing Instruction"
          ></Textarea>

          <Textarea
            value={recipeData.boilingDirections}
            onChange={(e) =>
              setRecipeData({
                ...recipeData,
                boilDirections: e.target.value,
              })
            }
            placeholder="Boiling Instructions"
          ></Textarea>

          <Textarea
            value={recipeData.fermentDirections}
            onChange={(e) =>
              setRecipeData({
                ...recipeData,
                fermentingDirections: e.target.value,
              })
            }
            placeholder="Fermenting Instructions"
          ></Textarea>

          <Button type="submit" variant="outline">
            SUBMIT
          </Button>
        </Stack>
      </form>
    </>
  );
};

const Title = ({ recipeData, setRecipeData }) => {
  return (
    <VStack
      maxW="950px"
      mx="auto"
      my="20px"
      p="20px"
      spacing={1}
      bg="white"
      border="1px solid black"
      borderRadius="4px"
    >
      <Editable textStyle="heading" value={recipeData.title}>
        <EditablePreview />
        <EditableInput
          onChange={(e) =>
            setRecipeData({ ...recipeData, title: e.target.value })
          }
        />
      </Editable>
      <HStack
        w="940px"
        h="350px"
        alignSelf="center"
        borderRadius="lg"
        overflow="hidden"
        textStyle="descriptiveSmall"
      >
        <HStack mx="auto" align="flex-start">
          <VStack>
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

          <VStack w="50%" h="275px" m="10px" textAlign="center" spacing={4}>
            <HStack w="50%" justify="space-evenly" textStyle="headingSmall">
              <NumberInput>
                <InputGroup>
                  <NumberInputField
                    value={recipeData.targetABV}
                    onChange={(e) =>
                      setRecipeData({
                        ...recipeData,
                        targetABV: e.target.value,
                      })
                    }
                    placeholder="ABV"
                  />
                  <InputRightAddon children="%" />
                </InputGroup>
              </NumberInput>

              <Text>{recipeData.style}</Text>
              <Text>{recipeData.method}</Text>
            </HStack>

            <Editable
              px="15px"
              textStyle="descriptive"
              value={recipeData.description}
            >
              <EditableInput />
              <EditablePreview />
            </Editable>
            <Spacer />
          </VStack>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default RecipeForm;
