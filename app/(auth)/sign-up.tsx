import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/inputField";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full z-0 h-[250px]" />
          <Text className="text-black font-JakartaSemiBold text-2xl absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View>
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={formData.name}
            onChangeText={(value) => setFormData({...formData, name: value})}
          />
        </View>
      </View>
    </ScrollView>
  );
}
