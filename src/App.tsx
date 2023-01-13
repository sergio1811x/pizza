import "./scss/app.scss";
import React, { lazy, Suspense } from "react";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./compnents/layouts/mainLayout";

const Cart = lazy(() =>
  import(/* webpackChunkName: "Cart" */ "./pages/Cart").then(({ Cart }) => ({
    default: Cart,
  }))
);
const FullPizza = lazy(() =>
  import(/* webpackChunkName: "FullPizza" */ "./compnents/FullPizza").then(
    ({ FullPizza }) => ({
      default: FullPizza,
    })
  )
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
