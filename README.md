Brewers Diary

This is a MERN fullstack project to create a logbook for recording homebrew recipes and brew logs. Eventually I want to expand it into a recipe based social media site. It
is full stack React and Node, using axios and redux in the front end and express and MongoDB at the backend. I have been using Chakra UI to style.

So far it has full CRUD functionality for adding recipes, the priority todo list currently looks like:

Add login /google auth to site
switch from REST API to GraphQL
base64 converting and compressing of user uploaded images.
study about switching from Redux to React Query
clean up my Chakra UI styling, and improve my UI in general
build out more features

---

Client

Dependencies:

npm install axios moment react-file-base64 redux redux-thunk react-router-dom

npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion

npm install react-icons --save

npm install react-google-login

---

Server

Dependencies:

npm install body-parser cors express mongoose nodemon dotenv
