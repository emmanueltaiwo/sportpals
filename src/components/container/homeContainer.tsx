import React from 'react'
import Stories from '../stories/stories'
import Post from '../post/post'

const HomeContainer = () => {
  return (
    <div className='flex flex-col'>
        <Stories />
        <Post />
    </div>
  )
}

export default HomeContainer