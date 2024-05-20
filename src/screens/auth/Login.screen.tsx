import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { loginAsync } from "../../redux/auth.slice";
import Login from "../../components/Login";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const handleGoToRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async (email: string, password: string) => {
    await dispatch(loginAsync({ email, password }))
      .unwrap()
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        setMessage(`Eroare la autentificare: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Login onSubmit={handleLogin} goToRegister={handleGoToRegister} />
      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;

