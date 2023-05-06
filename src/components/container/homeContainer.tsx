import React from 'react'
import Stories from '../stories/stories'
import Post from '../post/post'
import Feeds from '../Feed/feeds'

const HomeContainer = () => {
  return (
    <div className='flex flex-col'>
        <Stories />
        <Post />
        <Feeds />
    </div>
  )
}

export default HomeContainer