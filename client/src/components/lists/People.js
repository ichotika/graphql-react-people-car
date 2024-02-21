import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../graphql/queries'
import { List } from 'antd'
import PeopleCard from '../listItems/PeopleCard'
import React, { useEffect } from "react";


const People = () => {
  const styles = getStyles()

  const { loading, error, data, refetch } = useQuery(GET_PEOPLE)

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`


  return (
    <div>
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <PeopleCard id={id} firstName={firstName} lastName={lastName} isShowPage={false}/>
        </List.Item>
      ))}
      
    </List>
    </div>
  )
}

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
  }
})

export default People
