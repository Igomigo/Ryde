import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { InputFieldProps } from "@/types/type";

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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full my-2">
      <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
        {label}
      </Text>
      <View
        className={`flex flex-row justify-start items-center relative
          bg-neutral-100 rounded-full border ${isFocused ? "border-primary-500" : "border-neutral-100"}
          ${containerStyle}`}
      >
        {icon && (
          <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
        )}
        <TextInput
          className={`rounded-full flex-1 p-4 font-JakartaBold text-[15px]
            ${inputStyle} text-left`}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
    </View>
  );
}
