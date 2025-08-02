import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./customButton";
import { icons } from "@/constants";

export default function OAuth() {
  const handleGoogleSignIn = async () => {
    console.log("Google Sign In");
  };

  return (
    <View>
      <CustomButton
        title="Log in with Google"
        onPress={handleGoogleSignIn}
        className="w-full shadow-none border-2 border-neutral-300"
        feelVariant="thick"
        bgVariant="outline"
        textVariant="primary"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-6 h-6 mx-2.5"
          />
        )}
      />
    </View>
  );
}
