import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Form, Input, Divider } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, GET_PEOPLE } from '../../graphql/queries';

const AddPerson = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [addPerson] = useMutation(ADD_PERSON);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });

        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson], 
          },
        });
      },
    });
    form.resetFields();
  };

  return (
    <div>
      <Divider orientation="center" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        Add Person
        </Divider>
      <Form
        name='add-person-form'
        layout='inline'
        size='large'
        style={{ marginBottom: '40px' }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label='First Name'
          name='firstName'
          rules={[{ required: true, message: 'Please enter a first name' }]}
        >
          <Input placeholder='e.g. John' />
        </Form.Item>
        <Form.Item
          label='Last Name'
          name='lastName'
          rules={[{ required: true, message: 'Please enter a last name' }]}
        >
          <Input placeholder='e.g. Smith' />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

const getStyles = () => ({
  title: {
    fontSize: 20,
    padding: '15px',
    // marginBottom: '50px'
  },
});

export default AddPerson;
