import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import "./EditTableData.css";
import NavBar from "../Dashboard/NavBar";
import SideBar from "../Dashboard/SideBar";
import UpdateUser from "../Server/UpdateUser";
import UserDBData from "../Model/UserDBData";
import GetUserByEmail from "../Server/GetUserByEmail";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetUserByIdDorEdit from "../Server/GetUserByIdDorEdit";

const EditTableData = () => {
  const [sidebarVisibility, setSideBarVisibility] = useState(true);
  const [navBarWidth, setNavBarWidth] = useState(false);
  const { email } = useParams();
  const userEmail = email ? decodeURIComponent(email) : null;
  //console.log("User Email:", userEmail);

  const toogleSideBar = () => {
    setSideBarVisibility(!sidebarVisibility);
    setNavBarWidth(!navBarWidth);
  };

  //console.log(id);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDBData>({
    name: "",
    email: "",
    age: "",
    gender: "",
    university: "",
    password: "",
  });

  useEffect(() => {
    if (userEmail !== null) {
      GetUserByIdDorEdit(userEmail)
        .then((response: any) => {
          console.log("Response from API:", response.data);
          if (response) {
            const currentUser = response.data;
            console.log("CUrretnt user", currentUser);
            setUser(currentUser);
          } else {
            console.error("User data not found");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userEmail, user.email]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = (event: any) => {
    event.preventDefault();
    if (userEmail !== null) {
      console.log("Before updating", user);
      UpdateUser(user.email, user)
        .then(() => {
          console.log("User updated successfully ");
          toast.warning(`${user.email} Updated successfully`);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error(error);
          toast.error(`Something went wrong updating the ${user.email}`);
        });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="title">
        <h2>Update Form</h2>
      </div>
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
        <Card className="custom-card">
          <Card.Body>
            <Card.Title className="card-title">Edit User Details...</Card.Title>
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
                      <label htmlFor="age" className="bold-label gender-label">
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
                    </div>
                    <br />
                    <div className="row">
                      <div className="col">
                        <div className="form-group mb-3">
                          <label htmlFor="password" className="bold-label">
                            Password :
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <button
                          type="submit"
                          className="btn btn-warning updateButton"
                        >
                          Update User
                        </button>
                      </div>
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
