import { Ride } from '@/types/types';
import React from 'react';
import { Image, Text, View } from 'react-native';

const RideCard = ({
  ride: {
    destination_address,
    destination_latitude,
    created_at,
    destination_longitude,
    driver,
    driver_id,
    fare_price,
    origin_address,
    origin_latitude,
    origin_longitude,
    payment_status,
    ride_time,
  },
}: {
  ride: Ride;
}) => {
  return (
    <View className='flex flex-row items-center justify-center p-4 mb-3 bg-white rounded-lg shadow-sm shadow-neutral-300'>
      <View className='flex flex-row items-center justify-between p-3'>
        <View className='flex flex-row items-center justify-center'>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude}, ${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className='w-[80px] h-[90px] rounded-lg'
          />
        </View>
      </View>
      <Text>hello</Text>
    </View>
  );
};

export default RideCard;
