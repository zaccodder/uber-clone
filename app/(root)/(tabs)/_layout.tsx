import { icons } from '@/constants';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

const TabBarIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => (
  <View
    className={`items-center justify-center rounded-full ${focused ? 'bg-general-400' : ''}`}
  >
    <View
      className={`rounded-full items-center justify-center h-12 w-12 ${focused ? 'bg-general-400' : ''}`}
    >
      <Image
        source={source}
        resizeMode='contain'
        tintColor='white'
        className='w-7 h-7'
      />
    </View>
  </View>
);

const _layout = () => {
  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#333333',
          borderRadius: 50,
          overflow: 'hidden',
          marginHorizontal: 20,
          marginBottom: 20,
          height: 70,
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          paddingTop: 18,
          alignItems: 'center',
          justifyContent: 'space-between',
          bottom: 20,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name='rides'
        options={{
          headerShown: false,
          title: 'Rides',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          headerShown: false,
          title: 'Chat',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
