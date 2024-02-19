import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_PERSON } from '../../graphql/queries.js'


const UpdatePerson = props => {
  const { id, firstName, lastName, onButtonClick} = props;
  const [form] = Form.useForm()
  const [, forceUpdate] = useState();
  useEffect(() => {
      forceUpdate({});
    }, []);

  const [updatePerson] = useMutation(UPDATE_PERSON);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
   onButtonClick()
  };

  
  return (
    <Form
      form={form}
      name={`update-person-form-for-${id}`}
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName
      }}
    >
      <Form.Item
        name="firstName"
        label="firstName"
        rules={[{ required: true, message: "Please enter first name" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item name="lastName"
          label="lastName"
          rules={[{ required: true, message: "Please enter last name" }]}
          >
          <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item shouldUpdate={true}>
      {() => (
        <Button
          // form={form}
          type='primary'
          htmlType='submit'
          disabled={
              (!form.isFieldTouched("firstName") &&
                  !form.isFieldTouched("lastName")) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
          }
        >
          Update Person
        </Button>
      )}
    </Form.Item>
      <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdatePerson
