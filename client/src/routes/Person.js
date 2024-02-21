import React, { useEffect } from "react";
import { Link ,useParams } from "react-router-dom";
import { GET_PERSON } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import PeopleCard from "../components/listItems/PeopleCard";
import "../App.css";


const Person = () => {
  let { id } = useParams();
  // console.log("print id from route", id);

  const { loading, error, data, refetch } = useQuery(GET_PERSON, {
    variables: { id },
  });


  useEffect(() => {
    refetch();
  }, [id, refetch]);



  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;


  return (
    <div className='App'>
      <Link to="/" style={{alignSelf:"start", marginBottom: "2rem"}}>
       <p>GO BACK HOME</p>
      </Link>

  
      <PeopleCard  id={data?.person.id} firstName={data?.person.firstName} lastName={data?.person.lastName} detailPage={true} />
    </div> 
  );
};

export default Person;
