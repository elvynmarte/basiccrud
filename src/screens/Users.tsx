import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../util/Loading";
import ConnectApi from "../util/apiconn";

const Users = () => {
  const navi = useNavigate();

  const [load, setLoad] = useState(true);
  const [datau, setDatau] = useState([]);

  useEffect(() => {
    ConnectApi(
      "/get-users",
      (data) => setDatau(data),
      () => setLoad(false)
    );
  }, []);

  if (load) return <Loading />;

  return (
    <>
      <h1>Users</h1>
      <div style={{ textAlign: "right" }}>
        <button className="btn" onClick={() => navi("/new-user")}>
          + New User
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Active</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {datau.map((i) => {
            return (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td>{i.active == 1 ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => navi("/new-user", { state: { user: i } })}
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

export default Users;
