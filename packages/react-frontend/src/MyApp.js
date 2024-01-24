import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

  function MyApp() {
    const [characters, setCharacters] = useState([]);
    function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => {
        return i !== index;
      });
      setCharacters(updated);
    }

    function updateList(person) { 
      postUser(person)
        .then(() => setCharacters([...characters, person]))
        .catch((error) => {
          console.log(error);
        })
    }

    //----------------------------------------------------
    // get table from backend by fetching
    function fetchUsers() {
      //makes a request url
      const promise = fetch("http://localhost:8000/users");
      //returns immediately with a promise
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json()) // res = object, reads response, pass to next one
        .then((json) => setCharacters(json["users_list"])) // set chars
        .catch((error) => { console.log(error); });
    }, [] ); //empty array means its done once when rendered
    //----------------------------------------------------
    // add new users to backend in addition to displaying new users
    // need to make sure app in sync with data on server
    // add new person to display once added to server data

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", { //same port
        method: "POST", // post (default get)
        headers: {
          "Content-Type": "application/json", // content =  json
        },
        body: JSON.stringify(person), // needs to be this fortmat to send to server
      });
  
      return promise;
    }

    //----------------------------------------------------
    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
      </div>
    );
    
  }

export default MyApp;