import React from 'react';
import {
    View, 
    Text,
    Image
} from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';

type Props = {
    urlImage: string;
}

export const Avatar = ({urlImage}: Props ) => {
    const { secondary50, secondary70 } = theme.colors;

    return(
        <LinearGradient
            style={styles.container}
            colors={[secondary50, secondary70]}
        >
            <Image 
                source={{uri: urlImage}}
                style={styles.avatar}
             />
        </LinearGradient>
    )
};