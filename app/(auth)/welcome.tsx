import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Onboarding() {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
