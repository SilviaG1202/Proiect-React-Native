import React, { useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const colors = {
  lightPurpleBackground: '#E6E6FA', 
  darkPurpleBorder: '#800080',
  buttonBackground: '#800080',
  buttonText: '#FFFFFF',
  placeholderText: '#800080'
};
const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px;
  background-color: ${colors.lightPurpleBackground};
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 1px solid ${colors.darkPurpleBorder};
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: 15px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  background-color: ${colors.buttonBackground};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: ${colors.buttonText};
  font-size: 18px;
  font-weight: bold;
`;

export interface IRegister {
  onSubmit: (email: string, password: string) => void;
}

const Register: React.FC<IRegister> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Register form submit:', { email, password });
    onSubmit(email, password);
  };

  return (
    <Container>
      <Input
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <Input
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <Button onPress={handleSubmit}>
      <ButtonText>Submit</ButtonText>
      </Button>
    </Container>
  );
};

export default Register;
