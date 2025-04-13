import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function useSearchBarAnimation(isFocused) {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(isFocused ? 1 : 0, {
      duration: 300,
    });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
      transform: [
        {
          translateY: withTiming(animatedValue.value === 1 ? 0 : 20, {
            duration: 300,
          }),
        },
      ],
    };
  });

  return { animatedStyle };
}
