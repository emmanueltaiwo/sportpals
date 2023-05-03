import React from 'react'
import Stories from '../stories/stories'
import Post from '../post/post'

const HomeContainer = () => {
  return (
    <div className='flex flex-col border-b-[1px] border-gray-400'>
        <Stories />
        <Post />
    </div>
  )
}

export default HomeContainer