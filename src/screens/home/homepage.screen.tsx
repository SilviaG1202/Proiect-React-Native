import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

const colors = {
  lightPurpleBackground: '#E6E6FA', 
  darkPurpleText: '#800080',
  buttonBackground: '#800080',
  buttonText: '#FFFFFF'
};

const PurpleBackground = styled.View`
  flex: 1;
  background-color: ${colors.lightPurpleBackground}; 
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const WelcomeText = styled.Text`
  font-size: 26px;
  font-weight: bold; 
  margin-bottom: 20px;
  color: ${colors.darkPurpleText}; 
`;

const StyledButton = styled(TouchableOpacity)`
  background-color: ${colors.buttonBackground};
  padding: 15px 30px;
  border-radius: 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${colors.buttonText};
  font-size: 18px;
  font-weight: bold;
`;

const HomeScreen = () => {
  const userName = useSelector((state: RootState) => state.auth.userName);
  const navigation = useNavigation();

  return (
    <PurpleBackground>
      <WelcomeText>Salutare {userName}! Pentru a accesa pagina ta de utilizator, da click pe butonul de mai jos: </WelcomeText>
      <StyledButton onPress={() => navigation.navigate('User')}>
        <ButtonText>Pagina de utilizator</ButtonText>
      </StyledButton>
    </PurpleBackground>
  );
};

export default HomeScreen;
