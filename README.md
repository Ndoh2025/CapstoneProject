# Fullstack ACC Capstone Boilerplate

This boilerplate was created for 2302

For backend starter see branch 2302-BE

Use [this API](https://fakestoreapi.com/) while you're building your front end application to reduce blockers due to building a back end at the same time.


NOTES FROM MTG 10/17
## Start with log-in functionality 
[ ] Use the API to authenticate - your request will need to include an existing user's username and password. The response will be an auth token 

[ ] Store the token so you can tell if a user is logged in or not. You can do this using useState/localStorage 

[ ] Figure out how to get user information. I would recommned getting ALL users from the API when App.js initially loads. Then, when a user logs in, you will have all user information stored locally and will just need to select the right user object. https://fakestoreapi.com/docs#u-all

[ ] Review/set-up your logic in App.js. When a user logs in, your home page will need to change so that the user can view their cart and add/remove items. You have several functions that will be necessary for this:
- `toggleCart`: in order to show/hide the cart, you will need to make sure a user is logged in. 
- `setUser`: I mentioned this above. 
- `handleLogout`: You will need to add a way for the current user to log-out (This should be in App.js or in your NavBar). 
