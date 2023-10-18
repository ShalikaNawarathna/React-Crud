import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { useNavigate, Link } from "react-router-dom";
import GetData from "../Server/GetData";
import UserDBData from "../Model/UserDBData";
import DeleteUser from "../Server/DeleteUser";
import { ToastContainer, toast } from "react-toastify";
import "./ShowTable.css";
import Footer from "../Dashboard/Footer";

const ShowTable = () => {
  const [dataFetch, setDataFetch] = useState<UserDBData[]>([]);
  const [progress, setProgress] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  let rowNumber = 1;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => setShowModal(false);

  const handleShow = (userId: any) => {
    setDeleteUserId(userId);
    setShowModal(true);
  };

  const handleDelete = (userId: any) => {
    DeleteUser(userId)
      .then(() => {
        console.log("User Deleted successfully");
        setDataFetch((prevUsers) =>
          prevUsers.filter((user) => user.email !== userId)
        );
        toast.error(`${userId} User Deleted successfully`);
        handleClose();
      })
      .catch((error) => {
        console.log("Error deleting user ", error);
        toast.error("Error deleting user");
      });
  };

  const handleGetData = () => {
    GetData()
      .then((data) => {
        const userData = data.map((newData) => ({
          name: newData.name,
          email: newData.email,
          age: newData.age,
          gender: newData.gender,
          university: newData.university,
          password: newData.password,
        }));
        setDataFetch(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <Fragment>
      {progress ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <progress />
        </div>
      ) : (
        <div>
          <div className="title">
            <h3>Current Users</h3>
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
                <th className="last-column">Action</th>
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
                        <td className="last-column">
                          <Link to={`/edit/${encodeURIComponent(item.email)}`}>
                            <Button variant="warning" className="action-button">
                              Edit
                            </Button>
                          </Link>{" "}
                          &nbsp;
                          {"   "}
                          <Button
                            variant="danger"
                            className="action-button"
                            onClick={() => handleShow(item.email)}
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
      )}
      <ToastContainer position="top-right" autoClose={3000} />

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user {deleteUserId}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteUserId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {}
    </Fragment>
  );
};

export default ShowTable;
