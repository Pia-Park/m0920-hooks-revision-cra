import React, {useState, useEffect} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

function Ingredients() {

  const [userIngredients, setUserIngredients] = useState([])

  useEffect(() => {
    fetch('https://react-hooks-update-b4d15-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = []
        for(const key in responseData){
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          })
        }
        setUserIngredients(loadedIngredients)
      })
  }, [])

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

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientsHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
