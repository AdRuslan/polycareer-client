import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Reviews.scss';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: '',
    feedback: '',
    grade: '',
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const getAllReviews = async () => {
    try {
      await axios
        .get('https://polycareer.herokuapp.com/api/reviews', {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          setReviews(response.data.reverse());
        });
    } catch (error) {
      console.log(error);
    }
  };

  const createVacancy = async () => {
    try {
      await axios
        .post(
          'https://polycareer.herokuapp.com/api/reviews/add',
          { ...form },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
          setReviews([...reviews], response.data);
          setForm({
            name: '',
            activity: '',
            position: '',
            salary: '',
            description: '',
            telephone: '',
            email: '',
          });
          getAllReviews();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReviews();
  });

  return (
    <div className="container">
      <h4>Оставить отзыв:</h4>
      <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">face</i>
            <input
              id="name"
              type="text"
              className="validate"
              name="name"
              value={form.name}
              onChange={changeHandler}
            />
            <label htmlFor="name">Имя</label>
          </div>

          <div className="input-field col s12">
            <i className="material-icons prefix">feedback</i>
            <textarea
              id="feedback"
              name="feedback"
              className="materialize-textarea validate"
              value={form.feedback}
              onChange={changeHandler}
            ></textarea>
            <label htmlFor="feedback">Отзыв</label>
          </div>

          <div className="input-field col s12">
            <i className="material-icons prefix">grade</i>
            <input
              id="grade"
              type="number"
              min="0"
              max="10"
              className="validate"
              name="grade"
              value={form.grade}
              onChange={changeHandler}
            />
            <label htmlFor="grade">Оценка</label>
          </div>
        </div>

        <div className="row">
          <button
            className="waves-effect waves-light btn add-btn"
            onClick={createVacancy}
          >
            Добавить
          </button>
        </div>
      </form>

      <h4 className="reviews-title">Отзывы:</h4>
      <div className="reviews">
        {reviews.map((review, index) => {
          let className = 'reviews-item';
          if (review.grade >= 7) {
            className += ' perfect-grade';
          } else if (review.grade >= 4) {
            className += ' norm-grade';
          } else {
            className += ' bad-grade';
          }
          return (
            <div className={className} key={index}>
              <div className="reviews-item-name">Имя: {review.name}</div>
              <p className="reviews-item-text">Отзыв: {review.feedback}</p>
              <div className="reviews-item-text">Оценка: {review.grade}/10</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
