import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App'
import Question from './Question'
import Results from './Results'

function createRoutes() {
  return (
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/question" exact render={(props) => (
        <App props={props}>
          <Question />
        </App>
      )} />
      <Route path="/:questionId/results" exact render={(props) => (
        <App props={props}>
          <Results {...props} />
        </App>
      )} />
    </Router>
  );
}

export default createRoutes
