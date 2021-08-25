import React, { useState } from 'react'
import axios from 'axios'


const App =()=> {
  const [placeHolder, setUpPlaceHolder] = React.useState(['stars','reviews'])
  const [inputValues, setUpInputValues] = React.useState([])
  const [products, setProducts] = React.useState([])
  const [idParams, setIdParams] = React.useState('')

  React.useEffect(()=>{
    let fetch  = async ()=>{
      let final = await axios.get('/products')
      let lastProducts = [ ...final.data ]
      setProducts(lastProducts)
    }

    fetch()

  },[])
 
  const handleChange = (event) => {
    console.log('event', event.target.value)
    let param = event.target.value
   setIdParams(param)
  }

  const inputChange = (event, index) => {
    let word = event.target.value
    inputValues[index] = word
    let final = [...inputValues]
    setUpInputValues(final)
  }

  const handleSubmit = async () => {
      await axios.post(`/product/${idParams}`, {
        stars: inputValues[0],
        review: inputValues[1],
      })
    }
  const handleCreate = async () => {
      await axios.post(`/product/`, {
        stars: inputValues[0],
        review: inputValues[1],
      })
    }

    return (
      <div>
        <p>how many bryan</p>
        <select onChange={(event) => handleChange(event)}>
          {products?.map((a) => {
            return <option value={a._id}>{a.name}</option>
          })}
        </select>
        {placeHolder.map((a, index) => {
          return (
            <input
              placeholder={a}
              onChange={(event) => inputChange(event, index)}
            />
          )
        })}
        <button onClick={()=>handleCreatet()}>Create</button>
        <button onClick={()=>handleSubmit()}>Update</button>
      </div>
    )
}

export default App
