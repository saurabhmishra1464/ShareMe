import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

const clientId = "827708411869-b3ac7071l2m7cn7k98emgkg75d8p1ucn.apps.googleusercontent.com";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    const tokenId = response.credential;
    // Decode the JWT token to get user profile
    const profileObj = JSON.parse(atob(tokenId.split('.')[1]));
    
    localStorage.setItem('user', JSON.stringify(profileObj));
    const { name, sub: googleId, picture: imageUrl } = profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/home', { replace: true });
    });
  };

  const handleFailure = (error) => {
    console.error('Google Login Failed:', error);
    alert('Failed to log in with Google. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
          <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className='w-full h-full object-cover'
          />
          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
            <div className='p-5'>
              <img src={logo} width="130px" alt="logo" />
            </div>
            <div className='shadow-2xl'>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleFailure}
                text="signin_with"
                shape="pill"
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
