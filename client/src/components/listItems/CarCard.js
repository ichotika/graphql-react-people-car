import React from 'react';
import { useState } from 'react'
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import RemoveCar from '../buttons/RemoveCar';
import UpdateCar from '../forms/UpdateCar';


const CarCard = ({ car }) => {
    const {id, year, make, model, price, personId} = car
    const [editMode, setEditMode] = useState(false)
    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    return (
        <div>
        {editMode ? (
        <UpdateCar car={car}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
        style={{ marginTop: 16,  width: '800px'}}
        type="inner"
        title={`${year} ${make} ${model} -> $ ${price.toLocaleString()}`}
        actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />   
                ]}
        >
        </Card>
      )}
        </div>  
    )
};

export default CarCard;
