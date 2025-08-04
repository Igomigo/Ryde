import React, { useState } from "react";
import { Image, Text, View, SafeAreaView, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { icons, images } from "@/constants";
import InputField from "@/components/inputField";
import CustomButton from "@/components/customButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const { isLoaded, signIn, setActive } = useSignIn();
  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      Alert.alert("Signin Error", err.errors[0].longMessage);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
            <Text className="text-black font-JakartaSemiBold text-2xl absolute bottom-7 left-4">
              Welcome 👋
            </Text>
          </View>

          <View className="mx-4 pb-8">
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
              title="Sign In"
              onPress={onSignInPress}
              className="mt-8 w-full"
              feelVariant="thick"
            />

            <View className="flex flex-row items-center justify-center my-5">
              <Text className="bg-general-100 h-[1px] flex-1"></Text>
              <Text className="text-lg font-JakartaSemiBold text-gray-500 mx-4">
                Or
              </Text>
              <Text className="bg-general-100 h-[1px] flex-1"></Text>
            </View>

            {/* OAuth */}
            <OAuth />

            <View className="flex flex-row items-center justify-center mt-3">
              <Text className="text-gray-500 font-JakartaMedium">
                Don't have an account?{" "}
              </Text>
              <Link
                href={"/sign-up"}
                className="text-primary-500 font-JakartaMedium"
              >
                sign up
              </Link>
            </View>
          </View>

          {/** Verification Modal*/}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
