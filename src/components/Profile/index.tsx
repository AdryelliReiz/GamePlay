import React from 'react';
import {
    View, 
    Text,
} from 'react-native';
import { styles } from './styles';
import { Avatar } from '../../components/Avatar';

export const Profile = () => {
    return (
        <View style={styles.container} >
            
            <Avatar urlImage="https://github.com/AdryelliReiz.png" />

            <View>
                <View style={styles.user} >
                    <Text style={styles.greeting} >
                        Olá, 
                    </Text>

                    <Text style={styles.username} >
                        Adryelli
                    </Text>
                </View>

                <Text style={styles.message} >
                    Hoje é dia de vitória
                </Text>
            </View>
        </View>
    )
}
