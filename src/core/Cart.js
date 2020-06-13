import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import Paymentb from "./Paymentb";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart);
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addtoCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h1>this is checkout</h1>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <h1 className="text-white"> All products</h1>
        <div className="row">
          <div className="col-6">
            {products.length > 0 ? (
              loadAllProducts(products)
            ) : (
              <h3>Cart is Empty</h3>
            )}
          </div>
          <div className="col-6">
            <Paymentb products={products} setReload={setReload} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
