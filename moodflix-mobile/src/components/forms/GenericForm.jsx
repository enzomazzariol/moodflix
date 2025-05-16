import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
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
  const [formData, setFormData] = useState({});

  // Manejo de los cambios en los campos del formulario
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (formData) => {
    if(isLogin) {
      await onSubmit(formData.emailOrUsername, formData.password, formData.rememberMe);
    } else {
      await onSubmit(formData);
    }
  }

  return (
    <View style={{ width: wp("75%") }}>
      {fields.map((field) => {
        return (
          <View key={field.name} className="mb-3">
            <Text className="text-2xl font-outfitLight text-floralWhite mb-2">
              {field.label}
            </Text>
            <TextInput
              className="font-outfitRegular text-xl text-floralWhite bg-prussianBlue rounded-lg mb-4 text-sla"
              placeholder={field.placeholder}
              placeholderTextColor={"#e2e8f0"}
              onChangeText={(value) => handleChange(field.name, value)}
              value={formData[field.name]}
              keyboardType={field.keyboardType}
              secureTextEntry={field.secureTextEntry}
              maxLength={100}
              style={{
                padding: hp("1.3%"),
              }}
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
            <Text
              className="text-base font-outfitBold text-floralWhite"
              allowFontScaling={false}
            >
              Recordarme
            </Text>
          </TouchableOpacity>

          <Link href={accountRoute} asChild replace>
            <TouchableOpacity activeOpacity={0.9}>
              <Text
                className="text-base font-outfitBold text-floralWhite"
                allowFontScaling={false}
              >
                Olvide mi contraseña?
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        ""
      )}

      <SubmitBtn
        handleSubmit={() => handleSubmit(formData)}
        bgColor="bg-richBlue"
        textColor="text-floralWhite"
      >
        {buttonText}
      </SubmitBtn>

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
