import { Ride } from '@/types/types';
import React from 'react';
import { Text, View } from 'react-native';

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
    <View>
      <Text>hello</Text>
    </View>
  );
};

export default RideCard;
