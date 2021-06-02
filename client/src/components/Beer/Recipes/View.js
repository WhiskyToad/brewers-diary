import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link as Router } from "react-router-dom";
import moment from "moment";

import ReactStars from "react-rating-stars-component";
import {
  Link,
  Image,
  Text,
  HStack,
  VStack,
  Spacer,
  Flex,
  Spinner,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Textarea,
  Button,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  FaPinterest,
  FaFacebook,
  FaTwitter,
  FaBookmark,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

import { deleteRecipe, likeRecipe } from "../../../actions/beer/recipes";

const RecipeView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  // Scrolls to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //recipe query
  const RECIPE = gql`
    query recipe($id: ID!) {
      oneRecipe(recipeId: $id) {
        id
        selectedFile
        title
        style
        method
        description
        efficiency
        batchSize
        targetOG
        targetFG
        IBUs
        targetABV
        malts {
          name
          grams
        }
        hops {
          name
          grams
        }
        others
        yeast
        mashLength
        mashTemp
        mashDirections
        boilLength
        boilDirections
        fermentTemp
        fermentLength
        fermentDirections
        otherDirections
        rating
        votes
        createdAt
        name
      }
    }
  `;
  //get recipe id from url and load recipe
  const recipeId = window.location.hash.substr(1);
  const { loading, error, data } = useQuery(RECIPE, {
    variables: { id: recipeId },
  });

  if (loading) return <Spinner size="xl" />;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Title
        recipe={data.oneRecipe}
        dispatch={dispatch}
        user={user}
        history={history}
      />
      <Stats recipe={data.oneRecipe} />
      <Ingredients recipe={data.oneRecipe} />
      <Mash recipe={data.oneRecipe} />
      <Boil recipe={data.oneRecipe} />
      <Ferment recipe={data.oneRecipe} />
      <Other recipe={data.oneRecipe} />
      <Rating recipe={data.oneRecipe} dispatch={dispatch} user={user} />
      <Comments />
    </>
  );
};

const Title = ({ recipe, dispatch, user, history }) => {
  // creates the stars rating display
  const rating = (recipe) => {
    let value = (recipe.rating / recipe.votes.length).toFixed(1);
    let index = 0;

    const stars = [];
    while (value >= 1) {
      stars.push(<FaStar key={index} />);
      value--;
      index++;
    }

    if (value >= 0.5) {
      stars.push(<FaStarHalfAlt key={index} />);
      index++;
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={index} />);
      index++;
    }

    return stars;
  };
  return (
    <VStack className="center-card">
      <HStack w="97%" justify="space-between">
        <HStack w={{ base: "50px", md: "200px" }}>
          {(user?.result?.googleId === recipe?.creator ||
            user?.result?._id === recipe?.creator) && (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HiDotsHorizontal fontSize="30px" />}
                variant="ghost"
              />
              <MenuList>
                <MenuItem>
                  <Link as={Router} to={`/recipe/create?update#${recipe.id}`}>
                    <HStack>
                      <EditIcon />
                      <Text>Edit</Text>
                    </HStack>
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(deleteRecipe(recipe.id, history))}
                >
                  <HStack>
                    <DeleteIcon />
                    <Text>Delete</Text>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
        <Text textStyle="heading">{recipe.title}</Text>
        <HStack w={{ base: "80px", md: "200px" }} justify="flex-end">
          <Text textStyle="descriptiveSmall">by {recipe.name}</Text>
          <Text textStyle="descriptiveSmall">
            {moment(recipe.createdAt).fromNow()}
          </Text>
        </HStack>
      </HStack>
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
          <Flex h="250px" justify="center">
            <Image
              maxH="200px"
              borderRadius="10px"
              fit="cover"
              src={recipe.selectedFile}
            />
          </Flex>
          <HStack
            w="80%"
            justify="space-between"
            fontSize="25px"
            py={{ base: "10px", md: 0 }}
          >
            <Tooltip hasArrow label="Share on Pinterest">
              <span>
                <FaPinterest color="#e60023" cursor="pointer" />
              </span>
            </Tooltip>
            <Tooltip hasArrow label="Share on Facebook">
              <span>
                <FaFacebook color="#4495d4" cursor="pointer" />
              </span>
            </Tooltip>
            <Tooltip hasArrow label="Share on Twitter">
              <span>
                <FaTwitter color="#1da1f2" cursor="pointer" />
              </span>
            </Tooltip>
            <Tooltip hasArrow label="Bookmark this recipe">
              <span>
                <FaBookmark color="gold" cursor="pointer" />
              </span>
            </Tooltip>
          </HStack>
        </VStack>

        <Spacer />

        <VStack w={{ base: "100%", md: "50%" }} minH="280px" textAlign="center">
          <HStack
            w={{ base: "80%", md: "50%" }}
            my={{ base: "10px", md: 0 }}
            justify="space-evenly"
            textStyle="headingSmall"
          >
            <Text>{recipe.targetABV}%</Text>
            <Text>{recipe.style}</Text>
            <Text>{recipe.method}</Text>
          </HStack>

          <Text px="15px">{recipe.description}</Text>
          <Spacer />
          <HStack justify="space-between" w="70%">
            <Tooltip
              hasArrow
              label={(recipe.rating / recipe.votes.length).toFixed(2)}
            >
              <span>
                <HStack color="orange">{rating(recipe)}</HStack>
              </span>
            </Tooltip>

            <Text>{recipe.votes.length} ratings</Text>
          </HStack>
        </VStack>
      </Flex>
    </VStack>
  );
};

const Stats = ({ recipe }) => {
  return (
    <VStack className="center-card">
      <Text textStyle="heading">Stats</Text>
      <HStack w="100%" justify="space-evenly">
        <VStack>
          <Text textStyle="headingSmall">Efficency</Text>
          <Text>{recipe.efficiency} %</Text>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">Batch Size</Text>
          <Text>{recipe.batchSize} litres</Text>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">OG</Text>
          <Text>{recipe.targetOG}</Text>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">FG</Text>
          <Text>{recipe.targetFG}</Text>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">IBUs</Text>
          <Text>{recipe.IBUs}</Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

const Ingredients = ({ recipe }) => {
  return (
    <VStack className="center-card">
      <Text textStyle="heading">Ingredients</Text>
      <VStack
        w="90%"
        textAlign="center"
        justify="space-between"
        align="center"
        spacing={6}
      >
        <VStack>
          <Text textStyle="headingSmall">Hops</Text>
          {recipe.hops.map((item, index) => (
            <HStack key={index}>
              <Text textStyle="descriptive">
                {item.name} - {item.grams} grams
              </Text>
            </HStack>
          ))}
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">Malts / Grains</Text>
          {recipe.malts.map((item, index) => (
            <HStack key={index}>
              <Text textStyle="descriptive">
                {item.name} - {item.grams} grams
              </Text>
            </HStack>
          ))}
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">Others</Text>
          <Text textStyle="descriptive">{recipe.yeast}</Text>
          {recipe.others.map((item, index) => (
            <Text textStyle="descriptive" key={index}>
              {item}
            </Text>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};

const Mash = ({ recipe }) => {
  return (
    <VStack className="center-card">
      <Text textStyle="heading">The Mash</Text>

      <HStack w="40%" justify="space-evenly" mb="20px">
        <VStack>
          <Text textStyle="headingSmall">Temp</Text>
          <Text>{recipe.mashTemp} °C</Text>
        </VStack>
        <VStack>
          <Text textStyle="headingSmall">Length</Text>
          <Text>{recipe.mashLength} mins</Text>
        </VStack>
      </HStack>
      <Text textStyle="headingSmall">Mash Directions</Text>
      <Text maxW="90%" textAlign="center">
        {recipe.mashDirections}
      </Text>
    </VStack>
  );
};

const Boil = ({ recipe }) => {
  return (
    <VStack className="center-card">
      <Text textStyle="heading">The Boil</Text>

      <HStack w="40%" justify="space-evenly" mb="20px">
        <VStack>
          <Text textStyle="headingSmall">Length</Text>
          <Text>{recipe.boilLength} minutes</Text>
        </VStack>
      </HStack>
      <Text textStyle="headingSmall">Boil Directions</Text>
      <Text maxW="90%" textAlign="center">
        {recipe.boilDirections}
      </Text>
    </VStack>
  );
};

const Ferment = ({ recipe }) => {
  return (
    <VStack className="center-card">
      <Text textStyle="heading">The Ferment</Text>

      <HStack w="40%" justify="space-evenly" mb="20px">
        <VStack>
          <Text textStyle="headingSmall">Temp</Text>
          <Text>{recipe.fermentTemp} °C</Text>
        </VStack>
        <VStack>
          <Text textStyle="headingSmall">length</Text>
          <Text>{recipe.fermentLength} days</Text>
        </VStack>
      </HStack>
      <Text textStyle="headingSmall">Fermenting Directions</Text>
      <Text maxW="90%" textAlign="center">
        {recipe.fermentDirections}
      </Text>
    </VStack>
  );
};

const Other = ({ recipe }) => {
  return (
    <VStack className="center-card">
      <Text textStyle="heading">Other Directions</Text>
      <Text maxW="90%" textAlign="center">
        {recipe.otherDirections}
      </Text>
    </VStack>
  );
};

const Rating = ({ recipe, dispatch, user }) => {
  // sending rating
  const ratingChanged = (newRating) => {
    dispatch(likeRecipe(recipe._id, newRating));
  };
  return (
    <VStack className="center-card" textAlign="center">
      <Text textStyle="heading">Rate this recipe</Text>

      {recipe.votes.includes(user?.result?.googleId) ||
      recipe.votes.includes(user?.result?._id) ? (
        <Text>You have already rated this recipe</Text>
      ) : user != null ? (
        <ReactStars
          count={5}
          onChange={ratingChanged}
          activeColor="#ffd700"
          size={30}
        />
      ) : (
        <Text>You must be signed in to rate recipes</Text>
      )}
    </VStack>
  );
};

const Comments = () => {
  const [comment, setComment] = useState("");
  const addComment = () => {
    console.log(comment);
  };
  return (
    <VStack className="center-card">
      <Text textStyle="heading">Add a Comment</Text>
      <Textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button borderRadius="10px" onClick={addComment}>
        Comment
      </Button>
    </VStack>
  );
};

export default RecipeView;
