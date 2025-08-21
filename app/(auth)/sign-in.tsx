import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    try {
      const result = await signIn.create({
        identifier: form.email,
        password: form.password,
      });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace('/(root)/(tabs)');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  }, [form.email, form.password, isLoaded, signIn, setActive, router]);

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
          <Text className='absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5'>
            Welcome 👋
          </Text>
        </View>
        <View className='p-5'>
          <InputField
            label='Email'
            placeholder='Enter your email'
            icon={icons.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          <InputField
            label='Password'
            placeholder='Enter your password'
            secureTextEntry={true}
            icon={icons.lock}
            onChangeText={(value) => handleInputChange('password', value)}
          />
          <CustomButton
            title='Sign In'
            bgVariant='primary'
            onPress={onSignInPress}
            className='mt-6'
          />
          {/* OUATH */}
          <OAuth />
          <Link
            href={'/(auth)/sign-up'}
            className='mt-10 text-lg text-center text-general-200'
          >
            <Text className='mt-4 text-center'>
              Don&apos;t have an account?
            </Text>{' '}
            <Text className='text-primary-500'>Sign Up</Text>
          </Link>
        </View>
        {/*Verification Modal */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
