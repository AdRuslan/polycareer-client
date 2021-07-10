import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from '../components/Question';

import './Foreigner.scss';

export default function Foreigner() {
  const [foreigners, setForeigners] = useState([]);

  const getAllForeigners = async () => {
    try {
      await axios
        .get('https://polycareer.herokuapp.com/api/foreigners', {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          setForeigners(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllForeigners();
  });

  return (
    <div className="container">
      <section className="info">
        {foreigners.map((item, index) => {
          return <Question key={index} {...item} />;
        })}
      </section>
    </div>
  );
}

//TODO: разделить аккордеон на компоненты как в примере на гитхабе
