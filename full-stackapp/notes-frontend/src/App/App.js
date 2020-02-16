import React from 'react'
import './App.css'
import environment from '../environment'
import { QueryRenderer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import MainPage from '../containers/MainPage'

export default class App extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            notes {
              _id
              content
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error</div>
          }
          if (!props) {
            return <div>loading...</div>
          }
          return <MainPage {...props} />
        }}
      />
    )
  }
}
