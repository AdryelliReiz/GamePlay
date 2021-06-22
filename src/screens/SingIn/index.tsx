import React from 'react';
import { 
    Text,
    View, 
    Image,
} from 'react-native';
import { styles } from './styles';
import { ButtonIcon } from '../../components/ButtonIcon';

import IllustrationImg from '../../assets/illustration.png';

export const SignIn = () => {
    return (
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
                    activeOpacity={0.7}
                />
            </View>
        </View>
    )
}