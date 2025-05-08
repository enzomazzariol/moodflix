import { TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Title } from "../commoms/Title";

export function ToggleIconButton({
  isActive,
  onPress,
  ActiveIcon,
  InactiveIcon,
  label,
  activeColor,
  inactiveColor,
}) {
  const Icon = isActive ? ActiveIcon : InactiveIcon;
  const iconColor = isActive ? activeColor : inactiveColor;

  return (
    <TouchableOpacity
      className="items-center justify-center"
      style={{ rowGap: hp("1%") }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Icon size={40} color={iconColor} />
      <Title className="text-slate-300 text-xl font-spaceGroteskBold">
        {label}
      </Title>
    </TouchableOpacity>
  );
}
