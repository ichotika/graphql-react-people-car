import { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_CAR, GET_PEOPLE,GET_CARS_PERSON_ID} from '../../graphql/queries'


const UpdateCar = ({car, onButtonClick}) => {
    const {id, year, make, model, price, personId} = car
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    
    const { loading, error, data } = useQuery(GET_PEOPLE)
    const [people, setPeople] = useState([]);
    // console.log('print people from update car ',data)
    useEffect(() => {
        if (data && data.people) {
          const options = data.people.map((person) => ({
            value: person.id,
            label: `${person.firstName} ${person.lastName}`,
          }));
          setPeople(options);
        }
        forceUpdate({});
      }, [data]);
    
    
    const [updateCar] = useMutation(UPDATE_CAR);
    const onFinish = (values) => {
        const { year, make, model, price, personId } = values;

    updateCar({
      variables: {
        id,
        year: parseInt(year),
        make, 
        model, 
        price: parseFloat(price),
        personId
      },
      update: (cache, { data: { updateCar } }) => {
        const data = cache.readQuery({
          query: GET_CARS_PERSON_ID,
          variables: { personId },
        });
        if (!data) return;
        cache.writeQuery({
          query: GET_CARS_PERSON_ID,
          data: {
            ...data,
            cars: [...data.carsPersonId, updateCar],
          },
        });
      },
    });
    onButtonClick();
  };

  return (
    <div>
    <Form
      form={form}
      name='update-car-form'
      layout='inline'
      onFinish={onFinish}
      style={{ marginBottom: '40px', justifyContent:"center", gap: "1rem" }}
      initialValues={{
        year,
        make, 
        model, 
        price,
        personId
      }}
    >
      <Form.Item
        name="year"
        label="Year"
        rules={[{ required: true, message: "Please enter a year" }]}
      >
        <InputNumber placeholder="Year" min={1}/>
      </Form.Item>

      <Form.Item name="make"
          label="Make"
          rules={[{ required: true, message: "Please enter company name made the car" }]}
          >
          <Input placeholder="Make" />
      </Form.Item>

      <Form.Item
          name="model"
          label="Model"
          rules={[{ required: true, message: "Please enter the car model" }]}
        >
          <Input placeholder="Model" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber prefix="$" min={1} />
        </Form.Item>

        <Form.Item
          name="personId"
          label="Person"
          rules={[{ required: true, message: "Please select a person" }]}
        >
          <Select placeholder="Select a person" options={people} />
        </Form.Item>


        <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
                (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length 
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
    </div>
  )
}

export default UpdateCar
