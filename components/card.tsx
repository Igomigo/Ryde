import React from "react";
import { Text, View } from "react-native";

const Card = ({ children, className, variant = "default" }: CardProps) => {
  const getVariantStyles = (variant: CardProps["variant"]) => {
    switch (variant) {
      case "elevated":
        return "shadow-md";
      default:
        return "border border-gray-200";
    }
  };

  return (
    <View
      className={`rounded-lg flex flex-col gap-2 p-4 ${getVariantStyles(variant)} ${className}`}
    >
      {children}
    </View>
  );
};

const CardTitle = ({ children, className }: CardTitleProps) => {
  return (
    <Text className={`text-lg font-semibold ${className}`}>{children}</Text>
  );
};

const CardDescription = ({ children, className }: CardDescriptionProps) => {
  return (
    <Text className={`text-sm text-gray-500 ${className}`}>{children}</Text>
  );
};

const CardContent = ({ children, className }: CardContentProps) => {
  return <View className={`${className}`}>{children}</View>;
};

export { Card, CardContent, CardDescription, CardTitle };
