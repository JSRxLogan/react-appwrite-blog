import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Button, Input, Logo } from "../components/index"
import { login as authLogin } from "../store/slices"
import { Link } from 'react-router-dom'


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm()

    const login = async (data) => {

        setError("");
        // Reset the error message before attempting to login
        // This ensures that any previous error message is cleared before a new login attempt.
        try {

            const session = await authService.login(data)

            if (session) {
                const userData = await authService.getCurrentUser()

                if (userData) {
                    dispatch(authLogin(userData))
                    navigate("/")
                }

                else {
                    setError("Failed to fetch user data. Please try again.")
                }
            }

        } catch (error) {
            setError("Login failed. Please check your credentials and try again.")
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form
                    onSubmit={handleSubmit(login)}
                    className='mt-8'
                >

                    <div className='space-y-5'>

                        <Input
                            label="Email: "
                            placeHolder="Enter your email"
                            type='email'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label='Password: '
                            placeHolder='Enter your Password'
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                        />

                        <Button
                            type="submit"
                            className="
    w-full 
    bg-blue-600 
    text-white 
    font-semibold 
    py-2 
    rounded-xl 
    shadow-md 
    transition 
    duration-200 
    ease-in-out
    hover:bg-blue-700
    hover:shadow-lg
    active:bg-blue-800
    active:scale-95
  "
                        >
                            Sign In
                        </Button>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
