import Link from 'next/link';
import React, { useState } from 'react';
import axiosInstance from '@/axiosConfiguration/axios-configuration';
import { useRouter } from 'next/router';
import { Circles } from 'react-loader-spinner';
interface signup {
    name: string;
    email: string;
    password: string;
}
const SignupForm = () => {
  const router = useRouter();
  const [userdata, setUserData] = useState<signup>({name: '',
  email: '',
  password: '',});
  const [error,setError] = useState<string[]| string>('')
  const [loading,setLoading] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    if(userdata?.email?.trim()?.length === 0 || userdata?.name?.trim()?.length === 0 || userdata?.password?.trim()?.length === 0){
        setError('Please fill all fields');
        setTimeout(()=>{
          setError('')
        },4000)
        setLoading(false)
        return;}
    axiosInstance.post('/users/sign-up', userdata)
    .then((response) => {
      setLoading(false)
      router.push('/login')
    })
    .catch((error:any) => { 
      setLoading(false)
      if(error?.response?.data?.message){
        setError(error?.response?.data?.message)
      }else{
        setError('Something went wrong. Please try again.')
      }
      setTimeout(()=>{
        setError('')
      },4000)
    });
  };
 
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center w-full">
            <div className="w-full max-w-md p-8 bg-yellow-500 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">Email</label>
                        <input className="w-full p-3 rounded bg-black text-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="email" id="email" name="email" required onChange={(e: any)=>{
                            setUserData({...userdata, email: e.target.value});
                        }} />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="name">Name</label>
                        <input className="w-full p-3 rounded bg-black text-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="text" id="name" name="name"  onChange={(e:any)=>{
                            setUserData({...userdata, name: e.target.value});
                        }} />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2" htmlFor="password">Password</label>
                        <input className="w-full p-3 rounded bg-black text-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="password" id="password" autoComplete="new-password" name="password" required  onChange={(e:any)=>{
                            setUserData({...userdata, password: e.target.value});
                        }}/>
                    </div>
                    <button className="w-full py-3 bg-black text-yellow-500 rounded hover:bg-yellow-600 transition-colors flex items-center justify-center" type="submit">{loading?<Circles
  height="30"
  width="30"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />:'Signup'}</button>
                </form>{
                  Array.isArray(error) ? 
                 <ul>{error.map((err: string, index: number) => <li key={index} className='text-red-500'>{err}</li>) }</ul> : <span className='text-red-500'>{error}</span>
                }
               
                <p className="mt-6 text-center">
                    Already have an account? <Link className="text-yellow-700 hover:underline" href="/login">Login</Link>
                </p>
            </div>
        </div>
  );
};

export default SignupForm;
