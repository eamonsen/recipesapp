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

  //Capitolizes first letter of first word of string 

  function capitalize(string)
  {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

//Configures reactive-table and formats ingredient list and column labels
  Template.recipesapp.tableSettings = function() {
    return {fields: [
          { key: 'name', label: 'Recipe', fn: function(name, recipe){return capitalize(recipe.name)} },
          { key: 'cuisine', label: 'Cuisine', fn: function(name, recipe){return capitalize(recipe.cuisine)}},
          { key: 'type', label: 'Type of Dish', fn: function(name, recipe){return capitalize(recipe.type)}},
          { key: 'ingredients', label: 'Ingredients', fn: function(name, recipe){return recipe.ingredients.join(', ')}},
    ],
    useFontAwesome: true}
  }
  
  //Adding form for adding new recipes to the db
  Template.addButton.events({
    'click .add': function() {
      var newName = $('#newName').val();
      var newCuisine = $('#newCuisine').val();
      var newType = $('#newType').val();
      var newIngredientString = $('#newIngredients').val();
      var newIngredients = newIngredientString.split(",");
      Recipes.insert({name: newName, cuisine: newCuisine, type: newType, ingredients: newIngredients});
      console.log($('#newName').val());
      $('#myModal').modal('hide');
      $('#newName').val('');
      $('#newCuisine').val('');
      $('#newType').val('');
      $('#newIngredients').val('');
    }
});

  Template.addNew.settings = function(){
    return {
      position: "bottom",
      limit: 3,
      rules:[
        {
          collection: Recipes,
          field: "cuisine",
          template: Template.auto
        }
      ]
    }
  }

  var isFormRendered = false
 Template.addRecipe.events({
    'click .new': function() {
      
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

     
     
      }
      
    })
}   
    
if (Meteor.isServer) {
    
}
