import { useEffect } from 'react';
import { useRouter } from 'next/router';
import UpdateProfile from '../components/updateProfile';

const Profile = () => {
  const router = useRouter();
  const isLoggedIn = true; // This should be replaced with actual authentication check

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <UpdateProfile />
    </div>
  );
};

export default Profile;
