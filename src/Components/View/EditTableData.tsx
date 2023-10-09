import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import "./EditTableData.css";
import TableData, { onUpdateUser } from "../Model/TableData";
import NavBar from "../Dashboard/NavBar";
import SideBar from "../Dashboard/SideBar";

const EditTableData = () => {
  const [sidebarVisibility, setSideBarVisibility] = useState(true);
  const [navBarWidth, setNavBarWidth] = useState(false);

  const toogleSideBar = () => {
    setSideBarVisibility(!sidebarVisibility);
    setNavBarWidth(!navBarWidth);
  };
  const { id } = useParams();
  const userId = id ? parseInt(id, 10) : null;
  //console.log(id);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    university: "",
  });

  useEffect(() => {
    //find the user from matching id
    const existingUser = TableData.find((item) => item.id === userId);
    if (existingUser) {
      setUser(existingUser);
    }
    // console.log("Exsting user ", existingUser);
  }, [userId]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = (event: any) => {
    event.preventDefault();
    if (userId !== null) {
      console.log("Before updating", user);
      onUpdateUser({
        id: userId,
        ...user,
      });
      console.log("After updating", user);
      navigate("/dashboard");
    }
  };

  return (
    <div className="dashboard-container">
      <div
        className={`navbar ${
          navBarWidth ? "navbar-width" : ""
        } bg-body-tertiary fixed-top p-4`}
      >
        {<NavBar toggleSidebar={toogleSideBar}></NavBar>}
      </div>
      <div className={`sidebar ${sidebarVisibility ? "visible" : "hidden"}`}>
        {<SideBar></SideBar>}
      </div>
      <div className="main-content">
        <Card>
          <Card.Body>
            <Card.Title>Edit User</Card.Title>
            <Form onSubmit={handleUpdate}>
              {
                <div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="name" className="bold-label">
                          Name :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          aria-describedby="emailHelp"
                          name="name"
                          value={user.name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="email" className="bold-label">
                          Email :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          aria-describedby="emailHelp"
                          name="email"
                          value={user.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="age" className="bold-label">
                          Age :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="age"
                          name="age"
                          value={user.age}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col mb-3">
                      <label htmlFor="age" className="bold-label">
                        Gender :
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="Male"
                          checked={user.gender === "Male"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="Female"
                          checked={user.gender === "Female"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="university" className="bold-label">
                          University :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="university"
                          name="university"
                          value={user.university}
                          onChange={handleInputChange}
                        />
                      </div>
                      <br />
                      <button type="submit" className="btn btn-warning">
                        Update User
                      </button>
                    </div>
                  </div>
                </div>
              }
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default EditTableData;
