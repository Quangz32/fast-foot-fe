import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../services/api";
import { saveAuthToken } from "../utils/auth";
import Toast from "react-native-toast-message";

const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
    .min(10, "Số điện thoại không hợp lệ")
    .max(11, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

export default function LoginScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: { phone: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await login(values);
      await saveAuthToken(response.token);
      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công",
      });
      // Navigate to main app
      navigation.replace("Home");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại",
        text2: error.response?.data?.message || "Vui lòng thử lại sau",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/logo.webp")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>ĐĂNG NHẬP</Text>
        <Text style={styles.subtitle}>Vui lòng nhập số điện thoại đã đăng ký</Text>

        <Formik
          initialValues={{ phone: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Số điện thoại <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input, touched.phone && errors.phone && styles.inputError]}
                  placeholder="VD: 0938123456"
                  keyboardType="phone-pad"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Mật khẩu <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input, touched.password && errors.password && styles.inputError]}
                  placeholder="Nhập mật khẩu"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleSubmit()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Đăng nhập screen</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View style={styles.footer}>
          <Text style={styles.helpText}>
            Vui lòng liên hệ hotline <Text style={styles.hotline}>0977854609</Text> nếu bạn cần hỗ
            trợ.{" "}
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.callNow}>Gọi ngay</Text>
            </TouchableOpacity>
          </Text>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerLink}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.version}>v1.2.56</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: "#666",
  },
  form: {
    marginTop: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
  },
  required: {
    color: "#FF3B30",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#F8F8F8",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 5,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#FF3B30",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#FF3B30",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: "auto",
  },
  helpText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
  },
  hotline: {
    color: "#000",
    fontWeight: "bold",
  },
  callNow: {
    color: "#FF3B30",
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#666",
    fontSize: 16,
  },
  registerLink: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "bold",
  },
  version: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    marginTop: 10,
  },
});
