import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress;
  return (
    <SafeAreaView className="flex-1 px-4 gap-4 mt-4">
      <Text className="font-JakartaBold">Welcome {email}</Text>
    </SafeAreaView>
  );
}
