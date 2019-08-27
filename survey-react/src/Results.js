import React, { Component } from 'react'

import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

class Results extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      results: null
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_SURVEY_API}/${this.props.match.params.questionId}/results`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then((json) => {
      if (json) {
        this.setState({ loading: false, results: json.results })
      }
    })
    .catch((err) => {
      console.log(err)
      this.setState({
        loading: false,
        error: 'There was a problem loading the survey question'
      })
    })
  }

  linkToQuestion = () => window.location.href = '/question'

  render() {
    if (this.state.loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    return (
      <div>
        {this.state.results.map(r => (
          <p>{r.fields.choice_text}: {r.fields.votes}</p>
        ))}
        <Button onClick={this.linkToQuestion} variant="outline-light">Answer another one</Button>
      </div>
    )
  }
}

export default Results
