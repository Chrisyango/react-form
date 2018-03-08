import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {required, nonEmpty, valueLength, valueNumber} from '../validators';
import Input from './input';
import './app.css';

class App extends React.Component {
  onSubmit(values) {
    return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res.headers);
      if (!res.ok) {
        if (
          res.headers.has('content-type') && 
          res.headers
            .get('content.type')
            .startsWith('application/json')
        ) {
          return res.json().then(err => Promise.reject(err))
        }
        return Promise.reject({
          code: res.status,
          message: res.statusText
        });
      }
      return;
    })
    .then(() => {
      console.log('Submitted with values', values);
    })
    .catch(err => {
      const {reason, message, location} = err;
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    })
  }
  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="message-success">
          Success!
        </div>
      )
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message-error">
          {this.props.error}
        </div>
      )
    }

    return (
      <div className="form">
        <h2>Report a problem with your delivery</h2>
        <form
          onSubmit={
            this.props.handleSubmit(values => {
              this.onSubmit(values);
            })
          }
        >
          <Field 
            component={Input}
            type="text"
            name="trackingNumber" 
            validate={[required, nonEmpty, valueLength, valueNumber]}
          />
          <label htmlFor="issue">What is your issue?</label>
          <Field 
            component="select" 
            name="issue" 
            id="issue"
          >
            <option value="not-delivered">My delivery hasn't arrived</option>
            <option value="wrong-item">The wrong item was delivered</option>
            <option value="order-missing">Part of my order was missing</option>
            <option value="damaged">Some of my order arrived damaged</option>
            <option value="other">Other (give details below)</option>
          </Field>
          <label htmlFor="more-details">Give more details (Optional)</label>
          <Field 
            component="textarea" 
            name="details" 
            id="details"
          />
          <button type="submit">Submit</button>
        </form>
        {successMessage}
        {errorMessage}
      </div>
    );
  }
}

App = reduxForm({
  form: 'report',
  onSubmitFail: (errors, dispatch) => {
    dispatch(focus('report', Object.keys(errors)[0]))
  }
})(App);

App = connect(
  state => ({
    initialValues: {
      "trackingNumber": "",
      "issue": "not-delivered",
      "details": " "
    }
  })
)(App);

export default App;