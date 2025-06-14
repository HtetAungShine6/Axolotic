import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const BUTTON_SIZE = 60;
const SECONDARY_BUTTON_SIZE = 45;
const ARC_RADIUS_X = 75; // Wider horizontal radius for oval shape
const ARC_RADIUS_Y = 65; // Shorter vertical radius for oval shape

// Angles for the three secondary buttons in degrees
const INCOME_ANGLE = 150;
const EXPENSE_ANGLE = 90;
const TRANSFER_ANGLE = 30;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const GestureAddButton = () => {
  const [showIcons, setShowIcons] = useState(false);
  const progress = useSharedValue(0);

  const handlePrimaryPress = () => {
    const targetValue = showIcons ? 0 : 1;
    if (targetValue === 1) {
      setShowIcons(true);
    }
    progress.value = withSpring(
      targetValue,
      { damping: 15, stiffness: 150 },
      (isFinished) => {
        if (isFinished && targetValue === 0) {
          runOnJS(setShowIcons)(false);
        }
      }
    );
  };

  const handleSecondaryPress = (
    path: "/manualInput" | "/documents" | "/sendaudio"
  ) => {
    router.push(path);
    progress.value = withSpring(
      0,
      { damping: 15, stiffness: 150 },
      (isFinished) => {
        if (isFinished) {
          runOnJS(setShowIcons)(false);
        }
      }
    );
  };

  const createAnimatedStyle = (angleDegrees: number) => {
    return useAnimatedStyle(() => {
      const angleRadians = (angleDegrees * Math.PI) / 180;
      const translateX = interpolate(
        progress.value,
        [0, 1],
        [0, -ARC_RADIUS_X * Math.cos(angleRadians)]
      );
      const translateY = interpolate(
        progress.value,
        [0, 1],
        [0, -ARC_RADIUS_Y * Math.sin(angleRadians)]
      );
      const scale = interpolate(progress.value, [0, 1], [0, 1]);

      return {
        transform: [{ translateX }, { translateY }, { scale }],
        opacity: progress.value,
      };
    });
  };

  const incomeStyle = createAnimatedStyle(INCOME_ANGLE);
  const expenseStyle = createAnimatedStyle(EXPENSE_ANGLE);
  const transferStyle = createAnimatedStyle(TRANSFER_ANGLE);

  const primaryIconStyle = useAnimatedStyle(() => {
    const rotation = interpolate(progress.value, [0, 1], [0, 45]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      {showIcons && (
        <>
          <AnimatedTouchableOpacity
            style={[styles.secondaryButton, transferStyle]}
            onPress={() => handleSecondaryPress("/manualInput")}
          >
            <Ionicons name="pencil-outline" size={24} color="white" />
          </AnimatedTouchableOpacity>
          <AnimatedTouchableOpacity
            style={[styles.secondaryButton, expenseStyle]}
            onPress={() => handleSecondaryPress("/documents")}
          >
            <Ionicons name="scan-outline" size={24} color="white" />
          </AnimatedTouchableOpacity>
          <AnimatedTouchableOpacity
            style={[styles.secondaryButton, incomeStyle]}
            onPress={() => handleSecondaryPress("/sendaudio")}
          >
            <Ionicons name="mic-outline" size={24} color="white" />
          </AnimatedTouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handlePrimaryPress}
        activeOpacity={0.8}
      >
        <Animated.View style={primaryIconStyle}>
          <Ionicons name="add" size={40} color={colors.primary} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: "rgba(239, 240, 242, 1)", // Light background for the button
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Ensure primary button is on top
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.7)",
    // Neuromorphic shadows
    shadowColor: "rgba(168, 178, 196, 1)", // Darker shadow
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10, // For Android (approximates the look)
  },
  secondaryButton: {
    position: "absolute",
    width: SECONDARY_BUTTON_SIZE,
    height: SECONDARY_BUTTON_SIZE,
    borderRadius: SECONDARY_BUTTON_SIZE / 2,
    backgroundColor: "rgba(79, 55, 138, 0.8)", // Glassy primary color
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    // Softer shadow for secondary icons
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
});

export default GestureAddButton;
