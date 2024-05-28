import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HeaderMenu } from './header';
import { useRouter } from 'next/router';
import  axiosInstance  from '@/axiosConfiguration/axios-configuration';
import StarRating from 'react-star-rating-component';
const MoviesList = () => {
  const router = useRouter();
    const [movieList,setMovieList] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
        }
        const accessToken = JSON.parse(token || '');
        getMovieList(accessToken?.access_token);
        return () => {};
      }, []);

      const getMovieList = (token:string) => {
        axiosInstance.get('/movie/get-movies',{
            headers: {
              'Authorization': `Bearer ${token}`,
            }})
          .then((response:any) => {
            setMovieList(response.data ?? [])
          })
          .catch((error:any) => {            
          });
      }
  const movies = movieList?.map((item:any)=>{
    return {name:item?.title,category:item?.category?.name,rating:item?.rating,id:item?._id,yourRating:item?.yourRating,isRated:item?.isRated}
  })

  const rateMovie = (movieId:string,rating:number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    const accessToken = JSON.parse(token || '');
    axiosInstance.patch('/movie/rate-movie', {
      movieId: movieId,
      rating: rating
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken?.access_token}`,
      }
    })
      .then((response:any) => {
        getMovieList(accessToken?.access_token);
      })
      .catch((error:any) => {
      });
  }

return (
    <>
    <div className='flex w-full flex-col'>
        <HeaderMenu/>
    <div className="bg-black text-white min-h-screen flex items-center justify-center w-full">
        <div className="w-full max-w-3xl p-8 bg-yellow-500 rounded-lg shadow-lg mt-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Movie List</h2>
            <div className="grid grid-cols-4 gap-4">
                {movies.map((movie:any, index) => (
                    <div key={index} className="bg-black rounded-lg p-4 border border-yellow-300">
                        <h3 className="text-xl font-bold mb-2">{movie.name}</h3>
                        <p className="mb-2">Category: {movie.category}</p>
                        <p className="mb-2">Overall Rating: {movie.rating}</p>
                        <p className='mb-2'>Your Rating: <StarRating 
                        onStarClick={(nextValue, prevValue, name) => {
                          rateMovie(movie?.id,nextValue)
                      }}
   name={`rate${index}`}
   value={movie?.yourRating?.toString()}
   starCount={5}
   
/></p>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
    </>
);

};

export default MoviesList;
