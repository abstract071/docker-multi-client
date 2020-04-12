import React, { Component } from 'react'
import axios from 'axios'

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  }

  componentDidMount() {
    this.fetchIndexes()
    this.fetchValues()
  }

  async fetchIndexes() {
    const { data: seenIndexes } = await axios.get( '/api/values/all' )
    this.setState( { seenIndexes } )
  }

  async fetchValues() {
    const { data: values } = await axios.get( '/api/values/current' )
    this.setState( { values } )
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map( ( { number } ) => number ).join( ', ' )
  }

  renderValues() {
    const entries = []

    for ( let key in this.state.values ) {
      entries.push(
        <div key={ key }>
          For index { key } I calculated { this.state.values[ key ] }
        </div>
      )
    }

    return entries
  }

  handleSubmit = async ( event ) => {
    event.preventDefault()

    await axios.post( '/api/values', {
      index: this.state.index
    } )

    this.setState( {
      index: ''
    } )
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="">Enter your index:</label>
          <input
            value={ this.state.index }
            onChange={ event => this.setState( { index: event.target.value } ) }
          />
          <button>Submit</button>

          <h3>Indexes I have seen:</h3>
          { this.renderSeenIndexes() }

          <h3>Calculated values:</h3>
          { this.renderValues() }
        </form>
      </div>
    )
  }
}

export default Fib
