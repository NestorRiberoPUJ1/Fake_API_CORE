const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { faker } = require('@faker-js/faker');

class Usuario {
    constructor(data) {
        this._id = data._id
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.phone = data.phone;
        this.email = data.email;
        this.password = data.password;
    }
}

class Empresa {
    constructor(data) {
        this._id = data._id
        this.name = data.name;
        this.address = data.address;

    }
}

const randomUser = () => {
    let data = {
        _id: 0,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
    myUser = new Usuario(data);
    return myUser;
}
const randomEmpresa = () => {
    let data = {
        _id: 0,
        name: faker.company.companyName(),
        address: [
            faker.address.streetAddress(),
            faker.address.city(),
            faker.address.state(),
            faker.address.zipCode(),
            faker.address.country()
        ],
    }
    myCompany = new Empresa(data);
    return myCompany;
}

app.get("/api/users/new", (req, res) => {
    res.json(randomUser());
})

app.get("/api/companies/new", (req, res) => {
    res.json(randomEmpresa());
})

app.get("/api/user/company", (req, res) => {
    res.json({ user: randomUser(), company: randomEmpresa() });
})

app.listen(8000, () => {
    console.log("RUNNING");
});