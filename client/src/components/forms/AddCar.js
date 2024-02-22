import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input,  InputNumber, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, GET_CARS, GET_PEOPLE} from '../../graphql/queries';

function AddCar() {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [addCar] = useMutation(ADD_CAR);
  const {loading, error, data } = useQuery(GET_PEOPLE);
  const [people, setPeople] = useState([]);
  
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

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        if (!data) return;
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
    form.resetFields();
  };

  return (
    <div style={{display:"flex"}}>
      <Form
        name="add-car"
        layout="inline"
        size="large"
        form={form}
        style={{ justifyContent: "center", gap: "1rem", marginBottom: '40px', }}
        onFinish={onFinish}
      >
        <Form.Item
          name="year"
          label="Year"
          rules={[{ required: true, message: "Please enter a year" }]}
        >
          <InputNumber placeholder='Year' min={1}/>
        </Form.Item>

        <Form.Item
          name="make"
          label="Make"
          rules={[{ required: true, message: "Please enter company name made the car" }]}
        >
          <Input placeholder="Make" />
        </Form.Item>

        <Form.Item
          name="model"
          label="Model"
          rules={[{ required: true, message: "Please enter the Car Model" }]}
        >
          <Input placeholder="Model" style={{width: '150px'}}/>
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
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length ||
                !people.length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddCar;
