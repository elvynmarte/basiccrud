import { useNavigate } from "react-router-dom";
import Productlogo from "../assets/productlogo.png";
import { VscSignIn } from "react-icons/vsc";
import ConnectApi from "../util/apiconn";
import { useState } from "react";
import Loading from "../util/Loading";
import Alert from "../components/Alert";

const Login = () => {
  const navi = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleLogin = () => {
    setLoading(true);
    ConnectApi(
      "/get-login",
      (data) => {
        if (data.error) setMsg(data.error);
        else {
          localStorage.setItem("user", JSON.stringify(data));
          navi("/items");
          window.location.href = window.location.href;
        }
      },
      () => {
        setLoading(false);
      },
      { email: email, passw: pass },
      "POST"
    );
  };

  return (
    <>
      <center>
        <img src={Productlogo} height={200} style={{ borderRadius: 8 }} />
      </center>
      <br />
      <label>Email</label>
      <br />
      <input
        type="email"
        className="txt"
        onChange={(c) => setEmail(c.target.value)}
        onKeyDown={({ key }) => {
          if (key == "Enter") handleLogin();
        }}
      />
      <br />
      <label>Password</label>
      <br />
      <input
        type="password"
        className="txt"
        onChange={(c) => setPass(c.target.value)}
        onKeyDown={({ key }) => {
          if (key == "Enter") handleLogin();
        }}
      />
      <br />
      <br />
      {loading ? (
        <Loading />
      ) : (
        <div style={{ textAlign: "right" }}>
          <button className="btn" onClick={() => handleLogin()}>
            Log In <VscSignIn size={15} />
          </button>
        </div>
      )}
      {msg != "" && <Alert type="warning" msg={msg} />}
    </>
  );
};

export default Login;
