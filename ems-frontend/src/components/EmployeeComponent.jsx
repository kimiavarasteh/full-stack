import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const { id } = useParams()
  
  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(error => {
        console.log(error)
      })
    }
  }, [id])

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  

  const navigate = useNavigate()

  function validateForm() {
    let validate = true;
    const errorCopy = { ...errors };
  
    if (firstName.trim()) {
      errorCopy.firstName = '';
    } else {
      errorCopy.firstName = 'First name is required';
      validate = false;
    }
  
    if (lastName.trim()) {
      errorCopy.lastName = '';
    } else {
      errorCopy.lastName = 'Last name is required';
      validate = false;
    }
  
    if (email.trim()) {
      errorCopy.email = '';
    } else {
      errorCopy.email = 'Email is required';
      validate = false;
    }
  
    setErrors(errorCopy);
    return validate;
  }


  function pageTitle() {
    if (id) {
      <h2 className='text-center'>update Employee</h2>
    } else {
      <h2 className='text-center'>Add Employee</h2>
    
    }
  }
  
    



  function handleFirstName(e) {
    setFirstName(e.target.value)
  }

  function handleLastName(e) {
    setLastName(e.target.value)
  } 

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault()
    

    if (validateForm()) {
      const employee = { firstName, lastName, email }
      if (id) {
        updateEmployee(employee, id).then(response => {
          console.log(response.data);
          navigate('/employees');
        }).catch(error => {
          console.log(error);
        })
      } else {
        createEmployee(employee).then(response => {
          navigate('/employees')
        })
      }
    
    }
    
  }

  
  return (
    <div className='container'>
      <br></br>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Employee first name</label>
                <input type='text'
                  placeholder='Employee first name'
                  name='firstName'
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  value={firstName}
                  onChange={handleFirstName}>
                </input>
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              
              <div className='form-group mb-2'>
                <label className='form-label'>Employee last name</label>
                <input type='text'
                  placeholder='Employee last name'
                  name='lastName'
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  value={lastName}
                  onChange={handleLastName}>
                </input>
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>
              
              <div className='form-group mb-2'>
                <label className='form-label'>Employee email</label>
                <input type='text'
                  placeholder='Employee email'
                  name='email'
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={handleEmail}>
                </input>
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
              
              <button className='btn btn-success' onClick={saveOrUpdateEmployee} >Submit</button>
            </form>


            </div>
        </div>
      </div>

    </div>
  )
}
export default EmployeeComponent