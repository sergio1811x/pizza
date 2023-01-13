import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cart/slices";
import { Link } from "react-router-dom";
import { cartItemByIdSelector } from "../../redux/slices/cart/selectors";
import { CartItem } from "../../redux/slices/cart/types";

const typesNames = ["Тонкое", "Традиционное"];

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  imageUrl: string;
  rating: number;
};

export const PizzaBlock: FC<PizzaBlockProps> = ({
  id,
  title,
  imageUrl,
  price,
  sizes,
  types,
  rating,
}) => {
  const [clickAdd, setClickAdd] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const dispatch = useDispatch();

  const cartItem = useSelector(cartItemByIdSelector(id));

  const addedCount = cartItem ? cartItem.count : 0;

  const omClickAdd = () => {
    setClickAdd(clickAdd + 1);
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typesNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />{" "}
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => {
              return (
                <li
                  key={type}
                  onClick={() => setActiveType(index)}
                  className={activeType === index ? "active" : ""}
                >
                  {typesNames[type]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((size, index) => {
              return (
                <li
                  key={size}
                  onClick={() => setActiveSize(index)}
                  className={activeSize === index ? "active" : ""}
                >
                  {size}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price + " ₽"}</div>
          <div
            className="button button--outline button--add"
            onClick={omClickAdd}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              ></path>
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};
