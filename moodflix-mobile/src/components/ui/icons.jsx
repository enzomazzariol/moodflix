import Feather from "@expo/vector-icons/Feather";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";

export const HomeIcon = ({ size, color }) => {
    return <Octicons name="home" size={size} color={color} />;
}

export const SearchIcon = ({ size, color }) => {
  return <Octicons name="search" size={size} color={color} />;
};

export const StarIcon = ({ size, color }) => {
  return <Octicons name="star-fill" size={size} color={color} />;
};

export const ActivityIcon = ({ size, color }) => {
  return <Octicons name="bell-fill" size={size} color={color} />;
};

export const UserIcon = ({ size, color }) => {
  return <FontAwesome6 name="user-large" size={size} color={color} />;
};

export const CheckBoxIcon = ({ size, color }) => {
  return <Octicons name="check" size={size} color={color} />;
}

export const SelectArrowIcon = ({ size, color }) => {
  return <Feather name="chevron-down" size={size} color={color} />;
};

export const BackArrowIcon = ({ size, color }) => {
  return <Ionicons name="arrow-back" size={24} color="#fff" />;
}

export const RightArrowIcon = ({ size, color }) => {
  return <Ionicons name="chevron-forward" size={size} color={color} />;
}

export const RemoveItemIcon = ({ size, color }) => {
  return <Feather name="x" size={size} color={color} />;
}

export const SettingsIcon = ({ size, color }) => {
  return <Ionicons name="settings-outline" size={size} color={color} />;
};

export const MoreIcon = ({ size, color }) => {
  return <Feather name="more-horizontal" size={size} color={color} />;
};

export const TrailerIcon = ({ size, color }) => {
  return <Ionicons name="play" size={size} color={color} />;
};

export const PlusIcon = ({ size, color }) => {
  return <FontAwesome6 name="plus" size={size} color={color} />;
};

export const EyeIconOutline = ({ size, color }) => {
  return <Ionicons name="eye-outline" size={size} color={color} />;
};

export const EyeIconFill = ({ size, color }) => {
  return <Ionicons name="eye" size={size} color={color} />;
};

export const HeartOutlineIcon = ({ size, color }) => {
  return <Octicons name="heart" size={size} color={color} />;
};

export const HeartFillIcon = ({ size, color }) => {
  return <Octicons name="heart-fill" size={size} color={color} />;
};

export const WatchlistFillIcon = ({ size, color }) => {
  return <FontAwesome name="bookmark" size={size} color={color} />;
};

export const WatchlistOutlineIcon = ({ size, color }) => {
  return <FontAwesome name="bookmark-o" size={size} color={color} />;
};