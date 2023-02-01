import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { prepareUIRegistry } from "react-native-reanimated/lib/reanimated2/frameCallback/FrameCallbackRegistryUI";

const SIZE = 100.0;

const handleRotate = (progress) => {
  "worklet";
  return `${progress.value * 2 * Math.PI}rad`
}

export default function App() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: progress.value * SIZE / 2,
      transform: [{ scale: scale.value }, { rotate: handleRotate(progress) }],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), 5, true);
    scale.value = withRepeat(withSpring(1), 5, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[{ width: SIZE, height: SIZE, backgroundColor: "blue" }, reanimatedStyle]} />
      <Animated.View style={[{ width: SIZE, height: SIZE, backgroundColor: "#AAE3E2" }, reanimatedStyle]} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
