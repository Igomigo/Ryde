import { Link, router, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">This screen does not exist.</Text>
        <Link href="/" className="text-blue-500">
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-2xl mt-4"
            onPress={() => router.replace("/")}
          >
            <Text className="text-white font-semibold text-md">
              Go to home screen!
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}
