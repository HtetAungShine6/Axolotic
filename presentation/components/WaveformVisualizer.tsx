import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

interface WaveformVisualizerProps {
  isActive: boolean;
  barCount?: number;
  color?: string;
  speed?: "slow" | "normal" | "fast" | number; // New speed control
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isActive,
  barCount = 25,
  color = "#9333ea", // purple-600
  speed = "normal",
}) => {
  const animatedValues = useRef(
    Array.from({ length: barCount }, () => new Animated.Value(0.2))
  ).current;

  // Convert speed to multiplier
  const getSpeedMultiplier = (speed: "slow" | "normal" | "fast" | number) => {
    if (typeof speed === "number") return speed;

    switch (speed) {
      case "slow":
        return 2.5;
      case "normal":
        return 1;
      case "fast":
        return 0.4;
      default:
        return 1;
    }
  };

  const speedMultiplier = getSpeedMultiplier(speed);

  useEffect(() => {
    let animations: Animated.CompositeAnimation[] = [];

    if (isActive) {
      animations = animatedValues.map((animatedValue, index) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: Math.random() * 0.8 + 0.2,
              duration: (150 + Math.random() * 100) * speedMultiplier,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: Math.random() * 0.6 + 0.1,
              duration: (150 + Math.random() * 100) * speedMultiplier,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: Math.random() * 0.9 + 0.3,
              duration: (200 + Math.random() * 150) * speedMultiplier,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: Math.random() * 0.4 + 0.1,
              duration: (100 + Math.random() * 50) * speedMultiplier,
              useNativeDriver: false,
            }),
          ])
        );
      });

      // Start animations with delays (also affected by speed)
      const delayMultiplier =
        speedMultiplier > 1 ? speedMultiplier * 0.5 : speedMultiplier;
      animations.forEach((animation, index) => {
        setTimeout(() => animation.start(), index * 10 * delayMultiplier);
      });
    } else {
      // Reset to idle state
      animatedValues.forEach((animatedValue) => {
        Animated.timing(animatedValue, {
          toValue: 0.2,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, [isActive, animatedValues, speedMultiplier]);

  return (
    <View className="flex-row items-center justify-center h-10 px-2 overflow-hidden">
      {animatedValues.map((animatedValue, index) => (
        <Animated.View
          key={index}
          className="mx-0.5 rounded-full"
          style={{
            width: 3,
            backgroundColor: color,
            height: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [6, 24],
            }),
            opacity: isActive ? 1 : 0.3,
          }}
        />
      ))}
    </View>
  );
};

export default WaveformVisualizer;
