import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import {Button,EditableText,InputGroup,Toaster} from '@blueprintjs/core';

const AppToster=Toaster.create({
  position:"top"
})
function App() {
  const [users, setUser] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

{/*===================== GET METHOD TO FETCH DATA*============*/}

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') // Call fetch as a function
      .then((response) => response.json())
      .then((json) => setUser(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


{/* ======================POST METHOD TO ADD DATA=================
  trim value munnadi pinnadi iruka space a trime pannitum   */}


  function adduser(){
    const name=newName.trim();
    const email=newEmail.trim();
    const website=newWebsite.trim();

    {/* inga irunthu http ku post request kututhu data va add panna porom  */}
    {/* header la addtional needed data va anupuvom like nama anupa porathu json datathan entha encode method use pannurom tra mathiriyana details*/}


    if (name && email && website){

      fetch('https://jsonplaceholder.typicode.com/users',
        {
          method:"POST",
          body: JSON.stringify({
            name,
            email,
            website
    
          }),

          headers:{

            "content-Type":"application/json;charset =UTF-8"

          }
        }
      )
      .then((response) => response.json())
      .then(data => {
        setUser([...users,data]);
        AppToster.show({
          message:"user add successfully !",
          intent :"success",
          timeout:3000

        })
        setNewEmail("");
        setNewName("");
        setNewWebsite("");
      })
      


    }
  }

{/*=============UPDATE THE DATA (PUT request)=============== */}
  function onChnageHandler(id,key,value){
    setUser((users)=>{
      return users.map(user=>{
        return user.id ===id ? {...user,[key]:value}:user;
      })
    })
 
  }
  {/*==================(PUT request)=============== 
    intha json placeholder la pathigana get post ku url marathu but "put,delete" ku maarum*
    epadina `url/${specific id)`   " ` " intha symbol use pannanum*/}

  function updateUser(id){
    const user =users.find((user) => user.id===id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method:"PUT",
        body: JSON.stringify(user),

        headers:{

          "content-Type":"application/json;charset =UTF-8"

        }
      }
    )
    .then((response) => response.json())
    .then(data => {
      
      AppToster.show({
        message:"user updated successfully !",
        intent :"success",
        timeout:3000

      })
      setNewEmail("");
      setNewName("");
      setNewWebsite("");
    })

  }



{/*=============DELETE THE DATA=============== */}

function deleteUser(id){
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
    {
      method:"DELETE",
     
    }
  )
  .then((response) => response.json())
  .then(data => {
     setUser((users)=>{
      return users.filter((user)=>user.id!==id)
    })
    AppToster.show({
      message:"user Deleted successfully !",
      intent :"success",
      timeout:3000

    })

  })

}




  return (
    <div className="App">
      <table className="bp4-html-table modifier">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mail</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td><EditableText onChange={val => onChnageHandler(user.id,"email",val)} value={user.email}/></td>
              <td><EditableText onChange={val => onChnageHandler(user.id,"website",val)} value={user.website}/></td>
              <td> 
                  <Button intent='primary'onClick={()=> updateUser(user.id)}>Update</Button>
                  &nbsp;
                  <Button intent="danger" onClick={()=> deleteUser(user.id)}>delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      
        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup
              value={newName}
              onChange={(e)=>setNewName(e.target.value)}
              placeholder='enter u r name'
              />
              </td>
              <td>
              <InputGroup
              value={newEmail}
              onChange={(e)=>setNewEmail(e.target.value)}
              placeholder='enter u r email'
              />
              </td>
              <td>
              <InputGroup
              value={newWebsite}
              onChange={(e)=>setNewWebsite(e.target.value)}
              placeholder='enter u r website'
              />
            </td>
            <td>
              <Button intent='success'onClick={adduser}>add user</Button>
            </td>
          </tr>
        </tfoot>
      
         
      </table>
    </div>
  );
}

export default App;
