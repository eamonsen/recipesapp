Recipes = new Mongo.Collection("recipes");


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

  //Adding formfor adding new recipes to the db
  Template.addButton.events({
    'click .add': function() {
    //Recipes.insert({
      console.log('hello')
      console.log($('#newName').val())

    //})
  }
})
}



if (Meteor.isServer) {
    
}
