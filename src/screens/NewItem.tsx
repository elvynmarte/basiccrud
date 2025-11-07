import { useNavigate } from "react-router-dom";
import { VscArrowLeft } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ConnectApi from "../util/apiconn";
import Loading from "../util/Loading";
import Alert from "../components/Alert";

const NewItems = () => {
  const navi = useNavigate();
  const location = useLocation();
  const dataitem = location.state != undefined ? location.state.dataitem : {};

  const [load, setLoad] = useState(true);
  const [name, setName] = useState("");
  const [tid, setTid] = useState(0);
  const [type, setType] = useState([]);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [id, setId] = useState(0);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (Object.keys(dataitem).length > 0) {
      setName(dataitem.name);
      setTid(dataitem.type);
      setPrice(dataitem.price);
      setQty(dataitem.quantity);
      setId(dataitem.id);
    }

    ConnectApi(
      "/get-types",
      (datat) => {
        setType(datat);
      },
      () => setLoad(false)
    );
  }, []);

  const handleSave = () => {
    if (tid <= 0) {
      setErr(true);
      setMsg("A type must be selected!");
      return;
    }

    setLoad(true);
    setErr(false);
    ConnectApi(
      "/iu-item",
      (data) => {
        if (data.error) {
          setMsg(data.error);
          setErr(true);
        } else {
          setMsg(data.msg);
          if (id <= 0) navi("/items");
        }
      },
      () => setLoad(false),
      { name: name, type: tid, price: price, quantity: qty, id: id },
      "POST"
    );
  };

  const handleDelete = () => {
    const conf = confirm("Would you like to delete this item?");

    if (!conf) return;

    setLoad(true);
    ConnectApi(
      "/del-item",
      (data) => {
        if (data.error) {
          setMsg(data.error);
          setErr(true);
        } else navi("/items");
      },
      () => setLoad(false),
      { id: id },
      "POST"
    );
  };

  if (load) return <Loading />;

  return (
    <div>
      <h1>{id > 0 ? "Edit" : "Create"} Item</h1>
      <br />
      <div>
        <div>
          <label>Product</label>
          <br />
          <input
            type="text"
            className="txt"
            onChange={(c) => setName(c.target.value)}
            value={name}
          />
        </div>
        <div>
          <label>Type</label>
          <br />
          <select
            className="txt"
            style={{ width: "100%" }}
            onChange={(i) => setTid(i.target.value)}
          >
            <option value="0">Select Type</option>
            {type
              .filter((t) => {
                if (id == 0) {
                  if (t.active == 1) return t;
                } else return t;
              })
              .map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                  selected={tid == t.id ? true : false}
                >
                  {t.description}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div>
        <div>
          <label>Price</label>
          <br />
          <input
            type="number"
            className="txt"
            value={price}
            onChange={(c) => setPrice(c.target.value)}
          />
        </div>
        <div>
          <label>Quantity</label>
          <br />
          <input
            type="number"
            className="txt"
            value={qty}
            onChange={(c) => setQty(c.target.value)}
          />
        </div>
      </div>
      <div style={{ textAlign: "right", marginTop: 10 }}>
        <button
          className="btn"
          style={{ backgroundColor: "green" }}
          onClick={() => navi("/items")}
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
          hidden={id == 0 ? true : false}
        >
          Remove
        </button>
      </div>
      {msg != "" && <Alert type={err ? "danger" : "success"} msg={msg} />}
    </div>
  );
};

export default NewItems;
