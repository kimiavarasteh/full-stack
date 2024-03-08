import React, {useEffect, useState} from 'react'
import { listEmployees, deleteEmployee  } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'


const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllEmployees()
  }, [])

  function getAllEmployees() {
    listEmployees().then(response => {
      setEmployees(response.data)
    }).catch(error => {
      console.log(error)
    })
  }
  function addNewEmployee() {
    navigate('/add-employee')
  }

  function updateEmployee(id) {
    navigate(`/edit-employee/${id}`)
  }

  function removeEmployee(id) {
    console.log(id)

    deleteEmployee(id).then(response => {
      getAllEmployees();
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className='container'>
      <h2 className='text-center'>List of employees</h2>
      <button className='btn btn-primary' onClick={addNewEmployee}> Add employee</button>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map(employee =>
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
                <td>
                  <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                  <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)}>Delete</button>
                </td>

                </tr>)
          }

        </tbody>
      </table>
    </div>
  )
}

export default ListEmployeeComponent