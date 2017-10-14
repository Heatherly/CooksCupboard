// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(term, diet, health) {
    // Search for articles

    var app_id = "af283a48";
    var api_key = "68eec6cfd890e362c1e6f52639a8d8bf";

    var queryURL = "https://api.edamam.com/search?&app_id=" + app_id + "&app_key=" + api_key + "&q=" + term + "&from=0&to=12";

    if(diet) {
      queryURL = queryURL + "&diet=" + diet;
      // console.log(queryURL);
    }

    if(health) {
      queryURL = queryURL + "&health=" + health;
      // console.log(queryURL);
    }

    return axios.get(queryURL).then(function(response) {
      console.log(queryURL);
      return response.data.hits;
    });
  },

  // This function hits our own server to retrieve the record of query results
  getRecipes: function() {
    return axios.get("/myfaves");
  },

// API Post Request Function
  apiSave: function(recipeObj){

  // Get API Post URL (this allows it to work in both localhost and heroku)
  var apiURL = window.location.origin + '/save';

  // Create a JavaScript *Promise*
  return new Promise(function (fulfill, reject){

    // Re-format the article Object to match the Mongo Model (ie we need to take off the the id)
    var params = new URLSearchParams();
    params.set("title", recipeObj.title);
    params.set("ingredients", recipeObj.ingredients);
    params.set("source", recipeObj.source);
    params.set("sourceURL", recipeObj.sourceURL);
    params.set("picURL", recipeObj.picURL);
    params.set("notes", recipeObj.notes);
    // params.append("username", req.user.username) //NOT SURE IF THIS IS HOW I ADD IN USERNAME DATA OR NOT???
    axios.post(apiURL, params).then(function(response){

      // Error handling / fullfil promise if successful query
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }
      
    }).catch(function(err){
      console.log(err)
      if (err.response.status === 403) {
        reject(err);
      }
    });

  });
  
},
// Post Request Function
  saveOne: function(recipeObj){

  // Get API Post URL (this allows it to work in both localhost and heroku)
  var apiURL = window.location.origin + '/save';

  // Create a JavaScript *Promise*
  return new Promise(function (fulfill, reject){

    // // Re-format the article Object to match the Mongo Model (ie we need to take off the the id)
    // var params = new URLSearchParams();
    // params.append("title", recipeObj.title);
    // params.append("ingredients", recipeObj.ingredients);
    // params.append("source", recipeObj.source);
    // params.append("sourceURL", recipeObj.sourceURL);
    // params.append("picURL", recipeObj.picURL);
    // params.append("notes", recipeObj.notes);
    // params.append("username", req.user.username) //NOT SURE IF THIS IS HOW I ADD IN USERNAME DATA OR NOT???
    axios.post(apiURL).then(function(response){

      // Error handling / fullfil promise if successful query
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }
      
    })

  });
  
},


// // API Get Request Function
  apiGet: function(query){

  // Get API Post URL (this allows it to work in both localhost and heroku)
  var apiURL = window.location.origin + '/myfaves';

  // Create a JavaScript *Promise*
  return new Promise(function (fulfill, reject){

    // Re-format the article Object to match the Mongo Model (ie we need to take off the the id)
    axios.get(apiURL).then(function(response) {

      // Error handling / fullfil promise if successful query
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }

    });
    
  });
  
},

// // API Delete Request Function
// apiDelete: function(deleteArticleId){

//   // Get API Post URL (this allows it to work in both localhost and heroku)
//   var apiURL = window.location.origin + '/api/delete/' + deleteArticleId;

//   // Create a JavaScript *Promise*
//   return new Promise(function (fulfill, reject){

//     // Send the MongoDB Id for deletion
//     axios.post(apiURL).then(function(response) {

//       // Error handling / fullfil promise if successful query
//       if(response){
//         fulfill(response);
//       }
//       else{
//         reject("");
//       }

//     });

//   });

// }

};

// We export the API helper
module.exports = helper;
