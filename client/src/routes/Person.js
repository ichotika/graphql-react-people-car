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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await refetch();
  //     } catch (error) {
  //       console.error("Error refetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [id, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);



  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log("Person", data);
  console.log("data?.person", data?.person);
  console.log("data?.car", data?.person.cars);

  

  return (
    <div>
      <Link to="/" >
       <p>Go Back</p>
      </Link>

  
      <PeopleCard  id={data?.person.id} firstName={data?.person.firstName} lastName={data?.person.lastName} detailPage={true} />
    </div> 
  );
};

export default Person;
