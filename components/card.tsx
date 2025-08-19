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
      className={`rounded-lg p-4 ${getVariantStyles(variant)} ${className}`}
    >
      {children}
    </View>
  );
};

const CardTitle = ({ children, className }: CardTitleProps) => {
  return <Text className={`text-lg font-semibold `}>{children}</Text>;
};

export { Card };
