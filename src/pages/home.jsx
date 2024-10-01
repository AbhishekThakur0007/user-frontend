import React, { useState } from 'react'
import { useGetUserQuery, useDeleteUserMutation } from '../services/userApi'
import CreateForm from '../components/createForm';
import Update from '../components/update';

const Home = () => {
  const [deleteUser] = useDeleteUserMutation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('');
  const [id, setId] = useState('');
  const { data, refetch } = useGetUserQuery({ page, search, age, gender });
  const users = data && data.users ? data.users : [];
  console.log(users)
  const totalPage = data && data.totalPages ? data.totalPages : 1;

  const handleGender = (e) => {
    setGender(e.target.value)
  }

  const deleteHander = async (userId) => {
    await deleteUser(userId)
    await refetch();
    // console.log(userId);
  }
  const handleUpdate =(id)=>{
    setId(id)
  } 
  return (
    <div>
      <CreateForm />
      
      <input type="text" placeholder='Search By Name' value={search} onChange={(e) => { setSearch(e.target.value) }} />
      <input type="Number" placeholder='Maximum By age' value={age} onChange={(e) => { setAge(e.target.value) }} />
      <select name="" value={gender} onChange={handleGender} id="">
        <option value="" >Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Create User
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Gender</th>

            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            users && users.map((user) => {
              return <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" onClick={()=>handleUpdate(user._id)} data-bs-target={`#${user._d}`}>
                  update
                </button></td>
                <td><button type='button' onClick={() => deleteHander(user._id)}>delete</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
      <Update user= {id} />
      {totalPage && page > 1 && <button onClick={() => { setPage(page - 1) }}>Previous</button>}
      {totalPage && totalPage > page && <button className='btn btn-primary' onClick={(e) => { setPage(page + 1) }}>Next</button>}
    </div>
  )
}

export default Home
