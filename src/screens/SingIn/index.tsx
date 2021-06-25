import React from 'react';
import { 
    Text,
    View, 
    Image,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import IllustrationImg from '../../assets/illustration.png';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';

import { useAuth } from '../../hooks/auth';

export const SignIn = () => {
    const navigaion = useNavigation();

    const { user } = useAuth();

    function heandleSignIn() {
        navigaion.navigate('Home');
    }

    return (
        <Background>
            <View style={styles.container} >
                <Image 
                    source={IllustrationImg} 
                    style={styles.image}
                    resizeMode="stretch" />

                <View style={styles.content} >
                    <Text style={styles.title} >
                        Conecte-se {'\n'}
                        e oraganize suas {'\n'}
                        jogatinas
                    </Text>
                    <Text style={styles.subtitle} >
                        Crie grupos para jogar seus games {`\n`}
                        favoritos com seus amigos
                    </Text>

                    <ButtonIcon 
                        title="Entrar com Discord"
                        onPress={heandleSignIn}
                    />
                </View>
            </View>
        </Background>
    )
}