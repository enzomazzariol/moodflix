import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
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