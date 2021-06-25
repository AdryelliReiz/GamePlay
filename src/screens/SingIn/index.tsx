import React from 'react';
import { 
    Text,
    View, 
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import IllustrationImg from '../../assets/illustration.png';

import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';

import { useAuth } from '../../hooks/auth';


export const SignIn = () => {
    const { user, signIn, isLoading } = useAuth();

    async function heandleSignIn() {
        try{
            await signIn();
        } catch(err) {
            Alert.alert(err);
        }
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

                    {
                        isLoading 
                        ? <ActivityIndicator color={theme.colors.primary}/>
                        :  <ButtonIcon 
                            title="Entrar com Discord"
                            onPress={heandleSignIn}
                        />
                    }
                </View>
            </View>
        </Background>
    )
}