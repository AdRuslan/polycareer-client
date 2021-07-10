import React from 'react';

import './Footer.scss';

export default function Footer() {
  return (
    <footer className="page-footer blue-grey darken-3">
      <div className="footer-copyright">
        <div className="container">
          © 2021 Adigamov R. R.
          <a
            className="grey-text text-lighten-4 right"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/AdRuslan/PolyCareer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
