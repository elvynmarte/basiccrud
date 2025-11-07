import { useNavigate, useLocation } from "react-router-dom";
import { VscArrowLeft } from "react-icons/vsc";
import { useState, useEffect } from "react";
import ConnectApi from "../util/apiconn";
import Loading from "../util/Loading";
import Alert from "../components/Alert";

const NewType = () => {
  const navi = useNavigate();

  const location = useLocation();
  const types = location.state != undefined ? location.state.types : {};

  const [desc, setDesc] = useState("");
  const [active, setActive] = useState(1);
  const [id, setId] = useState(0);
  const [load, setLoad] = useState(false);
  const [haspro, setHasprr] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (Object.keys(types).length > 0) {
      setDesc(types.description);
      setActive(types.active);
      setId(types.id);
      setHasprr(types.hasproduct == 1 ? true : false);
    } else setHasprr(true);
  }, []);

  const handleSave = () => {
    setLoad(true);
    setErr(false);
    ConnectApi(
      "/iu-type",
      (data) => {
        if (data.error) {
          setMsg(data.error);
          setErr(true);
        } else {
          setMsg(data.msg);
          if (id <= 0) navi("/types");
        }
      },
      () => setLoad(false),
      { description: desc, active: active, id: id },
      "POST"
    );
  };

  const handleDelete = () => {
    const conf = confirm("Would you like to delete this Type?");

    if (!conf) return;

    setLoad(true);
    ConnectApi(
      "/del-type",
      (data) => {
        if (data.error) {
          setMsg(data.error);
          setErr(true);
        } else navi("/types");
      },
      () => setLoad(false),
      { id: id },
      "POST"
    );
  };

  if (load) return <Loading />;

  return (
    <div>
      <h1>{id > 0 ? "Edit" : "Create"} Type</h1>
      <br />
      <div>
        <div>
          <label>Description</label>
          <br />
          <input
            type="text"
            className="txt"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
      </div>
      <div style={{ textAlign: "right", marginTop: 10 }}>
        <button
          className="btn"
          style={{ backgroundColor: "green" }}
          onClick={() => navi("/types")}
        >
          {<VscArrowLeft size={15} />}
        </button>
        <button className="btn" onClick={() => handleSave()}>
          Save
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "#f14b4b" }}
          onClick={() => handleDelete()}
          hidden={haspro}
        >
          Remove
        </button>
        {msg != "" && <Alert type={err ? "danger" : "success"} msg={msg} />}
      </div>
    </div>
  );
};

export default NewType;
