import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './About.scss';

export default function About() {
  const [specialists, setSpecialists] = useState([]);
  const [partners, setPartners] = useState([]);

  const getAllSpecialists = async () => {
    try {
      await axios
        .get('https://polycareer.herokuapp.com/api/specialists', {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          setSpecialists(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPartners = async () => {
    try {
      await axios
        .get('https://polycareer.herokuapp.com/api/partners', {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          setPartners(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPartners();
    getAllSpecialists();
  });

  return (
    <div className="container">
      <h4 className="about-title">PolyCareer</h4>
      <p className="about-text">
        Данное веб-приложение создано студентом первого курса Московского
        Политехнического университета по направлению "Веб-технологии" Адигамовым
        Р. Р. в рамках учебной дисциплины "Инженерное проектирование". Цель
        проекта - облегчить задачу поиска и размещения вакансий для студентов и
        работодателей.
      </p>
      <h4 className="about-title">Студентам</h4>
      <p className="about-text">
        Дорогие студенты Московского Политехнического университета! Если вы
        активно рассматриваете новые карьерные возможности или планируете
        приступить к поиску работы, проект PolyCareer готов прийти к вам на
        помощь! В разделе "Все вакансии" вы можете просмотреть список
        предлагаемых вакансий и выбрать интересующую. <br />
        Партнеры нашего вуза:
      </p>
      <table className="about-table responsive-table striped">
        <thead>
          <tr>
            <th>№</th>
            <th>Партнер</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.partner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4 className="about-title">Работодателям</h4>
      <p className="about-text">
        PolyCareer заинтересован в сотрудничестве по вопросам занятости и
        трудоустройства студентов и выпускников нашего вуза. <br />
        Московский Политехнический университет готовит специалистов в областях:
      </p>
      <table className="about-table responsive-table striped">
        <thead>
          <tr>
            <th>№</th>
            <th>Специализация</th>
          </tr>
        </thead>
        <tbody>
          {specialists.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.specialization}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="about-text">
        Вы можете размещать, просматривать, удалять и редактировать ваши
        вакансии в разделе "Мои вакансии".
      </p>
    </div>
  );
}
