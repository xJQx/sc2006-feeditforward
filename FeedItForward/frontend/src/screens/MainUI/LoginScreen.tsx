import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/LoginScreen.css";

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <div>LoginScreen</div>
        <h1 className="appName">FeedItForward</h1>
          <form>
            <label
            >
              <h2>Welcome!</h2>
            </label>
            
            <h3 className="inputName">Email</h3>
            <input
              className="inputField"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>

            <h3 className="inputName">Password</h3>
            <div>
              <input
                className="inputField"
                id="password"
                type={visible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
              <button
                type="button"
                onClick={() => {setVisible(!visible)}}
              >
                {visible ? <img src={"../../assets/images/eyeOpen.png"} alt="Eyes open"></img> : "Eyes closed"}
              </button>
              <h3>
                <Link to={""}>Forgot Password?</Link>
              </h3>
            </div>

            <br></br>
            <button
              // onClick={}
            >
              Login
            </button>

            <br></br>
            <h3>
              Don't have an account?
              <Link to={"/signup"} className="link">Sign up</Link>
            </h3>


          </form>
    </>
  );

};
