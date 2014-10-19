Recipes = new Mongo.Collection("recipes");
cuisineList = _.uniq(Recipes.find({}, {
    sort: {cuisine: 1}, fields: {cuisine: true}
}).fetch().map(function(x) {
    return x.cuisine;
}), true);


if (Meteor.isClient) {
  //Connects to mongodb
  Template.recipesapp.recipes = function () {
    return Recipes.find({});
  };

//Configures reactive-table and formats ingredient list and column labels
  Template.recipesapp.tableSettings = function() {
    return {fields: [
          { key: 'name', label: 'Recipe' },
          { key: 'cuisine', label: 'Cuisine'},
          { key: 'type', label: 'Type of Dish'},
          { key: 'ingredients', label: 'Ingredients', fn: function(name, recipe){return recipe.ingredients.join(', ')}},
    ],
    useFontAwesome: true}
  }

  //Adding form for adding new recipes to the db
  Template.addButton.events({
    'click .add': function() {
      var newName = $('#newName').val();
      //var newIngredients =
      //var newType = 
      //var newCuisine = 
      Recipes.insert({name: newName});
    //Recipes.insert({
      console.log($('#newName').val())

    //})
  }
})

  var schema = {
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            },
            "cuisine": {
                "type": "string",
            },
            "kind": {
                "type": "string"
            },
            "ingredients": {
                "type": "string",
            }
        }
    };

    console.log(cuisineList);

  
  var isFormRendered = false
 Template.addRecipe.events({
    'click .new': function() {
      cuisineList = _.uniq(Recipes.find({}, {
        sort: {cuisine: 1}, fields: {cuisine: true}
      }).fetch().map(function(x) {
        return x.cuisine;
      }), true);
       var options = {
        "fields": {
            "name": {
                "type": "text",
                "label": "Recipe Name",
                "id": "newName"
            },
            "cuisine": {
                "type": "text",
                "label": "Cuisine",
                "id": "newCuisine",
                "typeahead": {
                  "name": "cuisine",
                  "template": "<p style='color: blue'>{{cuisine}}</p>",
                  "local": ["merican", "Asian Fusion", "Italian", "Jewish", "Lebanese"],
                  }
            },
            "kind": {
                "type": "text",
                "label": "Type of Dish",
                "id": "newType",
            },
            "ingredients": {
                "type": "text",
                "label": "Ingredient List",
                "id": "newIngredients"
            },
          }
        };  

      if(!isFormRendered){
        $("#recipeForm").alpaca({
        "schema": schema,
        "options": options,
        "ui": "bootstrap"
      });
        isFormRendered = true
      }
      
    }
  })
}   
    
if (Meteor.isServer) {
    
}
