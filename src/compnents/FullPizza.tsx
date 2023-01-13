import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const FullPizza = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://62f64e81612c13062b4b535b.mockapi.io/pizza/` + id
        );
        setPizza(data);
      } catch (e) {
        alert("Ошибка при получении пиццы:(");
        navigate("/");
        console.log(e);
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className={"container"}>
      <img src={pizza.imageUrl} />

      <h2>{pizza.title}</h2>
      <h4>{pizza.price + " ₽"}</h4>
      <Link to={"/"}>
        <button
          style={{ marginTop: 15 }}
          className={"button button--outline button--add"}
        >
          Назад
        </button>
      </Link>
    </div>
  );
};
