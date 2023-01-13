import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filter/slices";
import { Sort } from "../redux/slices/filter/types";

type SortItem = {
  name: string;
  sortProperty: string;
};

export const list: SortItem[] = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

type SortProps = {
  clickOrder: any;
  order: any;
  value: Sort;
};

export const SortPopup: FC<SortProps> = React.memo(
  ({ clickOrder, order, value }) => {
    const dispatch = useDispatch();

    const sortRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);

    const onClickListItem = (obj: any) => {
      dispatch(setSort(obj));
      setOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const _e = e as MouseEvent & {
          path: Node[];
        };
        if (sortRef.current && !_e.path.includes(sortRef.current)) {
          setOpen(false);
        }
      };
      document.body.addEventListener("click", handleClickOutside);
      return () => {
        document.body.removeEventListener("click", handleClickOutside);
      };
    }, []);

    return (
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <div
            onClick={() => clickOrder()}
            className={order && "sort__label__transform"}
          >
            <svg
              width="14"
              height="8"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
              ></path>
            </svg>{" "}
          </div>

          <b>Сортировка по:</b>
          <span onClick={() => setOpen(!open)}>{value.name}</span>
        </div>
        {open && (
          <div className="sort__popup">
            <ul>
              {list.map((obj, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => onClickListItem(obj)}
                    className={
                      value.sortProperty === obj.sortProperty ? "active" : ""
                    }
                  >
                    {obj.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
);
