import lodash from "lodash";


const people = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Ice",
    lastName: "Bear",
  },
  {
    id: "4",
    firstName: "Chotika",
    lastName: "Imvimol",
  },
];

const cars = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "999",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura",
    model: "MDX",
    price: "60000",
    personId: "2",
  },
  {
    id: "5",
    year: "2000",
    make: "Toyota",
    model: "Jazz",
    price: "800",
    personId: "2",
  },
  {
    id: "6",
    year: "2001",
    make: "Audi",
    model: "A5",
    price: "55000",
    personId: "3",
  },
  {
    id: "7",
    year: "2022",
    make: "BMW",
    model: "M3",
    price: "50000",
    personId: "3",
  },
  {
    id: "8",
    year: "2004",
    make: "Tesla",
    model: "X",
    price: "60000",
    personId: "3",
  },
  {
    id: "9",
    year: "2008",
    make: "Opel",
    model: "Astra",
    price: "15000",
    personId: "4",
  },
];


const typeDefs = `
  type People {
    id: String!
    firstName: String 
    lastName: String
    cars: [Car]
  }

  type Car {
    id: String!,
    year: Int,
    make: String,
    model: String,
    price: Float,
    personId: String!
  }

  type Query {
    people: [People]
    person(id: String!): People
    cars: [Car]
    car(id: String!): Car
    carsPersonId(personId: String!): [Car]
    personCars(id: String!): People

  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): People
    updatePerson(id: String!, firstName: String, lastName: String): People
    removePerson(id: String!): People

    addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
    updateCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
    removeCar(id: String!): Car
    removeCarPersonId(personId: String!): [Car]
  }
`;


const resolvers = {
  Query: {
    people: () => people,
    person: (root, { id }) => people.find((person) => person.id === id),
    cars: () => cars,
    car: (root, { id }) => cars.find((car) => car.id === id),
    carsPersonId: (root, { personId }) =>
      cars.filter((car) => car.personId === personId),
    personCars: (root, { id }) => {
      const person = people.find((person) => person.id === id);
      if (!person) {
        throw new Error(`no person with id ${id}`);
      }
      const carsOfPerson = cars.filter((car) => car.personId === id);
      return { ...person, cars: carsOfPerson };
    },
  },
  People: {
    cars: (person) => cars.filter(car => car.personId === person.id)
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: Date.now().toString(),
        firstName: args.firstName,
        lastName: args.lastName,
      };

      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (root, args) => {
      const person = people.find((person) => person.id === args.id);
      if (!person) {
        throw new Error(`no person with id ${args.id}`);
      }
      person.firstName = args.firstName;
      person.lastName = args.lastName;
      return person;
    },
    removePerson: (root, args) => {
      const personIndex = people.findIndex((person) => person.id === args.id);

      if (personIndex === -1) {
        throw new Error(`no person with id ${args.id}`);
      }
      const removedPeople = people.splice(personIndex, 1);
      return removedPeople[0];
    },
    addCar: (root, args) => {
      const newCar = {
        id: Date.now().toString(),
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (root, args) => {
      const car = cars.find((car) => car.id === args.id);
      if (!car) {
        throw new Error(`no car with ID ${args.id}`);
      }
      car.year = args.year;
      car.make = args.make;
      car.model = args.model;
      car.price = args.price;
      car.personId = args.personId;
      return car;
    },
    removeCar: (root, args) => {
      const carIndex = cars.findIndex((car) => car.id === args.id);

      if (carIndex === -1) {
        throw new Error(`no car with ID ${args.id}`);
      }
      const removedCars = cars.splice(carIndex, 1);
      return removedCars[0];
    },
    removeCarPersonId: (root, args) => {
      const removedCars = lodash.filter(
        cars,
        (car) => car.personId === args.personId
      );

      if (removedCars.length === 0) {
        throw new Error(`no car with Owner ID ${args.personId}`);
      }

      lodash.remove(cars, (car) => car.personId === args.personId);

      return removedCars;
    },
  },
};

export { typeDefs, resolvers };
