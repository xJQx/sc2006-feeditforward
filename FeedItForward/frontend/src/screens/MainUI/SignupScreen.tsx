import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/SignupScreen.css"

export const SignupScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contactNum, setContactNum] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState<boolean>(false);

  const [role, setRole] = useState<string>("");

  return (
    <>
      <div>SignupScreen</div>
      <div className="appName">FeedItForward</div>

        <form>
          <label
          >
            <h1>Sign Up</h1>
          </label>

          <h2>
            Already have an account?
            <Link to={"/login"} className="link">Login</Link>
          </h2>
          
          <h2 className="inputName">Name</h2>
          <input
          className="inputField"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>

          <h2 className="inputName">Email</h2>
          <input
          className="inputField"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>

          <h2 className="inputName">Address</h2>
          <input
          className="inputField"
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></input>

          <h2 className="inputName">Contact Number</h2>
          <input
          className="inputField"
            id="contactNum"
            placeholder="Enter your contact number"
            value={contactNum}
            onChange={(e) => {
              setContactNum(e.target.value);
            }}
          ></input>

          <h2 className="inputName">Role</h2>
          <select
          className="inputRole"
            value={role}
            onChange={(e) => {setRole(e.target.value)}}
            required
          >
            <option value="" selected disabled hidden></option>
            <option value="admin">Admin</option>
            <option value="consumer">Consumer</option>
            <option value="driver">Driver</option>
            <option value="hawker">Hawker</option>
          </select>

          <h2 className="inputName">Password</h2>
          <div>
            <input
            className="inputField"
              id="password"
              type={visiblePassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <button
              type="button"
              onClick={() => {setVisiblePassword(!visiblePassword)}}
            >
              {visiblePassword ? "Eyes open" : "Eyes closed"}
            </button>
          </div>

          <h2 className="inputName">Confirm Password</h2>
          <div>
            <input
            className="inputField"
              id="confirmPassword"
              type={visibleConfirmPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></input>
            <button
              type="button"
              onClick={() => {setVisibleConfirmPassword(!visibleConfirmPassword)}}
            >
              {visibleConfirmPassword ? "Eyes open" : "Eyes closed"}
            </button>
            <br></br>
            {confirmPassword!="" && password != confirmPassword ? "Password does not match!" : ""}
          </div>

          <br></br>
          <button
            // onClick={}
          >
            Create Account
          </button>
        </form>
    </>
  );
};
