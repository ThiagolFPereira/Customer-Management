import React, { useState, useEffect } from 'react';
import NewUserForm from './Components/NewUserForm';
import EditUserForm from './Components/EditUserForm';

const App = () => {

  const initialFormState = {
    id: '',
    name: '',
    email: '',
    phone: '',
    latitude: '',
    longitude: '',
  }

  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [editing, setEditing] = useState(false)
  const [search, setSearch] = useState('');
  const [routeOptimized, setRouteOptimized] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [search])

  const fetchUsers = async () => {
    if (search) {
      const response = await fetch(`http://localhost:9000/users?search=${search}`);
      const data = await response.json();
      return setUsers(data)
    }
    const result = await fetch(`http://localhost:9000/users`)
    result
      .json()
      .then(result => setUsers(result))
      .catch(e => console.log(e))
  }

  const handleInputChange = event => {
    const { id, value } = event.target
    setCurrentUser({ ...currentUser, [id]: value })
  }

  const submitNewUser = async (event) => {
    event.preventDefault()

    const response = await fetch('http://localhost:9000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    })
    response
      .json()
      .then(result => setUsers(result))
      .catch(e => console.log(e))

    fetchUsers()
    setCurrentUser(initialFormState)
  }

  const handleCalculateRoute = async () => {
    try {
      const result = await fetch('http://localhost:9000/calculate-route');
      
      result
      .json()
      .then(result => setRouteOptimized(result))
      .catch(e => console.log(e));

    } catch (error) {
      console.error('Error when calculating route:', error);
    }
  };

  const deleteUser = async (item) => {
    const response = await fetch(`http://localhost:9000/users/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    response
      .json()
      .then(result => setUsers(result), fetchUsers())
      .catch(e => console.log(e))
  }

  const editUser = item => {
    setEditing(true)
    setCurrentUser({ id: item.id, name: item.name, email: item.email, phone: item.phone, latitude: item.latitude, longitude:item.longitude })
  }

  const submitUserEdit = async (event) => {
    event.preventDefault()

    const response = await fetch(`http://localhost:9000/users/${currentUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    })
    response
      .json()
      .then(result => setUsers(result))
      .catch(e => console.log(e))

    fetchUsers()
    setCurrentUser(initialFormState)
    setEditing(false)

  }

  return (
    <div className="container">
      <h1>Management System Clients</h1>

      <div className="flex-row">
        {editing ?
          <div className="flex-large">
            <EditUserForm
              submitUserEdit={submitUserEdit}
              handleInputChange={handleInputChange}
              currentUser={currentUser}
            />
          </div>
          :
          <div className="flex-large">
            <NewUserForm
              submitNewUser={submitNewUser}
              handleInputChange={handleInputChange}
              currentUser={currentUser}
            />
          </div>
        }

        <div className="flex-large">
        <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search clients..."
      />
    </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(item =>
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                  <td>
                    <button onClick={() => editUser(item)} className="muted-button" >Edit</button>
                    <button onClick={() => deleteUser(item)} style={{ marginLeft: 5 }} className="muted-button" >Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div>
              <button onClick={handleCalculateRoute}>Calculate Optimized Route</button>
            <div>
              <h3>Optimized Route:</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {routeOptimized.map((client, index) =>
                  <tr key={index}>
                    <td>{client.name}</td>
                    <td>{client.latitude}</td>
                    <td>{client.longitude}</td>
                  </tr>
                )}
              </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
