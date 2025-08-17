import { useEffect, useState } from 'react'
import { Container} from '../components'
import { PostCard } from '../components/index.js'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config.js'

function Home() {
    const authStatus = useSelector((state) => state.auth.status)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(authStatus)
        {
            appwriteService.getAllposts()
            .then((response) => {
                // Ensure response is an array or convert it
                const postsArray = Array.isArray(response) ? response : response?.documents || []
                setPosts(postsArray)
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => setLoading(false))
        }

        else{
            setLoading(false)
            setPosts([])
            setError("You need to login to see posts")
        }
    }, [authStatus])

    if (loading) {
        return (
            <div className="py-8">
                <Container>
                   <div>loading</div>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <div className="py-8">
                <Container>
                    <h1 className="text-2xl font-bold text-red-500 text-center">
                        Error loading posts: {error}
                    </h1>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="py-8">
                <Container>
                    <h1 className="text-3xl font-bold text-center">
                        No posts available
                    </h1>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full md:w-1/2 lg:w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home