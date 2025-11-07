import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ConnectApi from "../util/apiconn";
import Loading from "../util/Loading";

const Types = () => {
  const navi = useNavigate();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    ConnectApi(
      "/get-types",
      (data) => {
        setData(data);
      },
      () => {
        setLoad(false);
      }
    );
  }, []);

  if (load) return <Loading />;

  return (
    <>
      <h1>Types</h1>
      <div style={{ textAlign: "right" }}>
        <button className="btn" onClick={() => navi("/new-type")}>
          + New Type
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>active</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => {
            return (
              <tr key={i.id}>
                <td>{i.description}</td>
                <td>{i.active == 1 ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => navi("/new-type", { state: { types: i } })}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Types;
