import React from 'react';
import {
    Image
} from 'react-native';
import { styles } from './styles';

export const GuildIcon = () => {
    const uri = "https://www.freeiconspng.com/uploads/csgo-icon-12.png";
    return(
        <Image 
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
        />
    )
};