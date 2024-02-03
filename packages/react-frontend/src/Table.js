import React from "react";

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Job</th>
          <th>Delete</th>
          
        </tr>
      </thead>
    );
  }

  
 // had to change to _id from id
  function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row._id}</td>
          <td>{row.name}</td>
          <td>{row.job}</td>
          <td>
            <button onClick={() => props.removeCharacter(index, row._id)}>
              Delete
            </button>
          </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
  }
  

  function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody
          characterData={props.characterData}
          removeCharacter={props.removeCharacter}
        />
      </table>
    );
  }

export default Table;


  
 
