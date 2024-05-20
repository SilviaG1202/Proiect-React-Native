import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { RootState } from '../../../redux/store';
import fetchUserData from '../../../api';
import styled from 'styled-components/native';

const colors = {
  lightPurpleBackground: '#E6E6FA', 
  darkPurpleText: '#800080', 
  darkBlueTitle: '#0D47A1'
};

const PurpleBackground = styled.View`
  flex: 1;
  background-color: ${colors.lightPurpleBackground}; 
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 20px; 
  margin-bottom: 10px; 
  color: ${colors.darkPurpleText};
  font-weight: bold;
`;

const Title = styled.Text`
  font-size: 25px;
  margin-bottom: 10px;
  color: ${colors.darkBlueTitle}; 
`;

const UserPage = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const data = await fetchUserData(token);
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  interface User {
    email: string;
    id: string;
  }

  interface UserDetails {
    currentlyGamesPlaying: number;
    gamesLost: number;
    gamesPlayed: number;
    gamesWon: number;
    user: User;
  }

  return (
    <PurpleBackground>
      <Title>Detalii utilizator:</Title>
      {userDetails && (
        <View>
          <StyledText>Email: {userDetails.user.email}</StyledText>
          <StyledText>ID: {userDetails.user.id}</StyledText>
          <Text>In acest moment in joc: {userDetails.currentlyGamesPlaying}</Text>
          <Text>Jocuri accesate: {userDetails.gamesPlayed}</Text>
          <Text>Jocuri castigate: {userDetails.gamesWon}</Text>
          <Text>Jocuri pierdute: {userDetails.gamesLost}</Text>
        </View>
      )}
    </PurpleBackground>
  );
};

export default UserPage;
