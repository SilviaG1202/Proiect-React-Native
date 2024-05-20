import React, { useEffect } from 'react';
import Register from '../../components/Register';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync, loginAsync } from '../../redux/auth.slice';
import { RootState } from '../../redux/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './Login.screen';

const RegisterScreen: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const status = useSelector((state: RootState) => state.auth.status);
    const error = useSelector((state: RootState) => state.auth.error);

    const handleRegister = async (email: string, password: string) => {
        try {
            await dispatch(registerAsync({ email, password })).unwrap();
            await dispatch(loginAsync({ email, password })).unwrap();
            navigation.navigate("Home");
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    useEffect(() => {
        if (status === 'failed' && error) {
            console.error('Registration error:', error);
        }
    }, [status, error]);

    return <Register onSubmit={handleRegister} />;
};

export default RegisterScreen;