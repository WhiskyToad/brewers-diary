import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";

import { DeleteIcon } from "@chakra-ui/icons";
import {
  VStack,
  Image,
  Spacer,
  Input,
  Select,
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
import { createRecipe, updateRecipe } from "../../../actions/recipes";
import defaultRecipe from "../../Images/defaultRecipe.jpg";

const RecipeForm = () => {
  const dispatch = useDispatch();

  //checking to see if we are updating
  const recipeId = window.location.hash.substr(1);
  const recipe = useSelector((state) =>
    state.recipes.find((r) => r._id === recipeId)
  );

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

  // full recipe data
  const [recipeData, setRecipeData] = useState({
    selectedFile: defaultRecipe,
    title: "Recipe Title",
    method: "All Grain",
    style: "IPA",
    description: "Enter description",
    efficiency: 0,
    batchSize: 0,
    targetOG: 1.23,
    targetFG: 1.23,
    IBUs: 0,
    targetABV: 0,
    malts: [],
    hops: [],
    others: [],
    yeast: "Yeast Strain",
    mashLength: 0,
    mashTemp: 0,
    mashDirections: "Enter mash directions",
    boilLength: 0,
    boilDirections: "Enter boil directions",
    fermentTemp: 0,
    fermentLength: 0,
    fermentDirections: "Enter fermentation directions",
    otherDirections: "Enter other directions",
  });

  //populate for edit
  useEffect(() => {
    if (recipe !== undefined) setRecipeData(recipe);
  }, [recipe]);

  //submits the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeData.title.length > 30) {
      return alert("Title can only be 30 chars max");
    }
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
    <>
      <form onSubmit={handleSubmit}>
        <Title recipeData={recipeData} setRecipeData={setRecipeData} />
        <Stats recipeData={recipeData} setRecipeData={setRecipeData} />
        <Ingredients
          recipeData={recipeData}
          malt={malt}
          setMalt={setMalt}
          addMalt={addMalt}
          deleteMalt={deleteMalt}
          hop={hop}
          setHop={setHop}
          addHop={addHop}
          deleteHop={deleteHop}
          others={others}
          setOthers={setOthers}
          addOthers={addOthers}
          deleteOthers={deleteOthers}
        />
        <Mash recipeData={recipeData} setRecipeData={setRecipeData} />
        <Boil recipeData={recipeData} setRecipeData={setRecipeData} />
        <Ferment recipeData={recipeData} setRecipeData={setRecipeData} />
        <Other recipeData={recipeData} setRecipeData={setRecipeData} />
        <HStack justify="center">
          <Button
            type="submit"
            variant="outline"
            bg="white"
            textStyle="heading"
            h="50px"
          >
            SUBMIT
          </Button>
        </HStack>
      </form>
    </>
  );
};

const Title = ({ recipeData, setRecipeData }) => {
  return (
    <VStack
      w={["100%", "100%", "100%", "940px"]}
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
      <HStack w="100%" justify="space-evenly" textStyle="descriptive">
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

const Ingredients = ({
  recipeData,
  malt,
  setMalt,
  addMalt,
  deleteMalt,
  hop,
  setHop,
  deleteHop,
  addHop,
  others,
  setOthers,
  addOthers,
  deleteOthers,
}) => {
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
                  setRecipeData({ ...recipeData, fermentTemp: e.target.value })
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
            setRecipeData({ ...recipeData, fermentDirections: e.target.value })
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

export default RecipeForm;
