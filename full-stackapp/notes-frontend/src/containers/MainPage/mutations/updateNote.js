import { commitMutation } from 'react-relay'
import environment from '../../../environment'
import graphql from 'babel-plugin-relay/macro'

const mutation = graphql`
  mutation updateNoteMutation($content: String, $_id: ID) {
    updateNote(_id: $_id, content: $content) {
      _id
      content
    }
  }
`

function updateNoteMutation(_id, content) {
  const variables = {
    _id,
    content
  }

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      console.log('Response received from server')
    },
    updater: store => {
      console.log(store)
      const newUpdatedNote = store.getRootField('updateNote')
      console.log(newUpdatedNote)
      const root = store.getRoot()
      console.log('root:', root)
      const notes = root.getLinkedRecords('notes')
      const newNotes = notes.filter(v => v.getValue('_id') !== _id)

      root.setLinkedRecords([...newNotes, newUpdatedNote], 'notes')
    },
    onError: err => console.error(err)
  })
}

export default updateNoteMutation