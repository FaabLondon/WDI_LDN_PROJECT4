# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Unit #4 Project: MERN Stack - Dress to impress

### Overview

**Final project: Brief** for the last project I developed a full-stack MERN application, by building an Express API with Node.js, serve the data from a Mongo database and consume my API with a separate front-end built with React. I created several models with CRUD functionalities.
I worked on automated tests for all my RESTful resources on the back-end, and some classical and functional components on the front-end. These were done using SuperTest, the Mocha testing framework and Chai Assertion library for the back-end and Enzyme for testing the React front-end.
Git was used for version control and Heroku for deployment

# GA WDI-32 Project 2: Dress to impress: high-end clothing rental
My application is called "Dress to impress". It allows customers to browse/search/sort through luxury clothes, add items to their cart and rent them through the checkout process (payment with Stripe API). Users can also check their order history, update their profile or leave comments on items.

---

## MVP
* User model and user authentication. Models for items (clothes or accessories), orders and reviews.
* Users can browse items, see the them, add/remove them from their cart and then checkout the cart, proceed to the payment (Stripe API) and create a new order.
* Users can add reviews, manage their own account and see their order history.
* I used Bulma for the styling and tried to customise it as much as possible.

### Technical features
* The API uses 4 models: item, order, review, user. The review model is embedded in the item model. The user model is referenced in the review model to keep track of the author of a review. The item model is references in the order model. The cart content is an array of items embedded in the user model, while orders are included in an array embedded in the user model.
* The API has RESTful routes for all models with most CRUD actions.
* My application includes authentication with encrypted passwords (bcrypt), secure routes for all actions except the index and show page for items. I also used protectedRoute on the front-end and replicated the features of Satellizer, a token-based authentication module for AngularJS
* The app is deployed on heroku and accessible to the public.

##### [Please visit website](https://dress-to-impress.herokuapp.com/)

### Project planning
* **User stories and wireframes** I defined my MVP as a typical e-commerce custoemr journey, that is browsing/searching/sorting items, adding them to your  letting the that are significant enough to help you know which features are core MVP and which you can cut
* **Timeline**

---

###### Homepage
* The homepage xxxx

<p align="center"><img src="" width="700"></p>

###### Index page and filtering
* xxxx

<p align="center"><img src="https://i.imgur.com/Br5jjEF.png" width="700"></p>

###### Show page
* The show page xxxxx

<p align="center"><img src="" width="700"></p>


###### xxx
* xxx

<p align="center"><img src="" width="700"></p>

###### xxx
* xxx

<p align="center"><img src="" width="700"></p>

###### xxx
* xxx

<p align="center"><img src="" width="700"></p>

###### xxx
* xxx

<p align="center"><img src="" width="700"></p>

---
I was pleased with the final product, xxxxx.


Descriptions of any **unsolved problems** or **major hurdles** you had to overcome
The main challenges were ....

---

## Setup instructions

- Clone or download the repo
- Install dependencies with `yarn install`
- Start the client with `start:client` (same as `webpack-dev-server`)
- Start the server with `start:server` (same as `nodemon`)
- Start the local MongoDB server in Node.js with `mongod`
- To run tests, type `test:client` to test the client side with Enzyme or `test:server` to run tests on the back-end.
