import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import "./App.css"

function App() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [info, setInfo] = useState(null)

  const handleClick = () => {

    axios.get(`https://api.agify.io/?name=${name}`)
      .then((res) => {
        setInfo(res.data);
        setId(res.data.country_id);
      });
  }
  const whenClick = () => {

    axios.get(`https://api.agify.io/?name=${name}&country_id=${id}`)
      .then((res) => {
        setInfo(res.data);
        setId(res.data.country_id);
      });
  }

  useEffect(() => {
    handleClick();
    whenClick();
  }, []);


  return (
    <div className='name'>
      <h2>Average Age of Persons with a Given Name</h2>
      <h3>Search Globally or By Country</h3>

      <div className='name_second'>
        <input type="text"
          className='one'
          placeholder='name (Eg: Green)'
          onChange={(e) => {
            setName(e.target.value)
          }} />
        <button onClick={handleClick}>Find Out</button>

        <input type="text"
          className='two'
          placeholder='country ID (Eg: US)'
          onChange={(e) => {
            setId(e.target.value)
          }} />
        <button onClick={whenClick}>Find Out</button>
      </div>
      <div className='name_third'>
        <h3>Average Age: <span>{info?.age}</span></h3>
        <h3>Name: <span>{info?.name}</span></h3>

        <h3>Name Count: {!!info?.count && < span > {info?.count}</span>}</h3>

        <h3>Country:  {!!id ? <span>{id}</span> : <span >Globally</span >}</h3>

      </div>

      <p>*The API follows ISO 3166-1 alpha-2 for country codes. See <a href="https://agify.io/our-data">Data </a>for list of all supported countries. For Analytics and Use Cases <a href="https://agify.io/use-cases">See More</a>. </p>

      <p>Created By <a href="https://greenojegwo.netlify.app/">Green</a>.</p>
    </div>
  )
}

export default App;