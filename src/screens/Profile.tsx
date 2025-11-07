import { useState, useEffect, useEffectEvent } from "react";
import { VscLock, VscSave } from "react-icons/vsc";
import ConnectApi from "../util/apiconn";
import Loading from "../util/Loading";
import Alert from "../components/Alert";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(0);
  const [pass, setPass] = useState("");
  const [npass, setCPass] = useState("");
  const [cpass, setNPass] = useState("");

  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [load, setLoad] = useState(false);
  const [iscpass, setIscpass] = useState(false);

  const me = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setName(me.name);
    setEmail(me.email);
    setId(me.id);
  }, []);

  const handleSave = () => {
    if (name == "" || email == "") {
      setErr(true);
      setMsg("Name and Email must be complete!");
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
          me.name = name;
          me.email = email;
          localStorage.setItem("user", JSON.stringify(me));
        }
      },
      () => {
        setLoad(false);
      },
      { name: name, email: email, id: id },
      "POST"
    );
  };

  const handleReset = () => {
    if (pass == "" || npass == "" || cpass == "") {
      setErr(true);
      setMsg("All password fields must be complete!");
      return;
    }

    if (npass != cpass) {
      setErr(true);
      setMsg("Both passwords do not match!");
      return;
    }

    setLoad(true);
    setErr(false);

    ConnectApi(
      "/reset-pass",
      (data) => {
        if (data.error) {
          setMsg(data.error);
          setErr(true);
        } else {
          setMsg(data.msg);
        }
      },
      () => {
        setLoad(false);
      },
      { passw: pass, cpassw: cpass, npassw: npass, id: id },
      "POST"
    );
  };

  if (load) return <Loading />;

  return (
    <>
      <div>
        <center>
          <div
            style={{
              width: "fit-content",
              //height: 100,
              padding: 25,
              borderRadius: "50%",
              border: "5px solid #512e88",
              backgroundColor: "#9f4ddf",
              verticalAlign: "center",
              fontSize: 25,
            }}
          >
            {me.name.split(" ")[0][0] +
              (me.name.split(" ")[1] != undefined
                ? me.name.split(" ")[1][0]
                : "")}
          </div>
        </center>
        <br />
        <div hidden={iscpass}>
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
          <div>
            <button
              className="btn"
              style={{ backgroundColor: "#f14b4b" }}
              onClick={() => setIscpass(true)}
            >
              <VscLock size={15} /> Change Pass
            </button>
            <button className="btn" onClick={() => handleSave()}>
              <VscSave size={15} /> Save
            </button>
          </div>
        </div>

        <div hidden={!iscpass}>
          <center>
            <h3>Reset Password</h3>
          </center>
          <div>
            <label>Current Password</label>
            <br />
            <input
              key={0}
              type="password"
              className="txt"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
          </div>
          <div>
            <label>New Password</label>
            <br />
            <input
              key={1}
              type="password"
              className="txt"
              onChange={(e) => setNPass(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <br />
            <input
              key={2}
              type="password"
              className="txt"
              onChange={(e) => setCPass(e.target.value)}
            />
          </div>
          <button className="btn" onClick={() => setIscpass(false)}>
            Cancel
          </button>
          <button
            className="btn"
            style={{ backgroundColor: "#f14b4b" }}
            onClick={() => handleReset()}
          >
            Set Change Pass
          </button>
        </div>
        {msg != "" && <Alert type={err ? "danger" : "success"} msg={msg} />}
      </div>
    </>
  );
}
