
# E-Commerce Backend

![MIT Licence](https://img.shields.io/badge/licence-MIT-green?style=flat)

## Description

This is an example of a simple e-commerce backend RESTful API which interfaces with the Sequelize ORM to maintain a database of Products which are have one category and many tags.

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Technology](#technology)
- [Credits](#credits)
- [License](#licence)

## Installation

To install this project

1. Install and configure MySQL (if you haven't already)
2. Clone this repo
3. Create the database in MySQL by running the schema file `<project-root>/db/schema.sql`
4. From the root directory of the repo, run `npm i`
5. Create a .env file in the root directory with the following secrets configured to enable access to your database: 
```
DB_NAME="ecommerce_db"
DB_USER=<The username for your database>
DB_PASSWORD=<The corresponding password>
```
6. (optional) If you would like some dummy data to test this application out with, from the project root directory, execute `npm run seed` to provide some simple seed data.

## Usage

As this project is a RESTful interface for a database, natually it is used primarily by HTTP requests. 

To run the server, either `npm run start` or `node server.js`.

There are 3 primary endpoints which can be targeted with requests:

- Tags: /api/tags
- Categories: /api/categories
- Product: /api/products

***

### Tags endpoint - /api/tags

#### GET /api/tags

Get all tags and associated products

##### Example request
```
const options = {method: 'GET'};

fetch('http://localhost:3001/api/tags/', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### GET /api/tags/\<id>

Get a specific tag and associated products by ID

##### Example request
```
const options = {method: 'GET'};

fetch('http://localhost:3001/api/tags/1', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

```

#### POST /api/tags

Create a new tag

##### Example request
```
const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: '{"tag_name":"Cheese related"}'
};

fetch('http://localhost:3001/api/tags/', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### PUT /api/tags/\<id>

Update a specific tag by ID. 

Updateable Fields are: 
- tag_name

##### Example request
```
const options = {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: '{"tag_name":"Extra Cheddar"}'
};

fetch('http://localhost:3001/api/tags/9', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### DELETE /api/tags/\<id>

Delete a specific tag by ID

##### Example Request
```
const options = {method: 'DELETE'};

fetch('http://localhost:3001/api/tags/9', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

***

### Categories endpoint - /api/categories

#### GET /api/categories

Get all categories and associated products

##### Example request
```
const options = {method: 'GET'};

fetch('http://localhost:3001/api/categories', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### GET /api/categories/\<id>

Get a specific category and associated products by ID

##### Example request
```
const options = {method: 'GET'};

fetch('http://localhost:3001/api/categories/1', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

```

#### POST /api/categories

Create a new category

##### Example request
```
const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: '{"category_name":"Socks"}'
};

fetch('http://localhost:3001/api/categories/', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### PUT /api/categories/\<id>

Update a specific category by ID. 

Updateable Fields are: 
- tag_name

##### Example request
```
const options = {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: '{"category_name":"Foot Bags"}'
};

fetch('http://localhost:3001/api/categories/6', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### DELETE /api/categories/\<id>

Delete a specific categore by ID 

**Warning: This will delete all products in this category**

##### Example Request
```
const options = {method: 'DELETE'};

fetch('http://localhost:3001/api/categories/6', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

***

### Product Endpoint - /api/products

#### GET /api/products

Get all products and associated tags and categories

##### Example request
```
const options = {method: 'GET'};

fetch('http://localhost:3001/api/products/', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### GET /api/products/\<id>

Get a specific product and associated tags and categories by ID

##### Example request
```
const options = {method: 'GET'};

fetch('http://localhost:3001/api/products/4', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

```

#### POST /api/products

Create a new product. The body requires the following values: 
- product_name - string
- price - float
- stock - unsigned integer 
- tagIds - array of tag IDs
- category_id - category ID

##### Example request
```
const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: '{"product_name":"Cheese Wedge Hat","price":50,"stock":10,"tagIds":[8],"category_id":4}'
};

fetch('http://localhost:3001/api/products/', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### PUT /api/products/\<id>

Update a specific product by ID. 

Updateable Fields that can be included in the body are: 
- product_name - string
- price - float
- stock - unsigned integer 
- tagIds - array of tag IDs
- category_id - category ID

##### Example request
```
const options = {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: '{"product_name":"Cheese Wheel Hat","price":151,"stock":10,"tagIds":[5,6,7]}'
};

fetch('http://localhost:3001/api/products/8', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### DELETE /api/products/\<id>

Delete a specific product by ID

##### Example Request
```
const options = {method: 'DELETE'};

fetch('http://localhost:3001/api/products/7', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

## Tests

No tests are provided for this application.

## Technology

- Node.js
- MySQL
- MySQL2 (NPM package)
- Sequelize
- dotenv
- express.js


## Credits

- James Prince
- 2U Education (starter code)



## Licence

URL: https://choosealicense.com/licenses/mit/

```

  MIT License

  Copyright (c)  James Prince
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
```

  

---

## How to Contribute

No contributions are sought at this time.

## Questions

[My Github](https://github.com/Auralise)

[Email me](mailto:james.prince1@gmail.com)

---

Copyright &copy; 2022, James Prince
