import React, { useEffect, useState } from 'react';
import { HeaderMenu } from './header';
import { useRouter } from 'next/router';
import axiosInstance from '@/axiosConfiguration/axios-configuration';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';
const UpdateProfile = () => {
    const router =  useRouter()
    const [userData,setUserData] = useState<any>()
    const [updateRequest,setUpdateRequest] = useState<any>()
    const [categoriesOptions,setCategoriesOptions] = useState<any>([])
    const [loading,setLoading] = useState<boolean>(false)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
        }
        const accessToken = JSON.parse(token || '');
        getUserProfile(accessToken?.access_token);
        getCategories(accessToken?.access_token)
        return () => {};
      }, []);

      const getUserProfile = (token:string) => {
        axiosInstance.get('/users/me',{
            headers: {
              'Authorization': `Bearer ${token}`,
            }})
          .then((response:any) => {
            console.log(response.data)
            setUserData(response.data)

          })
          .catch((error:any) => {            
          });
      }

      const updateProfile = (token:string) => {
        setLoading(true)
        axiosInstance.patch('/users/update-profile',updateRequest,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }})
          .then((response:any) => {
            toast.success("Your Profile Update Successfully !")
            setLoading(false)
            getUserProfile(token)
          })
          .catch((error:any) => { 
            toast.error(error?.response?.data?.message ?? "Something went wrong! Please try again.");
            setLoading(false)           
          });
      }
   const getCategories = (token:string)=>{
    axiosInstance.get('/users/get-categories',{
        headers: {
          'Authorization': `Bearer ${token}`,
        }})
      .then((response:any) => {

        const options = response.data.map((category:any )=> ({ value: category?._id, label: category?.name }));
        setCategoriesOptions(options);

      })
      .catch((error:any) => {            
      });
   }
  return (
    
    <div className='flex flex-col w-full'>
    <HeaderMenu/>
    <div className="bg-black text-white min-h-screen flex items-center justify-center w-full">
            <div className="w-full max-w-md p-8 bg-yellow-500 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
               {userData?.image && <img src={userData?.image}></img>}
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    const token = localStorage.getItem('token');
                    if (!token) {
                      router.push('/login');
                    }
                    const accessToken = JSON.parse(token || '');
                    updateProfile(accessToken?.access_token) }}>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">Email</label>
                        <input className="w-full p-3 rounded bg-black text-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="email" id="email" name="email" value={userData?.email ?? ''} readOnly />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="name">Name</label>
                        <input className="w-full p-3 rounded bg-black text-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="text" id="name" name="name" value={userData?.name ?? ''}  onChange={(e) => {
                            setUpdateRequest({ ...updateRequest, name: e.target.value })
                            setUserData({ ...userData, name: e.target.value })}} />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2" htmlFor="password">Password</label>
                        <input className="w-full p-3 rounded bg-black text-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="password" autoComplete="new-password" id="password" name="password" value={userData?.password ?? ''}  onChange={(e)=>{
                            setUpdateRequest({ ...updateRequest, password: e.target.value })
                            setUserData({ ...userData, password: e.target.value })
                        }} />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="address">Address</label>
                        <textarea className="w-full p-3 rounded bg-black text-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" id="address" name="address" value={userData?.address ?? ''} onChange={(e)=>{
                            setUpdateRequest({ ...updateRequest, address: e.target.value })
                            setUserData({ ...userData, address: e.target.value })
                        }} />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="dob">Date of Birth</label>
                        <input className="w-full p-3 rounded bg-black text-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="date" id="dob" name="dob"  value={userData?.dob ?? '' } onChange={(e)=>{
                            setUpdateRequest({ ...updateRequest, dob: e.target.value })
                            setUserData({ ...userData, dob: e.target.value })
                        }} />
                    </div>
                    <div className="mb-4">
            <label className="block mb-2" htmlFor="categories">Categories</label>
            <Select
              isMulti
              options={categoriesOptions}
              className="text-black"
              value={userData?.categories?.map((category:any) => ({ value: category?._id, label: category?.name })) || []}
              onChange={(selectedOptions) => {
                const categories = selectedOptions.map((option:any) => option.value);
                console.log('categories', categories);
                console.log(selectedOptions)
                selectedOptions = selectedOptions.map((option:any) => {
                     return {_id:option?.value, name:option?.label}
                });
                console.log(selectedOptions)
                setUpdateRequest({ ...updateRequest, categories });
                setUserData({ ...userData, categories:selectedOptions });
              }}
            />
          </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="profilePhoto">Profile Photo</label>
                        <input className="w-full p-3 rounded bg-black text-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="file" id="profilePhoto" name="profilePhoto" accept="image/*" onChange={(e)=>{
                            setUpdateRequest({ ...updateRequest, image: e.target.files?.[0] })
                            setUserData({ ...userData, image: e.target.files?.[0] })
                        }} />
                    </div>
                    <button className="w-full py-3 bg-black text-yellow-500 rounded hover:bg-yellow-600 transition-colors flex items-center justify-center" type="submit">{loading?<Circles
  height="30"
  width="30"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />:'Update Profile'}</button>
                </form>
            </div>
        </div>
        </div>
  );
};

export default UpdateProfile;
