import { commitMutation } from 'react-relay'
import environment from '../../../environment'
import graphql from 'babel-plugin-relay/macro'

const mutation = graphql`
  mutation createNoteMutation($content: String) {
    createNote(content: $content) {
      _id
      content
    }
  }
`
function createNoteMutation(content) {
  const variables = {
    content
  }
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, error) => {
      console.log('response received from the server')
    },
    updater: store => {
      const payload = store.getRootField('createNote')
      const root = store.getRoot()
      const notes = root.getLinkedRecords('notes')

      const newNotes = [...notes, payload]
      root.setLinkedRecords(newNotes, 'notes')
    },
    onError: err => console.error(err)
  })
}

export default createNoteMutation