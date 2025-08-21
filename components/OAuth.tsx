import { icons } from '@/constants';
import React from 'react';
import { Image, Text, View } from 'react-native';
import CustomButton from './CustomButton';

const OAuth = () => {
  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log('Google Sign-In pressed');
  };
  return (
    <View>
      <View className='flex flex-row items-center justify-center mt-4 gap-x-3'>
        <View className='flex-1 h-[1px] bg-general-100' />
        <Text className='text-lg'>or</Text>
        <View className='flex-1 h-[1px] bg-general-100' />
      </View>
      <CustomButton
        title='Continue with Google'
        bgVariant='outline'
        textVariant='primary'
        onPress={handleGoogleSignIn}
        className='w-full mt-5 shadow-none'
        IconLeft={() => (
          <Image source={icons.google} className='w-5 h-5 mx-2' />
        )}
      />
    </View>
  );
};

export default OAuth;
