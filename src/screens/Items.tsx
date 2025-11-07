import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ConnectApi from "../util/apiconn";
import Loading from "../util/Loading";

const Items = () => {
  const navi = useNavigate();
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(true);
  /*const items = [
    { id: 1, name: "Apple", type: "Fruit", price: "10.00", quantity: "10" },
    { id: 2, name: "Orange", type: "Fruit", price: "10.00", quantity: "15" },
    { id: 3, name: "Mango", type: "Fruit", price: "10.00", quantity: "10" },
    { id: 4, name: "Coca Cola", type: "Drink", price: "5.00", quantity: "18" },
    { id: 5, name: "Heineken", type: "Drink", price: "8.00", quantity: "10" },
    { id: 6, name: "Pizza", type: "Foot", price: "12.00", quantity: "40" },
    { id: 7, name: "Hamburger", type: "Drink", price: "7.00", quantity: "4" },
    { id: 8, name: "Strawberry", type: "Fruit", price: "2.00", quantity: "4" },
    {
      id: 9,
      name: "Corona Beer",
      type: "Drink",
      price: "7.00",
      quantity: "19",
    },
    {
      id: 10,
      name: "Pineapple",
      type: "Fruit",
      price: "10.00",
      quantity: "100",
    },
  ];*/

  useEffect(() => {
    ConnectApi(
      "/get-items",
      (data) => {
        setItems(data);
      },
      () => {
        setLoad(false);
      }
    );
  }, []);

  if (load) return <Loading />;

  return (
    <>
      <h1>Items</h1>
      <div style={{ textAlign: "right" }}>
        <button className="btn" onClick={() => navi("/new-item")}>
          + New Item
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => {
            return (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.desctype}</td>
                <td>{i.price}</td>
                <td>{i.quantity}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() =>
                      navi("/new-item", { state: { dataitem: i } })
                    }
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

export default Items;
