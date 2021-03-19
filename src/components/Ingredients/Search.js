import React, { memo, useState, useEffect, useRef } from 'react'

import Card from '../UI/Card'
import './Search.css'

const Search = (props) => {

  const { onLoadIngredients } = props
  const [enterFilter, setSetEnterFilter] = useState('')
  const inputRef = useRef()
  
  useEffect(() => {
    const timer = setTimeout(()=>{
      if(enterFilter === inputRef.current.value){
        
        const query = enterFilter.length === 0 ? '' : `?orderBy="title"&=equalTo="${enterFilter}"`
  
        fetch('https://react-hooks-update-b4d15-default-rtdb.firebaseio.com/ingredients.json'+ query)
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
            //trigger somethin in ingredients.js
            onLoadIngredients(loadedIngredients)
          })
      }
    }, 500)

    //clean up function 
    return () => clearTimeout(timer)

  }, [enterFilter, onLoadIngredients, inputRef])





  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input type='text' onChange={(e) => setSetEnterFilter(e.target.value)} ref={inputRef} />
        </div>
      </Card>
    </section>
  )
}

export default memo(Search)
