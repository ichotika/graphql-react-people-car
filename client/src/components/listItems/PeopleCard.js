import { useState } from 'react'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../forms/UpdatePerson'
import { EditOutlined } from '@ant-design/icons'
import Car from '../lists/Car'
import { Link } from "react-router-dom";


const PeopleCard = ({ id, firstName, lastName, detailPage=false }) => {
  const styles = getStyles()
  const [editMode, setEditMode] = useState(false)
  const [editPersonId, setEditPersonId] = useState(null);
  

  const handleButtonClick = () => {
    setEditMode(!editMode)
    setEditPersonId(id);
  }


  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick} 
        />
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />, 
            <RemovePerson id={id} key={id} />,
          ]}
        >
          <Car id={id}/>

          
          {!detailPage && (
            <Link to={`/person/${id}`}>
              <p style={{ color: "blue", fontSize: "1rem" }}>Learn More</p>
            </Link>
          )}
        </Card>
      )}
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '100%'
  }
})

export default PeopleCard
