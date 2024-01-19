require('dotenv').config()

const geolib = require('geolib');

const Pool = require('pg').Pool
const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "db_management",
  password: "root",
  port: 5432,
})

// Our first endpoint will be a GET request. 
// Inside the pool.query() we can put the raw SQL that will touch the api database. 
// We’ll SELECT all users and order by id.

const getUsers = (request, response) => {
    const { search } = request.query;

    let query = 'SELECT * FROM users'

    if (search) {
      query += `
      WHERE 
        name ILIKE '%${search}%' OR 
        email ILIKE '%${search}%' OR 
        phone ILIKE '%${search}%' OR 
        CAST(latitude AS TEXT) ILIKE '%${search}%' OR 
        CAST(longitude AS TEXT) ILIKE '%${search}%'
    `;
    }

    query += ' ORDER BY id ASC';

    pool.query(query, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }

  const getCalculateRoute = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      const company = { latitude: 0, longitude: 0 };
      const clients = results.rows
      const customersWithdistance = clients.map(client => {
        if (client.latitude !== undefined && client.longitude !== undefined && client.latitude !== null && client.longitude !== null) {
          return {
            ...client,
            distance: geolib.getDistance(company, client),
          };
        } else {
          // Handle cases where latitude or longitude are undefined or null
          return {
            ...client,
            distance: null,
          };
        }
      });
      
      // Sort customers by distance
      const routeOrdered = customersWithdistance.sort((a, b) => a.distance - b.distance);
      
      response.status(200).json(routeOrdered)
    })
  }

// For our /users/:id request, we’ll be getting the custom id parameter by the URL and using a WHERE clause to display the result.

// In the SQL query, we’re looking for id=$1. In this instance, $1 is a numbered placeholder,
// which PostgreSQL uses natively instead of the ? placeholder you may be familiar with from other flavors of SQL.

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//   The API will take a GET and POST request to the /users endpoint. In the POST request, we’ll be adding a new user. 
//   In this function, we’re extracting the name and email properties from the request body, and INSERTing the values.

  const createUser = (request, response) => {
    const { name, email, phone, latitude, longitude } = request.body
  
    pool.query('INSERT INTO users (name, email, phone, latitude, longitude) VALUES ($1, $2, $3, $4, $5)', 
    [name, email, phone, latitude, longitude], (error, result) => {
      if (error) {
        throw error
      }
      
      response.status(201).send(`User added with ID: ${result.insertId}`);
      // troubleshoot this line of code further, not functioning correctly
    })
  }

//   The /users/:id endpoint will also take two HTTP requests — the GET we created for getUserById, and also a PUT, to modify an existing user. 
//   For this query, we’ll combine what we learned in GET and POST to use the UPDATE clause.

//   It is worth noting that PUT is idempotent, meaning the exact same call can be made over and over and will produce the same result. 
//   This is different than POST, in which the exact same call repeated will continuously make new users with the same data.

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email, phone, latitude, longitude } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2, phone = $3, latitude = $4, longitude = $5 WHERE id = $6',
      [name, email, phone, latitude, longitude, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

//   Finally, we’ll use the DELETE clause on /users/:id to delete a specific user by id. 
//   This call is very similar to our getUserById() function.

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getCalculateRoute
  }
