import {useEffect,useState} from 'react'
import { Container } from '../components'
import { PostForm } from '../components/index.js'


function AddPost() {
  return (
    <div className='py-8'>
      <Container>
        <PostForm/>
      </Container>
      
    </div>
  )
}

export default AddPost
