import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { onboarding } from '../../constants/index';

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className='items-center justify-between w-full h-full bg-white'>
      <TouchableOpacity
        onPress={() => router.replace('/(auth)/sign-up')}
        className='flex items-end justify-end w-full p-5'
      >
        <Text className='text-black font-JakartaBold text-md'>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className='w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full' />
        }
        activeDot={
          <View className='w-[32px] h-[4px] bg-[#0286FF] rounded-full' />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className='items-center justify-center p-5'>
            <Image
              source={item.image}
              className='w-full h-[300px] '
              resizeMode='contain'
            />
            <View className='flex-row items-start justify-center w-full mt-10'>
              <Text className='mx-10 text-3xl text-center text-black font-JakartaBold'>
                {item.title}
              </Text>
            </View>
            <Text className='mx-10 mt-3 text-lg text-center font-JakartaSemiBold text-[#858585]'>
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? 'Get Started' : 'Next'}
        onPress={() =>
          isLastSlide
            ? router.replace('/(auth)/sign-up')
            : swiperRef.current?.scrollBy(1)
        }
        className='w-11/12 mt-10'
      />
    </SafeAreaView>
  );
};

export default Welcome;
