import React, { useEffect, useState } from 'react'
import { PostCard, Container } from '../components/index'
import appwriteService from '../appwrite/config.js'
import { useSelector } from 'react-redux'

function AllPosts() {
  const authStatus = useSelector((state) => state.auth.status)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
    if (authStatus) {
      appwriteService
        .getAllposts([])
        .then((response) => {
          setPosts(response.documents)
        })
        .catch(() => {
          setError('Failed to fetch posts. Please try again later.')
        })
    } else {
      setPosts([])
      setError('You need to login to see posts')
    }
  }, [authStatus])

  if (!authStatus) {
    return (
      <div className="w-full py-8">
        <Container>
          <h1 className="text-2xl font-bold text-red-500 text-center">
            You need to login to see posts
          </h1>
        </Container>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-600 mt-8 text-center">{error}</p>
  }

  console.log(posts)

  return (
    <div className="w-full py-8">
      <Container>
        {posts && posts.length > 0 ? (
          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-3 
              xl:grid-cols-4 
              gap-6
            "
          >
            {posts.map((post) => (
              <PostCard
                key={post.$id}
                $id={post.$id}
                title={post.title}
                image={post.image}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts available</p>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
