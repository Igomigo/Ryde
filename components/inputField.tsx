import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";
import { icons } from "@/constants";

export default function InputField({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  inputStyle,
  containerStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) {
  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback>
        <View className="w-full my-2">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative
                bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500
                ${containerStyle}`}
          >
            {icon && (
                <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
