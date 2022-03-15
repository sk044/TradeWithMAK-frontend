import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { TextField } from "@material-ui/core";
import '../../styles.css';
import axios from 'axios';

//For modal
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function Home() {

  const [users, setUsers] = useState([]);

  //user data
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneno, setPhoneno] = useState(0);
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  //edit data
  const [editId, setEditId] = useState("");
  const [editname, seteditName] = useState("");
  const [editusername, seteditUsername] = useState("");
  const [editaddress, seteditAddress] = useState("");
  const [editphoneno, seteditPhoneno] = useState(0);
  const [editemail, seteditEmail] = useState("");
  const [editdob, seteditDob] = useState("");

  //dialog
  const [open, setOpen] = useState(false);
  const [editopen, seteditOpen] = useState(false);
  // get list

  const getUsers = () => {
    axios.get(`https://tradewithmak-server.herokuapp.com/getUsers`).then((response) => {
        setUsers(response.data);
		});
  }

  useEffect(() => {
    getUsers();
    }, []);


  //dialog add

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitAdd = () => {

    if(name===""||username===""||address===""||phoneno===0||email===""||dob===""){
      alert("Please enter all the feilds !!!")
    }else{

      const userData = {
        name: name,
        username: username,
        address: address,
        phoneno: phoneno,
        email: email,
        dob: dob
        }
    
        if (window.confirm('Add User?')) {
        axios.post(`https://tradewithmak-server.herokuapp.com/addUser`, userData)
          .then(res => {
          console.log(res.data);  
          })
          alert("User Added !!");
          window.location.reload();
        } else {
        // Do nothing!
          alert("Something went wrong !!")
        }
    }

  }

  //Edit User

  const handleClickeditOpen = (user) => {
    setEditId(user._id);

    seteditName(user.name);
    seteditUsername(user.username);
    seteditAddress(user.address);
    seteditPhoneno(user.phoneno);
    seteditEmail(user.email);
    seteditDob(user.dob);

    seteditOpen(true);
  };

  const handleeditClose = () => {
    setEditId("");
    seteditOpen(false);
  };

  const submitedit = () => {

    if(editname===""||editusername===""||editaddress===""||editphoneno===0||editemail===""||editdob===""){
      alert("Please enter all the feilds !!!")
    }else{

      const editData = {
        name: editname,
        username: editusername,
        address: editaddress,
        phoneno: editphoneno,
        email: editemail,
        dob: editdob
        }
    
        if (window.confirm('Update ?')) {
        // Save User !
        axios.put(`https://tradewithmak-server.herokuapp.com/updateUser/${editId}`, editData)  
          .then(res => {  
          console.log(res.data);  
          })
          alert("User Updated !!");
          window.location.reload();
        } else {
        // Do nothing!
        console.log('Not Saved.');
        }

    }

  }

  //Delete User

  const deleteUser = (id) => {

    if (window.confirm('Are you sure you want to delete this User?')) {
      // Delete it!
      axios.delete(`https://tradewithmak-server.herokuapp.com/deleteUser/${id}`)  
        .then(res => {  
          alert("User Deleted Successfully !!")
          window.location.reload();
        })
     } else {
      console.log('Not Deleted.');
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Card>
        <div className="actionCARD">
          <Button color="primary" variant="contained" onClick={handleClickOpen}>
            Add User
          </Button>
        </div>

        <CardContent>
        <div className="userTable">

            <table>
            <caption>Users</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Address</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>

              {users && users.map((user, index)=>
                
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneno}</td>
                  <td>{user.email}</td>
                  <td>{user.dob}</td>
                  <td>
                    <span className="actions" onClick={()=>handleClickeditOpen(user)}><EditIcon/></span>
                    <span className="actions" onClick={()=>deleteUser(user._id)}><DeleteIcon/></span>
                  </td>
                </tr>
              
              )}

            </tbody>
          </table>

        </div>

        </CardContent>

        {/* Dialog Add*/}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              variant="standard"
              value={name}
              required
              onChange={(e)=>setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              fullWidth
              variant="standard"
              value={username}
              required
              onChange={(e)=>setUsername(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="address"
              label="Address"
              fullWidth
              variant="standard"
              value={address}
              required
              onChange={(e)=>setAddress(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="phoneno"
              label="Phone No."
              type="number"
              fullWidth
              variant="standard"
              value={phoneno}
              required
              onChange={(e)=>setPhoneno(e.target.value)}
              helperText="Enter your 10 digit Phone No."
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              required
              onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="dob"
              label="Date of Birth"
              type="date"
              fullWidth
              variant="standard"
              value={dob}
              required
              onChange={(e)=>setDob(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={submitAdd}>Add</Button>
          </DialogActions>
      </Dialog>

      {/* Dialog Edit*/}

      <Dialog open={editopen} onClose={handleeditClose}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              variant="standard"
              value={editname}
              required
              onChange={(e)=>seteditName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              fullWidth
              variant="standard"
              value={editusername}
              required
              onChange={(e)=>seteditUsername(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="address"
              label="Address"
              fullWidth
              variant="standard"
              value={editaddress}
              required
              onChange={(e)=>seteditAddress(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="phoneno"
              label="Phone No."
              type="number"
              fullWidth
              variant="standard"
              value={editphoneno}
              required
              onChange={(e)=>seteditPhoneno(e.target.value)}
              helperText="Enter your 10 digit Phone No."
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={editemail}
              required
              onChange={(e)=>seteditEmail(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="dob"
              label="Date of Birth"
              type="date"
              fullWidth
              variant="standard"
              value={editdob}
              required
              onChange={(e)=>seteditDob(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleeditClose}>Close</Button>
            <Button onClick={submitedit}>Edit</Button>
          </DialogActions>
      </Dialog>

      </Card>
    </div>
  );
};