import signupImage from "../assets/signUp.png";
import gmailIcon from "../assets/gmail.png";
import lockIcon from "../assets/lock.jpg";
import loginImage from "../assets/login.png";
import userIcon from "../assets/usericon.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../component/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Snakbar from "../component/snakbar";
const Login = () => {
  const [state, setState] = useState("signIn");
  const [showSnakbar, setShowSnakbar] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { username, email, password } = data;
    try {
      const resp = await axios.post(
        "https://mind-castle-gql-server.csproject.org/api/auth/signup",
        {
          username,
          email,
          password,
        }
      );
      if (resp.status == 400) {
        throw Error("The User with this name or email already exists");
      }
      reset();
      setState(changeTo)
    } catch (err) {
      setShowSnakbar(err.message);
      rest();
    }
  };

  const {
    register: r,
    formState: { errors: e, isSubmitting: isSubmit },
    getValues: getVal,
    handleSubmit: submitHandler,
    reset: rest,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit1 = async (data, e) => {
    e.preventDefault();
    const { username, password } = data;
    try {
      const resp = await fetch(
        "https://mind-castle-gql-server.csproject.org/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: username,
            password: password,
          }),
          credentials: 'include'
        },
      );
      let dataa = await resp.json();
      if (resp.status == 403) {
        throw Error("invalid credentials");
      }
      if (resp.status == 200) {
        const decoded = jwtDecode(dataa.access_token);
        const user = {
          isAuth: true,
          id: decoded.user_id,
          accessToken: dataa.access_token,
          exp: decoded.exp,
          username: decoded.username,
        };
        localStorage.setItem("token", JSON.stringify(user));
      }
      navigate("/");
      rest();
    } catch (err) {
      setShowSnakbar(err.message);
      rest();
    }
  };

  return (
    <div
      className={`auth-container ${state === "signIn" ? "signIn" : "signUp"}`}
    >
      {showSnakbar && (
        <Snakbar setShowSnakbar={setShowSnakbar} showSnakbar={showSnakbar} state={state}/>
      )}
      <div className={`content-container`}>
        <div className={`${state === "signIn" ? "signIn" : "signUp"}`}>
          <form
            action=""
            className="sign-up"
            style={{
              opacity: `${state === "signUp" ? 1 : 0}`,
              zIndex: `${state === "signUp" ? 2 : 1}`,
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2>sign Up</h2>
            <div>
              <div className="input-container">
                <div className="input-icon">
                  <img src={userIcon} />
                </div>
                <div className="input-box-container">
                  <input
                    type="text"
                    placeholder="username"
                    {...register("username", {
                      required: "username is required",
                    })}
                  />
                </div>
              </div>
              {errors.username && (
                <p className="ml-12 text-xs" style={{ color: "red" }}>
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <div className="input-container">
                <div className="input-icon">
                  <img src={gmailIcon} />
                </div>
                <div className="input-box-container">
                  <input
                    type="text"
                    placeholder="email"
                    {...register("email", {
                      required: "email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "invalid email address",
                      },
                    })}
                  />
                </div>
              </div>
              {errors.email && (
                <p className="ml-12 text-xs" style={{ color: "red" }}>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div className="input-container">
                <div className="input-icon">
                  <img src={lockIcon} />
                </div>
                <div className="input-box-container">
                  <input
                    type="password"
                    placeholder="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message:
                          "Password must have at least 8 characters long",
                      },
                    })}
                  />
                </div>
              </div>
              {errors.password && (
                <p className="ml-12 text-xs" style={{ color: "red" }}>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <div className="input-container">
                <div className="input-icon">
                  <img src={lockIcon} />
                </div>
                <div className="input-box-container">
                  <input
                    type="password"
                    placeholder="confirm password"
                    {...register("confirmPassword", {
                      validate: (value) => {
                        const { password } = getValues();
                        if (value === "") return "confirm password is required";
                        return password === value || "password should match!";
                      },
                    })}
                  />
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="ml-12 text-xs" style={{ color: "red" }}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button style={{ cursor: "pointer" }} className={`custom-button`}>
              sign up
            </button>
          </form>
          <form
            action=""
            className="sign-in"
            style={{
              opacity: `${state === "signIn" ? 1 : 0}`,
              zIndex: `${state === "signUp" ? 1 : 2}`,
            }}
            onSubmit={submitHandler(onSubmit1)}
          >
            <h2>sign In</h2>
            <div>
              <div className="input-container">
                <div className="input-icon">
                  <img src={userIcon} />
                </div>
                <div className="input-box-container">
                  <input
                    type="text"
                    placeholder="username"
                    {...r("username", {
                      required: "username is required",
                    })}
                  />
                </div>
              </div>
              {e.username && (
                <p className="ml-12 text-xs" style={{ color: "red" }}>
                  {e.username.message}
                </p>
              )}
            </div>
            <div>
              <div className="input-container">
                <div className="input-icon">
                  <img src={lockIcon} />
                </div>
                <div className="input-box-container">
                  <input
                    type="password"
                    placeholder="password"
                    {...r("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message:
                          "Password must have at least 8 characters long",
                      },
                    })}
                  />
                </div>
              </div>
              {e.password && (
                <p className="ml-12 text-xs" style={{ color: "red" }}>
                  {e.password.message}
                </p>
              )}
            </div>
            <Button borderr="" text={isSubmit ? "signing" : "signin"} />
          </form>
        </div>
      </div>
      <div className="image-container">
        <div className={`sign-in-image ${state !== "signIn" && "signup"}`}>
          <div>
            <h3>New here?</h3>
            <p>Do you want to sign up?</p>
            <Button
              borderr="btn-border"
              setState={setState}
              changeTo="signUp"
              text="signup"
            />
          </div>
          <img src={loginImage} alt="signin-image" className="person" />
        </div>
        <div className={`sign-up-image ${state !== "signUp" && "signin"}`}>
          <div>
            <h3>One of us</h3>
            <p>Did you already sign in?</p>
            <Button
              borderr="btn-border"
              setState={setState}
              changeTo="signIn"
              text="signin"
            />
          </div>

          <img
            src={signupImage}
            alt="signup-image"
            className="person signins"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
