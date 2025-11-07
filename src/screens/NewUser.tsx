import { useNavigate, useLocation } from "react-router-dom";
import { VscArrowLeft, VscRemove, VscSave, VscTrash } from "react-icons/vsc";
import Loading from "../util/Loading";
import ConnectApi from "../util/apiconn";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";

const NewUsers = () => {
  const navi = useNavigate();
  const location = useLocation();
  const datauser = location.state != undefined ? location.state.user : {};

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");
  const [active, setActive] = useState(0);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (Object.keys(datauser).length > 0) {
      setName(datauser.name);
      setId(datauser.id);
      setEmail(datauser.email);
      setActive(datauser.active);
    }
  }, []);

  const handleSave = () => {
    if (cpass != pass && id == 0) {
      setErr(true);
      setMsg("Both passwords don't match!");
      return;
    }

    setLoad(true);
    setErr(false);

    ConnectApi(
      "/iu-user",
      (data) => {
        if (data.error) {
          setMsg(data.error);
          setErr(true);
        } else {
          setMsg(data.msg);
          if (id <= 0) navi("/users");
        }
      },
      () => {
        setLoad(false);
      },
      { name: name, email: email, passw: pass, active: active, id: id },
      "POST"
    );
  };

  const handleDelete = () => {
    const conf = confirm("Would you like to delete this user?");

    if (!conf) return;

    setLoad(true);
    ConnectApi(
      "/del-user",
      (data) => {
        if (data.error) {
          setMsg(data.error);
          setErr(true);
        } else navi("/users");
      },
      () => setLoad(false),
      { id: id },
      "POST"
    );
  };

  if (load) return <Loading />;

  return (
    <div>
      <h1>Create User</h1>
      <br />
      <div>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            className="txt"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            className="txt"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div hidden={id > 0 ? false : true}>
          <label>Active</label>
          <input
            type="checkbox"
            className="txt"
            onChange={(e) => setActive(e.target.checked ? 1 : 0)}
            checked={active == 1 ? true : false}
          />
        </div>
        <div hidden={id > 0 ? true : false}>
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              className="txt"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <br />
            <input
              type="password"
              className="txt"
              onChange={(e) => setCPass(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right", marginTop: 10 }}>
        <button
          className="btn"
          style={{ backgroundColor: "green" }}
          onClick={() => navi("/users")}
        >
          {<VscArrowLeft size={15} />}
        </button>
        <button className="btn" onClick={() => handleSave()}>
          <VscSave size={15} /> Save
        </button>
        <button
          hidden={id > 0 ? false : true}
          className="btn"
          style={{ backgroundColor: "#f14b4b" }}
          onClick={() => handleDelete()}
        >
          <VscTrash size={15} /> Remove
        </button>
      </div>
      {msg != "" && <Alert type={err ? "danger" : "success"} msg={msg} />}
    </div>
  );
};

export default NewUsers;
