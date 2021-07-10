import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import './AllVacancies.scss';

export default function AllVacancies() {
  const [vacancies, setVacancies] = useState([]);
  const [stats, setStats] = useState({
    numVacancies: 0,
    avgSalary: 0,
    minSalary: 0,
    maxSalary: 0,
  });

  const getStats = useCallback(async () => {
    try {
      await axios
        .get('https://polycareer.herokuapp.com/api/vacancy/vacancies-stats', {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          setStats(response.data.stats[0]);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getAllVacancies = useCallback(async () => {
    try {
      await axios
        .get('https://polycareer.herokuapp.com/api/vacancy/all', {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          getStats();
          setVacancies(response.data.reverse());
        });
    } catch (error) {
      console.log(error);
    }
  }, [setVacancies, getStats]);

  useEffect(() => {
    getAllVacancies();
  }, [getAllVacancies]);

  return (
    <div className="container">
      <h4 onClick={getStats}>Все вакансии:</h4>
      <p>Количество вакансий: {stats.numVacancies}</p>
      <p>Средняя зарплата: {stats.avgSalary.toFixed(2)} ₽</p>
      <p>Минимальная зарплата: {stats.minSalary} ₽</p>
      <p>Максимальная зарплата: {stats.maxSalary} ₽</p>
      <div className="vacancies">
        {vacancies.map((vacancy, index) => {
          return (
            <div className="row flex vacancies-item" key={index}>
              <div className="vacancies-item-1row">
                <div className="col comp-name">
                  Название компании: {vacancy.name}
                </div>
              </div>

              <div className="col vacancies-text">
                <span className="bold">Профиль деятельности:</span>{' '}
                {vacancy.activity}
              </div>
              <div className="col vacancies-text">
                <span className="bold">Должность:</span> {vacancy.position}
              </div>
              <div className="col vacancies-text">
                <span className="bold">Зарплата:</span> {vacancy.salary} ₽
              </div>
              <div className="col vacancies-text">
                <span className="bold">Описание:</span> {vacancy.description}
              </div>
              <div className="col vacancies-text">
                <span className="bold">Телефон:</span> {vacancy.telephone}
              </div>
              <div className="col vacancies-text">
                <span className="bold">Email:</span> {vacancy.email}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

//TODO: сделать update вакансий, видос по react-router-dom, страница со всеми вакансиями, страница "О нас", страница "Контакты"
//TODO: макет в фигме с помощью плагина
//TODO: взять идеи с сайта центра карьеры фин универа
