import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

import './MyVacancies.scss';

export default function MyVacancies() {
  const { userId } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '',
    activity: '',
    position: '',
    salary: '',
    description: '',
    telephone: '',
    email: '',
  });

  const [vacancies, setVacancies] = useState([]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const getVacancy = useCallback(async () => {
    try {
      await axios
        .get('https://polycareer.herokuapp.com/api/vacancy', {
          headers: { 'Content-Type': 'application/json' },
          params: { userId },
        })
        .then((response) => {
          setVacancies(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const createVacancy = useCallback(async () => {
    try {
      await axios
        .post(
          'https://polycareer.herokuapp.com/api/vacancy/add',
          { ...form, userId },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
          setVacancies([...vacancies], response.data);
          setForm({
            name: '',
            activity: '',
            position: '',
            salary: '',
            description: '',
            telephone: '',
            email: '',
          });
          getVacancy();
        });
    } catch (error) {
      console.log(error);
    }
  }, [userId, form, getVacancy, vacancies]);

  const removeVacancy = async (id) => {
    try {
      await axios
        .delete(
          `https://polycareer.herokuapp.com/api/vacancy/delete/${id}`,
          { id },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(() => {
          getVacancy();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVacancy();
  }, [getVacancy]);

  return (
    <div className="container">
      <div className="my_vacancies-page">
        <h4>Разместить вакансию:</h4>
        <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s6">
              <input
                type="text"
                id="name"
                name="name"
                className="validate"
                value={form.name}
                onChange={changeHandler}
              />
              <label htmlFor="name">Название компании</label>
            </div>

            <div className="input-field col s6">
              <input
                type="text"
                id="activity"
                name="activity"
                className="validate"
                value={form.activity}
                onChange={changeHandler}
              />
              <label htmlFor="activity">Профиль деятельности</label>
            </div>

            <div className="input-field col s6">
              <input
                type="text"
                id="position"
                name="position"
                className="validate"
                value={form.position}
                onChange={changeHandler}
              />
              <label htmlFor="position">Должность</label>
            </div>

            <div className="input-field col s6">
              <input
                type="number"
                id="salary"
                name="salary"
                className="validate"
                min="0"
                value={form.salary}
                onChange={changeHandler}
              />
              <label htmlFor="salary">Зарплата (в рублях)</label>
            </div>

            <div className="input-field col s12">
              <textarea
                id="description"
                name="description"
                className="materialize-textarea validate"
                value={form.description}
                onChange={changeHandler}
              ></textarea>
              <label htmlFor="description">Описание</label>
            </div>

            <div className="input-field col s6">
              <i className="material-icons prefix">phone</i>
              <input
                id="telephone"
                type="tel"
                className="validate"
                name="telephone"
                value={form.telephone}
                onChange={changeHandler}
              />
              <label htmlFor="telephone">Telephone</label>
            </div>

            <div className="input-field col s6">
              <i className="material-icons prefix">email</i>
              <input
                id="email"
                type="email"
                className="validate"
                name="email"
                value={form.email}
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="row">
            <button
              className="waves-effect waves-light btn add-btn"
              onClick={createVacancy}
            >
              Разместить
            </button>
          </div>
        </form>

        <h4 className="vacancies-title">Мои вакансии:</h4>
        <div className="vacancies">
          {vacancies.map((vacancy, index) => {
            return (
              <div className="row flex vacancies-item" key={index}>
                <div className="vacancies-item-1row">
                  <div className="col vacancies-num">{index + 1}</div>
                  <div className="col">Название компании: {vacancy.name}</div>
                  <div className="col vacancies-buttons">
                    <Link to={'/update/' + vacancy._id}>
                      <i
                        className="material-icons update-icon"
                        title="Редактировать вакансию"
                      >
                        update
                      </i>
                    </Link>
                    <i
                      className="material-icons red-text"
                      title="Удалить вакансию"
                      onClick={() => removeVacancy(vacancy._id)}
                    >
                      delete
                    </i>
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
    </div>
  );
}
