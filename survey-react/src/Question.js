import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Question extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      question: null,
      choices: [],
      error: null,
      end: false,
      selected: null
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_SURVEY_API}/poll/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      credentials: 'include'
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 404) {
        // end of survey
        this.setState({ loading: false, end: true })
      } else {
        throw new Error(res.statusText)
      }
    })
    .then((json) => {
      if (json) {
        this.setState({ loading: false, question: json.question, choices: json.choices })
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

  handleChoice = e => this.setState({ selected: parseInt(e.target.id, 10) })

  submitChoice = () => {
    if (!this.state.selected) {
      this.setState({ validation: 'Select a choice' })
    } else {
      this.setState({ loading: true }, () => {
        // submit
        fetch(`${process.env.REACT_APP_SURVEY_API}/${this.state.question.pk}/vote/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ choice: this.state.selected })
        })
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error(res.statusText)
          }
        })
        .then((json) => {
          if (json.success) {
            this.setState({ loading: false, submitted: true })
          }
        })
        .catch((err) => {
          console.log(err)
        })
      })
    }
  }

  loadNext = () => window.location.reload()

  render() {
    if (this.state.loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    } else if (this.state.error) {
      return <p>{this.state.error}</p>
    } else if (this.state.end) {
      return (
        <div>
          <p>You finished the survey!</p>
        </div>
      )
    }

    const validationStyle = {
      fontSize: 12,
      marginTop: 10,
      color: 'red'
    }
    return (
      <div>
        <p>Question: {this.state.question && this.state.question.question_text}</p>
        <Form>
          <fieldset>
            <Form.Group>
              {this.state.choices.map((c, i) => (
                <Form.Check
                  type="radio"
                  key={c.pk}
                  id={c.pk}
                  name={c.pk}
                  label={c.choice_text}
                  onChange={this.handleChoice}
                  checked={c.pk === this.state.selected}
                />
              ))}
            </Form.Group>
          </fieldset>
        </Form>
        {!this.state.submitted ? (
          <div>
            <Button onClick={this.submitChoice} variant="outline-light">Vote</Button>
            {this.state.validation ? (
              <p style={validationStyle}>{this.state.validation}</p>
            ) : <p style={validationStyle}>&nbsp;</p>}
          </div>
        ) : (
          <div>
            <Button onClick={this.loadNext} variant="outline-light">Answer another</Button>
            <p className="mt-3">or</p>
            <Link to={`/${this.state.question.pk}/results`}>See the results</Link>
          </div>
        )}
      </div>
    )
  }
}

export default Question
