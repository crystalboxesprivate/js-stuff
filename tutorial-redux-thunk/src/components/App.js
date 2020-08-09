import React, { Component, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchingPosts } from '../redux/action-creators'

function App() {
  const dispatch = useDispatch()
  const posts = useSelector(state=>state.posts)
  const loading = useSelector(state=>state.loading)

  useEffect(() => {
    dispatch(fetchingPosts())
  }, [])
  return loading ? <div>Loading...</div>
  : <div className="App">
    <ul>
      {
        posts.map(post=> <li key={post.id}>{post.title}</li>)
      }
    </ul>
  </div>;
}

export default App
