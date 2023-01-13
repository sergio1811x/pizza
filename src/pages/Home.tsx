import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../scss/app.scss';
import { PizzaBlock, PizzaSkeleton, Pagination } from '../compnents/index';
import { Categories } from '../compnents/Сategories';
import { list, SortPopup } from '../compnents/Sort';
import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/slices';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { filterSelector } from '../redux/slices/filter/selectors';
import { pizzasSelector } from '../redux/slices/pizza/selectors';
import { fetchPizzas } from '../redux/slices/pizza/asyncAction';

export const Home = ({}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzasSelector);

  console.log('asdsad', items);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [order, setOrder] = useState(true);

  const getPizzas = async () => {
    const sortBy = sort.sortProperty;
    dispatch(
      fetchPizzas({
        order,
        currentPage,
        categoryId,
        sortBy,
      }),
    );
    window.scroll(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      if (sort) {
        params.sort = sort;
      }
      // @ts-ignore
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, order, currentPage, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
        order,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, order]);

  const onClickCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const clickOrder = () => {
    setOrder(!order);
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) return true;
    })
    .map((item: any) => {
      return <PizzaBlock {...item} />;
    });

  const skeletons = [...new Array(6)].map((_, i) => {
    return <PizzaSkeleton key={i} />;
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(i: number) => onClickCategory(i)} />
        <SortPopup clickOrder={() => clickOrder()} order={order} value={sort} />
      </div>
      <h2
        onClick={() => {
          clickOrder();
        }}
        className="content__title"
      >
        Все пиццы
      </h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>К сожалению не удалось получить пиццы :(</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
