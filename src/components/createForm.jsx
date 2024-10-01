
import React, { useState } from 'react'
import { useCreateUserMutation } from '../services/userApi';

const CreateForm = () => {
  const [createUser] = useCreateUserMutation();
  const [name, setName] = useState('');
  const [age, setAge] = useState(23);
  const [gender, setGender] = useState();
  const [email, SetEmail] = useState();
  const [photo, setPhoto] = useState();

  const handleGender = (e) => {
    setGender(e.target.value)
  }

  const fileHandler = (e) => {
    const file = e.target.files[0]
    setPhoto(file)

  }
  const submitHandler =async (e) => {
    e.preventDefault();
   try{
    const formData = new FormData();
    if (name) formData.set("name", name)
    if (age) formData.set("age", age)
    if (gender) formData.set("gender", gender)
    if (photo) formData.set("photo", photo)
      if(email) formData.set("email",email)

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
   const response = await createUser(formData);
   console.log(response);
   }catch(error){
    console.log(error)
   }
  
  }
  return (

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form onSubmit={submitHandler}>
              <label htmlFor="user-name">Name</label>
              <input type="text" name="name" id="user-name" value={name} onChange={(e) => { setName(e.target.value) }} />

              <label htmlFor="user-age">Age</label>
              <input type="number" id='user-age' name="age" value={age} onChange={(e) => { setAge(e.target.value) }} />

              <label htmlFor="male">Male</label>
              <input type="checkbox" id="male" name="gender" value="Male" onChange={handleGender} checked={gender === "Male"} />
              <label htmlFor="female">Female</label>
              <input type="checkbox" id="female" name="gender" value="Female" onChange={handleGender} checked={gender === "Female"} />

              <label htmlFor="user-email">Email</label>
              <input type="email" id='user-email' name="email" value={email} onChange={(e) => { SetEmail(e.target.value) }} />

              <label htmlFor="user-photo">Photo</label>
              <input type="file" id='user-photo' name="photo" onChange={fileHandler} />
              <button type='submit'>Submit</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreateForm
