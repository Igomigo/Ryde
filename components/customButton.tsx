import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286FF]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const getFeelVariantStyle = (variant: ButtonProps["feelVariant"]) => {
  switch (variant) {
    case "semi":
      return "font-JakartaSemiBold text-base";
    case "thick":
      return "font-JakartaBold text-lg";
    default:
      return "font-JakartaRegular text-sm";
  }
};

export default function CustomButton({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  feelVariant = "thin",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex w-11/12 p-4 flex-row rounded-full justify-center items-center shadow-md shadow-neutral-400/70
        ${getBgVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`${getTextVariantStyle(textVariant)} ${getFeelVariantStyle(feelVariant)}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
}
