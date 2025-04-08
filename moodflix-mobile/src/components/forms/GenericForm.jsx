import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import SubmitBtn from "../commoms/SubmitBtn";
import { CheckBoxIcon } from "../ui/icons";

export default function GenericForm({
  fields,
  onSubmit,
  buttonText,
  accountText,
  accountRoute,
  isLogin,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({});

  // Manejo de los cambios en los campos del formulario
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    router.replace("/(tabs)");
    onSubmit(formData);
  };

  return (
    <View style={{ width: wp("70%") }}>
      {fields.map((field) => {
        return (
          <View key={field.name} className="mb-3">
            <Text className="text-2xl font-outfitLight text-floralWhite mb-2">
              {field.label}
            </Text>
            <TextInput
              className="p-3 font-outfitRegular text-lg text-floralWhite bg-prussianBlue rounded-lg mb-4"
              placeholder={field.placeholder}
              placeholderTextColor={colors.floralWhite}
              onChangeText={(value) => handleChange(field.name, value)}
              value={formData[field.name]}
              keyboardType={field.keyboardType}
              secureTextEntry={field.secureTextEntry}
              maxLength={100}
            />
          </View>
        );
      })}

      {isLogin ? (
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            className="flex-row items-center"
            activeOpacity={0.9}
            onPress={() =>
              setFormData({ ...formData, rememberMe: !formData.rememberMe })
            }
          >
            <View
              className={`w-5 h-5 mr-2 rounded border items-center justify-center`}
              style={{
                borderColor: colors.floralWhite,
                borderWidth: 1,
                backgroundColor: formData.rememberMe
                  ? colors.floralWhite
                  : "transparent",
              }}
            >
              {formData.rememberMe && (
                <CheckBoxIcon size={14} color={colors.black} />
              )}
            </View>
            <Text className="text-lg font-outfitBold text-floralWhite">
              Recordarme
            </Text>
          </TouchableOpacity>

          <Link href={accountRoute} asChild replace>
            <TouchableOpacity activeOpacity={0.9}>
              <Text className="text-lg font-outfitBold text-floralWhite">
                Olvide mi contraseña?
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        ""
      )}

      <SubmitBtn
        handleSubmit={handleSubmit}
        text={buttonText}
        bgColor={"richBlue"}
      />

      <Link href={accountRoute} asChild replace>
        <TouchableOpacity activeOpacity={0.9}>
          <Text className="text-lg font-outfitBold text-floralWhite text-center underline">
            {accountText}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
