import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

function render(Comp) {
  ReactDOM.render(
    <Comp />,
    document.getElementById('mount')
  );
}

if (module.hot) {
  module.hot.accept(
    './components/App',
    // eslint-disable-next-line global-require
    () => render(require('./components/App').default)
  );
}

(() => render(App))();
