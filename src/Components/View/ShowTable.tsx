import React, { Fragment, useEffect, useState } from "react";
import "../Model/TableData";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import TableData from "../Model/TableData";
import "./ShowTable.css";
import { useNavigate, Link } from "react-router-dom";
import GetData from "../Server/GetData";
import UserDBData from "../Model/UserDBData";
import DeleteUser from "../Server/DeleteUser";

const ShowTable = () => {
  // const [users, setUsers] = useState(TableData);
  const [dataFetch, setDataFetch] = useState<UserDBData[]>([]);
  let history = useNavigate();
  let rowNumber = 1;

  const handleDelete = (userId: any) => {
    DeleteUser(userId)
      .then(() => {
        console.log("User Deleted successfully");
        setDataFetch((prevUsers) =>
          prevUsers.filter((user) => user.email != userId)
        );
      })
      .catch((error) => {
        console.log("Error deleting user ", error);
      });

    // history("/dashboard");
  };

  const handleGetData = () => {
    GetData()
      .then((data) => {
        const userData: UserDBData[] = data.map((newData) => ({
          name: newData.name,
          email: newData.email,
          age: newData.age,
          gender: newData.gender,
          university: newData.university,
        }));
        setDataFetch(userData);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);
  // const  onAddUser  = (newUser : any) =>{
  //   setUsers([...users, newUser]);
  // }
  return (
    <Fragment>
      <div>
        <div className="title">
          <h1>Current Users</h1>
        </div>
        <Table striped bordered hover size="sm" className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>University</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataFetch && dataFetch.length > 0
              ? dataFetch.map((item) => {
                  return (
                    <tr key={item.email}>
                      <td>{rowNumber++}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.age}</td>
                      <td>{item.gender}</td>
                      <td>{item.university}</td>
                      <td>
                        <Link to={`/edit/${item.email}`}>
                          <Button variant="warning" className="action-button">
                            Edit
                          </Button>
                        </Link>{" "}
                        &nbsp;
                        {"   "}
                        <Button
                          variant="danger"
                          className="action-button"
                          onClick={() => handleDelete(item.email)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>

        <Link to="/create">
          <Button variant="success" className="action-button addButton">
            Add New User
          </Button>
        </Link>
      </div>
    </Fragment>
  );
};

export default ShowTable;
