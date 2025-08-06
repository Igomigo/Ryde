import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Text } from 'react-native'
import { useUser } from '@clerk/clerk-expo'

export default function Home() {
  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress;
  return (
    <SafeAreaView>
      <Text className='font-JakartaBold '>
        Welcome {email}
      </Text>
    </SafeAreaView>
  )
}