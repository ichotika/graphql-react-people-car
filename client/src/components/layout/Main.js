import React from 'react'
import "../../App.css"
import { Divider } from 'antd'
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from '../../graphql/queries';
import Title from './Title'
import AddPerson from '../forms/AddPerson';
import AddCar from '../forms/AddCar';
import People from '../lists/People';


function Main() {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Title />
      <Divider />

      <Divider orientation="center" style={{ fontSize: "1.3rem", fontWeight: "bold", paddingBottom: "1.5rem"}}>
          Add Person
        </Divider>
      <AddPerson />

      {data.people.length === 0 ? (<p>Start by add first person before add car</p>):(
        <>
         <Divider orientation="center" style={{ fontSize: "1.3rem", fontWeight: "bold", paddingBottom: "1.5rem"}}>
          Add Car
        </Divider>
        <AddCar   />
        </>
      )}
  

      <Divider orientation="center" style={{ fontSize: "1.3rem", fontWeight: "bold", paddingBottom: "1.5rem"}}>
          Records
      </Divider>
      <People />
    </div>
  )
}

export default Main
