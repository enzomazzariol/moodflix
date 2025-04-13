import Feather from "@expo/vector-icons/Feather";
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
  return <Ionicons name="chevron-back" size={size} color={color} />;
}

export const RightArrowIcon = ({ size, color }) => {
  return <Ionicons name="chevron-forward" size={size} color={color} />;
}

export const RemoveItemIcon = ({ size, color }) => {
  return <Feather name="x" size={size} color={color} />;
}