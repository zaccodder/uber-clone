import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { fetchAPI } from '@/lib/fetch';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  // router
  const router = useRouter();
  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({ ...verification, state: 'pending' });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling

      Alert.alert('Error', err.errors[0].longMessage);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        // TODO: create user in database
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            clerkId: signUpAttempt.createdUserId,
          }),
        });
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: 'success' });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: 'Verification failed',
          state: 'failed',
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed',
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
          <Text className='absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5'>
            Create Your Account
          </Text>
        </View>
        <View className='p-5'>
          <InputField
            label='Name'
            placeholder='Enter your name'
            icon={icons.person}
            onChangeText={(value) => handleInputChange('name', value)}
          />
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
            title='Sign Up'
            bgVariant='primary'
            onPress={onSignUpPress}
            className='mt-6'
          />
          {/* OUATH */}
          <OAuth />
          <Link
            href={'/(auth)/sign-in'}
            className='mt-10 mb-10 text-lg text-center text-general-200'
          >
            <Text className='mt-4 text-center'>Already have an account?</Text>{' '}
            <Text className='text-primary-500'>Log in</Text>
          </Link>
        </View>
        {/*Verification Modal */}
        <ReactNativeModal
          isVisible={verification.state === 'pending'}
          onModalHide={() => {
            if (verification.state === 'success') {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className=' bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
            <Text className='mb-2 text-3xl font-JakartaSemiBold'>
              Verification
            </Text>
            <Text className='mb-5 text-gray-400 font-Jakarta'>
              We have sent a verification code to {form.email}
            </Text>
            <InputField
              label=' Code'
              placeholder='123456'
              icon={icons.lock}
              value={verification.code}
              keyboardType='numeric'
              onChangeText={(value) =>
                setVerification({ ...verification, code: value })
              }
            />

            {verification.error && (
              <Text className='mt-1 text-sm text-red-500 font-Jakarta'>
                {verification.error}
              </Text>
            )}
            <CustomButton
              title='Verify Email'
              onPress={onVerifyPress}
              className='mt-5 bg-success-500'
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className=' bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
            <Image
              source={images.check}
              className='w-[110px] h-[110px] mx-auto my-5'
            />
            <Text className='text-3xl text-center font-JakartaSemiBold'>
              Verified
            </Text>
            <Text className='text-base text-center text-gray-400 font-Jakarta'>
              Your have successfully verifie your account.
            </Text>
            <CustomButton
              title='Browse home'
              onPress={() => router.push('/(root)/(tabs)')}
              className='mt-5'
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
