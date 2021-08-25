import React, { useState } from 'react'
import axios from 'axios'

class App extends React.Component {
  state = {
    products: {},
    reviewInputs: [1, 2],
    inputValues: [],
    idParams: '',
  }
  componentDidMount = async () => {
    let final = await axios.get('/products')
    let lastProducts = { ...final }
    this.setState({ products: lastProducts })
  }
  handleChange = (event) => {
    console.log('event', event.target.value)
    let param = event.target.value
    this.setState({ idParams: param })
  }
  inputChange = (event, index) => {
    let word = event.target.value
    console.log('hey', index)
    let final = [...this.state.inputValues]
    final[index] = word
    this.setState({ inputValues: final })
  }
  handleSubmit = async () => {
    console.log('params', this.state.idParams)
    console.log('stars', this.state.inputValues[0])
    console.log('review', this.state.inputValues[1])
    await axios.post(`/product/${this.state.idParams.toString()}`, {
      stars: this.state.inputValues[0],
      review: this.state.inputValues[1],
    })
  }
  render() {
    console.log('products', this.state.products)
    let placeHolder = ['stars', 'reviews']
    return (
      <div>
        <p>how amny</p>
        <select onChange={() => this.handleChange(event)}>
          {this.state.products.data?.map((a) => {
            return <option value={a._id}>{a.name}</option>
          })}
        </select>
        {this.state.reviewInputs.map((a, index) => {
          return (
            <input
            onChange={() => this.inputChange(event, index)}
              placeholder={placeHolder[index]}
            />
          )
        })}
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    )
  }
}

export default App
