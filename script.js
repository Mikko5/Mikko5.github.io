function randomMeal()
{

    document.body.style.justifyContent = 'flex-start';

    //fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Sweet and Sour Pork')
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      // Handle the response data here
      console.log(data);
      const meal = data.meals[0];
     
      const mealName = meal.strMeal;
      const mealInstructions = meal.strInstructions
      const mealPhoto = meal.strMealThumb;

      let mealIngredientsMeasures = "";

      
      for(let i = 1; i <=20; i++)
      {
        const ingredientProperty =  `strIngredient${i}`;
        const measureProperty = `strMeasure${i}`;
        console.log(meal[ingredientProperty])
        if(meal[ingredientProperty] != null && meal[ingredientProperty] != "")
        {
     
          mealIngredientsMeasures += `<li>${meal[ingredientProperty]} ${meal[measureProperty]}</li>`;
    
        }
      }
      console.log(mealIngredientsMeasures);



      
      
      
      
      
      
      
      document.getElementById('Recipe-name').innerText = mealName;
      document.getElementById('instructions').innerHTML = `<h2>Instructions</h2><p>${mealInstructions}</p>`;
      document.getElementById('Picture').src = mealPhoto;
      document.getElementById('ingredients').innerHTML = `<h2>ingredients</h2><ul>${mealIngredientsMeasures}</ul>`


    });
    

   

  
}