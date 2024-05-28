import  axiosInstance  from '@/axiosConfiguration/axios-configuration';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface login {
  email: string;
  password: string;
}
const LoginForm = () => {
  const router = useRouter();
  const [userdata, setUserData] = useState<login>({
  email: '',
  password: '',});
 const [ error,setError] = useState('')


 useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    router.push('/movies');
  }
  return () => {};
}, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userdata.email.trim().length === 0 || userdata.password.trim().length === 0) {
      setError('Please fill all fields');
      setTimeout(()=>{
        setError('')
      },4000)
      return
    }
    axiosInstance.post('/users/login', userdata)
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.data)); 
        router.push('/movies')
      })      
      .catch((error) => {        
        setError('Something went wrong. Please try again.')
        setTimeout(()=>{
          setError('')  
        },4000)
      });
  };

  return (<>
  
  <div className="bg-black text-white min-h-screen flex items-center justify-center w-full">
            <div className="w-full max-w-md p-8 bg-yellow-500 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">Email</label>
                        <input className="w-full p-3 rounded bg-black text-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="email" id="email" name="email" required  onChange={(e:any)=>{
                          setUserData({...userdata,email:e.target.value})
                        }}/>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2" htmlFor="password">Password</label>
                        <input className="w-full p-3 rounded bg-black text-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="password" id="password" name="password" autoComplete="new-password" required onChange={(e:any)=>setUserData({...userdata,password:e.target.value})} />
                    </div>
                    <button className="w-full py-3 bg-black text-yellow-500 rounded hover:bg-yellow-600 transition-colors" type="submit">Login</button>
                </form>
                <p className="mt-6 text-center">{error}</p>
                <p className="mt-6 text-center">
                    Dont have an account? <Link className="text-yellow-700 hover:underline" href="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    </>
  );
};

export default LoginForm;
