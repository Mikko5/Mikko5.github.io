
let previousMealID = null;
let activeCategory = null;

function randomMeal()
{
    if(activeCategory != null) // If a category is selected
    {
      get_category(activeCategory);
      return;
    }
    //fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Sweet and Sour Pork')
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      // Handle the response data here      
      const meal = data.meals[0];    
      if(previousMealID == meal.idMeal)
      {
        randomMeal();// Recursive call to reroll if duplicate
        return;  
      }
      previousMealID = meal.idMeal;
      displayMealDetails(meal.idMeal); 
   
    });
    

   

  
}



function get_category(category)
{

  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + category)
  .then(response => response.json())
  .then(data => {
   // Get the total number of meals in the category
    const maxvalue = data.meals.length;

    const indexOfMeal = Math.floor(Math.random() * maxvalue);
    const meal = data.meals[indexOfMeal];
    
    console.log(indexOfMeal);
    console.log(meal);   
   
    if(previousMealID == meal.idMeal && maxvalue > 1)
    {
      get_category(category);// Recursive call to reroll if duplicate
      return;

    }

    previousMealID = meal.idMeal;
    displayMealDetails(meal.idMeal);
 
  })
}

function set_category(category)
{
  if(activeCategory == category)
  {
    const activeCategoryButton = document.getElementById(activeCategory + 'Button');
    activeCategoryButton.classList.remove('active');
    activeCategory = null;

  }
  else 
  {
    if(activeCategory != null)
    {
      const activeCategoryButton = document.getElementById(activeCategory + 'Button');
      activeCategoryButton.classList.remove('active');
    }


    activeCategory = category;
    const categoryButton = document.getElementById(category + 'Button');
    categoryButton.classList.add('active');
  
  }

  console.log(activeCategory);
  
 
}


function displayMealDetails(mealID) {
      document.body.style.justifyContent = 'flex-start';
     
      fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealID)
      .then(response => response.json())
      .then(data => {
      const meal = data.meals[0];    
     
      const mealName = meal.strMeal;
      const mealInstructions = meal.strInstructions
      const mealPhoto = meal.strMealThumb;

      let mealIngredientsMeasures = "";

      
      for(let i = 1; i <=20; i++)
      {
        const ingredientProperty =  `strIngredient${i}`;
        const measureProperty = `strMeasure${i}`;
      
        if(meal[ingredientProperty] != null && meal[ingredientProperty] != "")
        {
     
          mealIngredientsMeasures += `<li>${meal[ingredientProperty]} ${meal[measureProperty]}</li>`;
    
        }
      }
     
      document.getElementById('Recipe-name').innerHTML = `<h2>${mealName}</h2>`;
      document.getElementById('instructions').innerHTML = `<h2>Instructions</h2><p>${mealInstructions}</p>`;
      document.getElementById('Picture').src = mealPhoto;
      document.getElementById('ingredients').innerHTML = `<h2>ingredients</h2><ul>${mealIngredientsMeasures}</ul>`

    })
}