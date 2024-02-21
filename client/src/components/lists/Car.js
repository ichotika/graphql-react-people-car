import { useQuery } from '@apollo/client'
import { GET_CARS } from '../../graphql/queries'
import { List } from 'antd'
import CarCard from '../listItems/CarCard'
import react ,{ useEffect } from 'react'


const Car = ({id}) => {
  const styles = getStyles()

  const { loading, error, data, refetch } = useQuery(GET_CARS)
  useEffect(() => {
    refetch();
  }, [refetch, id]);

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  console.log('data from car component', data)

  const filteredCars = data?.cars.filter(car => car.personId === id)

  return (
    <div>
      <List>
        {filteredCars.map(car => (
          <List.Item key={car.id}>
            <CarCard car={car} personId={id}/>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

export default Car
