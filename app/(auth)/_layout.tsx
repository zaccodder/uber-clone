import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/(root)/(tabs)'} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default Layout;
