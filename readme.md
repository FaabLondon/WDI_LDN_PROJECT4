# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Unit #4 Project:MERN Stack - Dress to impress

### Overview

**Final project:**
For the last project I developed a full-stack MERN application, by building an Express API with Node.js, serving the data from a Mongo database and consuming my API with a separate front-end built with React. I created several models (item, order, review, user) with CRUD functionalities.
I worked on automated tests for all my RESTful resources on the back-end, and for some classical and functional components on the front-end. These were done using SuperTest, the Mocha testing framework and the Chai Assertion library for the back-end and Enzyme for testing the React front-end.
Git was used for version control and Heroku for deployment

# GA WDI-32 Project 4: Dress to impress: high-end clothing rental
My application is called "Dress to impress". It allows customers to browse/search/sort through luxury clothes, add items to their cart and rent them through the checkout process (payment with Stripe API). Users can also check their order history, update their profile or leave comments on items.

---

## MVP
* User model and user authentication. Models for items (clothes or accessories), orders and reviews.
* Users can browse items, see the them, add/remove them from their cart and then checkout the cart, proceed to the payment (Stripe API) and create a new order.
* Users can add reviews, manage their own account and see their order history.
* Bulma for styling and customise it as much as possible.

### Technical features
* The API uses 4 models: item (clothes or accessories), order, review, user.
- The review model is embedded in the item model.
- The user model is referenced in the review model to keep track of the author of a review.
- The item model is references in the order model.
- The cart content is an array of items embedded in the user model, while orders are included in an array embedded in the user model.
* The API has RESTful routes for all models with most CRUD actions.
* My application includes authentication with encrypted passwords (bcrypt), secure routes for all actions except the index and show page for items. I also used protectedRoute on the front-end and replicated the features of Satellizer, a token-based authentication module for AngularJS
* The app is deployed on Heroku and accessible to the public.

##### [Please visit website](https://dress-to-impress.herokuapp.com/)

### Project planning
* **User stories and wireframes** I defined my MVP as a typical e-commerce customer journey, that is, browsing/searching/sorting items, adding them to a cart and allowing the user to checkout.
* **Timeline**
We were given 1 week to finish the project. I planned 5 days of programming, 1 day of tests for the back-end and front-end and 1 day of styling and working on responsiveness.

---

###### Homepage
* The homepage introduces the concept of Dress to Impress.

<p align="center"><img src="https://i.imgur.com/k2nGHcw.png" width="700"></p>

###### Registration & login
* The user can go directly to the index page and show pages without registering or logging in. However he/she can only add items to the cart/shopping bag or leave comments, once registered/logged in. There are 2 forms for registration and login. Both manage omitted and incorrect input from the user.

<p align="center"><img src="https://i.imgur.com/AJznuVZ.png" width="700"></p>

<p align="center"><img src="https://i.imgur.com/yTCg9to.png" width="700"></p>

###### Index page and filtering
* The index page enables the user to sort, filter items and look for a specific brand or product. The user can also select a specific category in the Navbar. The filtering criteria are the brand name, product, price, occasion and colors. The user can rank by price and brand name.

<p align="center"><img src="https://i.imgur.com/SDTvcWz.png" width="700"></p>

###### Show page
* The show page shows a specific product with a product description, quantity in the shopping bag, main image, 3 additional small images and a comment section. The user can change the quantity of the product in the shopping bag on this page.

<p align="center"><img src="https://i.imgur.com/ziZ5ocr.png" width="700"></p>


###### Cart/shopping bag content
* The user can click on the cart icon and gain access to its content. It describes the item in the cart, quantities, price of rental per day and in total as well as delivery options. The user can then go back to shopping or checkout his/her cart.

<p align="center"><img src="https://i.imgur.com/YNJIqI0.png" width="700"></p>

###### 3-step check-out form
* The user can checkout his/her cart by entering the delivery/billing address, his/her card details and check/modify the content of his/her cart one last time. The payment is processed on click of the button. The stripe API processes the payment (in test mode with a fake payment card ;).

<p align="center"><img src="https://i.imgur.com/Gva3EJV.png" width="700"></p>

###### Order confirmation page
* The user is then redirected to the order confirmation page and is given an order confirmation number. The Stripe API can send a confirmation email to the user in development mode only, not in test mode.

<p align="center"><img src="https://i.imgur.com/ZuUn1Kx.png" width="700"></p>

###### Order history
* If needed, the user can check his/her order history by clicking on the right hand-side menu in the Navbar.
It shows a summary of all orders and an order summary for each one of them on click.

<p align="center"><img src="https://i.imgur.com/SVSPs4A.png" width="700"></p>
<p align="center"><img src="https://i.imgur.com/aF3dkRz.png" width="700"></p>

###### User profile
* Finally the user can amend his/her user profile by clicking on "My account" on the top right-hand side menu.

<p align="center"><img src="https://i.imgur.com/D6tufEi.png" width="700"></p>

###### Protected route
* Flash messages will appear when a user tries to perform actions he/she is not allowed to when not properly authenticated.

<p align="center"><img src="https://i.imgur.com/rW2JUWa.png" width="700"></p>


---

## Wins
The final product is in line with my planned MVP. I did not encounter any major hurdle and managed to work quite independently on this project.

## Challenges
It took me one full day to implement the Stripe payment API. I read the docs but ended up using a tutorial found online specific to React. It was not straightforward but it works ! 

## Additional features
I would like to integrate a click & collect feature thanks to the Royal Mail API. It would offer the possibility to click & collect an order and show the closest collect points on a map. This will be done at a later stage.
I also want to keep improving the Navbar layout and responsiveness.

---

## Setup instructions

- Clone or download the repo
- Install dependencies with `yarn install` or `npm install`
- Start the client with `yarn start:client` (same as `webpack-dev-server`)
- Start the server with `yarn start:server` (same as `nodemon`)
- Start the local MongoDB server in Node.js with `mongod`
- To run tests, type `test:client` to test the client side with Enzyme or `test:server` to run tests on the back-end.
