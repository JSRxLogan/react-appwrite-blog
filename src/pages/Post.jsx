import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // new loading state
    const { slug } = useParams();
    const navigate = useNavigate();

    const userInfo = useSelector((state) => state.auth.userInfo);

    useEffect(() => {
        if (!slug) return navigate("/");
       
        const fetchPost = async () => {
            if (!slug) return navigate("/");

            try {
                const postData = await appwriteService.getPost(slug);
                if (postData) setPost(postData);
                else navigate("/");
            } finally {
                setLoading(false); // done fetching
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const deletePost = async () => {
        if (!post) return;
        const status = await appwriteService.deletePost(post.$id);
        if (status) {
            await appwriteService.deleteFile(post.image);
            navigate("/");
        }
    };

    // Wait for both post and userInfo to be ready
    if (loading) {
        return <div className="py-8 text-center">Loading post...</div>;
    }

    if (!post) {
        return <h1 className="text-2xl font-bold text-red-500 text-center">Post not found</h1>;
    }

    if (!userInfo) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-red-600 m-4 text-center text-2xl">User Not Logged In</p>
            </div>
        )
    }

    const isAuthor = post.userid === userInfo.userData.$id


    return (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFileView(post.image)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                <div className="browser-css">{parse(post.content)}</div>
            </Container>
        </div>
    );
}
