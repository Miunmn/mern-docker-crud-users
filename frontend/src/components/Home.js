import { useState, useEffect } from 'react';
import axios from 'axios';
import validators from "../utils/validators.js"

import MaterialTable from "material-table";
const Home =  ()=> {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsersFunction() {
      axios.get('/get-users')
      .then(function(response){
        setUsers(response.data);
      })
      .catch(function(error){
        setUsers([])
        console.log(error)
      })
    }
    getUsersFunction();
  }, []);

  return <main>
    <section > 
      <div className='d-flex justify-content-center p-4'>

        <MaterialTable
              className={'user-table'}
              title="Users"
              columns={[
                { title: 'Name', field: 'first_name', validate: rowData => validators.validateField(rowData.first_name)? { isValid: false, helperText: 'Name cannot be empty' }: true },
                { title: 'Last Name', field: 'last_name', validate: rowData =>validators.validateField(rowData.last_name) ? { isValid: false, helperText: 'Last Name cannot be empty' }: true },
                { title: 'Note', field: 'note', validate: rowData =>validators.validateField(rowData.note) ? { isValid: false, helperText: 'Note cannot be empty' }: true },
                { title: 'Email', field: 'email', validate: rowData => validators.validateEmail(rowData.email) ? true : { isValid: false, helperText: 'Email is invalid' } },
              ]}
              data={users}
              editable={{
                onRowAdd: newData =>
                  new Promise(async (resolve, reject)  => {
                    await axios.post('/create-user', newData)
                    .then(function(res){
                      setUsers([...users, res.data]);
                      resolve();
                    })
                    .catch(function(error){
                      console.log(error.response.data)
                      let errorMessage = error.response.data.errors? error.response.data.errors.map(error => error.msg).join(', '): error.message;
                      alert(errorMessage);
                      reject();
                    })
                  }),
                
                onRowUpdate: (newData, oldData) =>
                  new Promise(async (resolve, reject) => {
                    await axios.put(`/update-user?id=${oldData._id}`, newData)
                    .then(function(){
                      setUsers(users.map(user => (user._id === newData._id ? newData : user)));
                      resolve();
                    })
                    .catch(function(error){
                      console.log(error);
                      alert(error.message);
                      reject();
                    });
                  }),

                onRowDelete: oldData =>
                  new Promise(async (resolve, reject) => {
                    await axios.delete(`/delete-user?id=${oldData._id}`)
                    .then(function(){
                      setUsers(users.filter(user => user._id !== oldData._id));
                      resolve();
                    })
                    .catch(function(error){
                      console.log(error)
                      alert(error.message);
                      reject(); 
                    })
                  }),
              }}
              onPageChange={() => {}}
            options={{
              exportButton: true
            }}
          />
      </div>
    </section>

  </main>
}


export default Home;