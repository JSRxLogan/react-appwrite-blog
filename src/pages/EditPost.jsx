import {useEffect,useState} from 'react'
import { Container } from '../components'
import { PostForm } from '../components/index.js'
import appwriteService from '../appwrite/config.js'
import { useNavigate , useParams } from 'react-router-dom'

function EditPost() {

    const navigate = useNavigate()
    const {slug} = useParams()
    const [post , setPost] = useState(null)

    useEffect(() => {
        if(slug)
        {
            appwriteService.getPost(slug).then((response) => {
                setPost(response)
            }).catch((error) => {
                console.log(error)
            })
        }

        else{
            navigate('/')
        }
    },[slug,navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
      ) : null
}

export default EditPost
