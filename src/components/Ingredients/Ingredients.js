import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

function Ingredients() {

  const [userIngredients, setUserIngredients] = useState([])

  // useEffect(() => {
  //   fetch('https://react-hooks-update-b4d15-default-rtdb.firebaseio.com/ingredients.json')
  //     .then(response => response.json())
  //     .then(responseData => {
  //       const loadedIngredients = []
  //       for(const key in responseData){
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount
  //         })
  //       }
  //       setUserIngredients(loadedIngredients)
  //     })
  // }, [])

  useEffect(() => {
    console.log('Rendering Ingredients...', userIngredients);


    // return () => {
    //   console.log('this componet will be unmounted....');
    // }
  }, [userIngredients])

  const addIngredientsHandler = (ingredients) => {
    // setUserIngredients((prevState)=>[
    //   ...prevState, 
    //   {id: Math.random().toString(), ...ingredients}
    // ])

    fetch('https://react-hooks-update-b4d15-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredients),
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(responseData => {
         setUserIngredients((prevState)=>[
          ...prevState, 
          {id: responseData.name, ...ingredients}
        ])
      })

  }

  const removeIngredientHandler = ingredientID =>{

    fetch(`https://react-hooks-update-b4d15-default-rtdb.firebaseio.com/ingredients/${ingredientID}.json`, {
      method: 'DELETE'
    })
      .then(response => {
        setUserIngredients(prevState => 
          prevState.filter(ingredient => ingredient.id !== ingredientID)
        )      
      })
      //if you use a {} you should use return or remove{}

  }

  const filteredIngredientHandler = useCallback((filteredIngredient) => {
    setUserIngredients(filteredIngredient)
  }, [])

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientsHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
