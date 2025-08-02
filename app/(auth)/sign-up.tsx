import React, { useState } from "react";
import { Image, Text, View, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { icons, images } from "@/constants";
import InputField from "@/components/inputField";
import CustomButton from "@/components/customButton";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        extraScrollHeight={40}
        enableOnAndroid={true}
        style={{ flex: 1 }}
      >
        <View className="bg-white">
          <View className="relative w-full h-[250px]">
            <Image source={images.signUpCar} className="w-full z-0 h-[250px]" />
            <Text className="text-black font-JakartaSemiBold text-2xl absolute bottom-5 left-5">
              Create Your Account
            </Text>
          </View>
          
          <View className="mx-4 pb-8">
            <InputField
              label="Name"
              placeholder="Enter your name"
              icon={icons.person}
              value={formData.name}
              onChangeText={(value) =>
                setFormData({ ...formData, name: value })
              }
            />
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons.email}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(value) =>
                setFormData({ ...formData, email: value })
              }
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              secureTextEntry={true}
              value={formData.password}
              onChangeText={(value) =>
                setFormData({ ...formData, password: value })
              }
            />
            
            <CustomButton
              title="Sign Up"
              onPress={() => {}}
              className="mt-8 w-full"
              feelVariant="thick"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}