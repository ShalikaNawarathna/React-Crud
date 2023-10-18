import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./CreateTableData.css";
import "./ShowTable";
import NavBar from "../Dashboard/NavBar";
import SideBar from "../Dashboard/SideBar";
import CreateData from "../Server/CreateData";
import UserDBData from "../Model/UserDBData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Dashboard/Footer";

function CreateTableData() {
  const [sidebarVisibility, setSideBarVisibility] = useState(true);
  const [navBarWidth, setNavBarWidth] = useState(false);
  const [users, setUsers] = useState<UserDBData[]>();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [university, setUniversity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e: any) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e: any) => {
    setGender(e.target.value);
  };

  const handleUniversityChange = (e: any) => {
    setUniversity(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  let history = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsAddingUser(true);
    const newUser = {
      name,
      email,
      age,
      gender,
      university,
      password,
    };

    CreateData(newUser)
      .then((response) => {
        console.log("User created succulfully", response);
        toast.success(`${newUser.email} User created succulfully`);
        history("/dashboard");
      })
      .catch((error: any) => {
        console.error("Error creating user", error);
        toast.error("Error creating user", error);
      })
      .finally(() => {
        setIsAddingUser(false);
      });
  };

  const toogleSideBar = () => {
    setSideBarVisibility(!sidebarVisibility);
    setNavBarWidth(!navBarWidth);
  };

  return (
    <div>
      <div className="dashboard-container">
        <div className="title">
          <h2>Adding New User</h2>
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
              <Card.Title className="card-title">
                Enter User Details...
              </Card.Title>
              {}
              <Form onSubmit={handleSubmit}>
                {
                  <div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group mb-3">
                          <label htmlFor="name" className="bold-label">
                            Name :{" "}
                          </label>
                          <input
                            type="name"
                            className="form-control"
                            id="name"
                            aria-describedby="emailHelp"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={handleNameChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group mb-3">
                          <label htmlFor="email" className="bold-label">
                            Email :{" "}
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group mb-3">
                          <label htmlFor="age" className="bold-label">
                            Age :{" "}
                          </label>
                          <input
                            type="age"
                            className="form-control"
                            id="age"
                            placeholder="Enter Your Age "
                            value={age}
                            onChange={handleAgeChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <label
                          htmlFor="age"
                          className="bold-label gender-label"
                        >
                          Gender :{" "}
                        </label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="male"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={handleGenderChange}
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="female"
                            value="Female"
                            checked={gender === "Female"}
                            onChange={handleGenderChange}
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group mb-3">
                          <label htmlFor="university" className="bold-label">
                            University :{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="university"
                            placeholder="Enter Your University "
                            value={university}
                            onChange={handleUniversityChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <div className="form-group mb-3">
                            <label htmlFor="password" className="bold-label">
                              Password :{" "}
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Enter Your Password"
                              value={password}
                              onChange={handlePasswordChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col submit-button">
                          <button type="submit" className="btn btn-primary">
                            Add User
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
        {}
      </div>{" "}
      {isAddingUser && (
        <div className="alert alert-info" role="alert">
          Adding User...
        </div>
      )}
    </div>
  );
}

export default CreateTableData;
