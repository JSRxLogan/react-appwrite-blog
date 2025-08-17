import React from 'react'
import { PostCard } from '../components/index'  
import {Container} from '../components/index.js'
import { useEffect , useState} from 'react'
import appwriteService from '../appwrite/config.js'
import { useSelector } from 'react-redux'

function AllPosts() {

    const authStatus = useSelector((state) => state.auth.status)
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
      setError(null)
      if(authStatus)
      {
        appwriteService.getAllposts([])
        .then((response) => {
          setPosts(response.documents)
        })
        .catch((error) => {
          setError("Failed to fetch posts. Please try again later.")
        })
      }
      else{
        setPosts([])
        setError("You need to login to see posts")  
      }
    }, [authStatus])
    
    // console.log("AllPosts",posts)

    if(!authStatus) {
      return(
        <div className='w-full py-8'>
        <Container>
            <h1 className='text-2xl font-bold text-red-500 text-center'>You need to login to see posts</h1>
        </Container>
        </div>
      )
    }

    if (error) {
      return   <p className="text-red-600 mt-8 text-center">{error}</p>
    }

  return (
<div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
               {posts && posts.length > 0 ? (
                posts.map((post) => (
                  console.log("post",post),
                    // <PostCard key={post.$id} post={post} />
                    <PostCard key={post.$id} $id={post.$id}
                    title={post.title}
                    image={post.image}/>
                ))
               ): <p>No posts available</p>}
            </div>
            </Container>
    </div>

  )
}

export default AllPosts
