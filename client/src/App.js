import './App.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title'
import AddPerson from './components/forms/AddPerson'
import AddCar from './components/forms/AddCar'
import People from './components/lists/People'
import { Divider } from 'antd'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Title />
        <Divider />

        <Divider orientation="center" style={{ fontSize: "1.3rem", fontWeight: "bold", paddingBottom: "1.5rem"}}>
          Add Person
        </Divider>
        <AddPerson />

        <Divider orientation="center" style={{ fontSize: "1.3rem", fontWeight: "bold", paddingBottom: "1.5rem"}}>
          Add Car
        </Divider>
        <AddCar />
       
        <Divider orientation="center" style={{ fontSize: "1.3rem", fontWeight: "bold", paddingBottom: "1.5rem"}}>
          Records
        </Divider>
        <People />
      </div>
    </ApolloProvider>
  )
}

export default App
