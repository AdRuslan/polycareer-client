import React, { useState } from 'react';

import './Question.scss';

export default function Question({ question, answer }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="question">
      <header className="question-header">
        <h5 onClick={() => setExpanded(!expanded)} className="question-title">
          {question}
        </h5>
        <button
          className="btn question-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <i className="material-icons prefix">arrow_upward</i>
          ) : (
            <i className="material-icons prefix">arrow_downward</i>
          )}
        </button>
      </header>
      {expanded && <p className="question-text">{answer}</p>}
    </article>
  );
}
