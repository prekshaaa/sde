import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./search.css";
import './App.css';

export default function App() {
  const [allData,setAllData] = useState([]);
  const [filteredData,setFilteredData] = useState(allData);

  const handleSearch = (event) =>{
    /*let value = event.target.value;

    if(value !== ' '){
      const results = setAllData.filter((job) => {
        return job.title.toLowerCase().startsWith(value.toLowercase());
      });
      setFilteredData(results);
    }
    else{
      setFilteredData(setAllData);
    }
  };*/
  let value = event.target.value.toLowerCase();
  let result = [];
  console.log(value);
  result = allData.filter((data) => {
  return data.title.search(value) !== -1;
  });
  setFilteredData(result);
  }

  useEffect(() => {
    axios('https://beta.gigvistas.com/web-app-api/website/api/v1/gig/search?searchTerm=java&pageNumber=0')
    .then(response => {
      console.log(response.data)
      setAllData(response.data);
      setFilteredData(response.data);
    })
    .catch(error => {
      console.log('Error getting fake data: ' + error);
    })
  }, []);

  const styles = {
    display:'inline',
    width:'30%',
    height:50,
    float:'left',
    padding:5,
    border:'0.5px solid black',
    marginBottom:10,
    marginRight:10
  }

  return(
    <>
    <div className="container">
        <div className="headingContainer">
            <h4 className="styleH4">Find Gigs</h4>
        </div>
        <form autoComplete="off" noValidate="" className="form">
            <div display= "block" className="searchbarContainer">
                <div className="inputContainer">
                    <input className="input" placeholder="Eg. web developer, python, customer service" type="text" onChange={(event) =>handleSearch(event)}/>
                    <button className="button" tabindex="0" type="button">Search Gigs</button>
                </div>
                <fieldset className="fieldset" aria-hidden="true"></fieldset>
            </div>
        </form>
        <div>
          {filteredData.map((value) =>{
            return(
              <div key= {value.id} style={styles}>
                {value.title}
              </div>
            )
          })}
        </div>
    </div>
    </>
  );  
}
