import React, { useState } from "react";
import { Image, Text, View, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { icons, images } from "@/constants";
import InputField from "@/components/inputField";
import CustomButton from "@/components/customButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";

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
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: "pending",
    error: "",
    code: "",
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        // TODO: Create the user in the database
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
        //router.replace('/')
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
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
              onPress={onSignUpPress}
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
                Already have an account?{" "}
              </Text>
              <Link
                href={"/sign-in"}
                className="text-primary-500 font-JakartaMedium"
              >
                sign in
              </Link>
            </View>
          </View>

          {/** Verification Modal*/}
          <ReactNativeModal
            isVisible={verification.state === "pending"}
            onModalHide={() => {
              setVerification({
                ...verification,
                state: "success",
              });
            }}
          >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Text className="text-2xl font-JakartaBold text-center">
                Verify your email
              </Text>
            </View>
          </ReactNativeModal>

          {/** Success Modal*/}
          <ReactNativeModal isVisible={verification.state === "success"}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Image
                source={images.check}
                className="w-[110px] h-[110px] mx-auto my-5"
              />
              <Text className="text-2xl font-JakartaBold text-center">
                Verified!
              </Text>
              <Text className="text-center mt-3 font-JakartaMedium text-gray-500 mx-5">
                You have successfully verified your account
              </Text>
              <CustomButton
                title="Browse Home"
                feelVariant="thick"
                className="mt-10 w-full"
                onPress={() => router.replace("/(root)/(tabs)/home")}
              />
            </View>
          </ReactNativeModal>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
