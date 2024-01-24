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
      setCharacters([...characters, person]);
    }

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