import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PEOPLE,
  REMOVE_PERSON,
  REMOVE_CARS_BY_PERSON_ID,
  REMOVE_CAR,
  GET_CARS,} from '../../graphql/queries'
import filter from 'lodash.filter'


const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
    
      if (people) {
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            people: people.filter((p) => p.id !== removePerson.id),
          },
        });
      }
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this person?')
    
    console.log("remove person id",id)
    if (result) {
      removePerson({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemovePerson
