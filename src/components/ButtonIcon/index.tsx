import React from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';
import { styles } from './styles';
import DiscordImg from '../../assets/discord.png';

type Props = TouchableOpacityProps & {
    title: string;
}

export const ButtonIcon = ({ title, ...rest }: Props) => {
    return(
        <TouchableOpacity 
            style={styles.container}
            {...rest}
        >
            <View style={styles.iconWrapper} >
                <Image 
                    style={styles.icon}
                    source={DiscordImg}
                />
            </View>

            <Text style={styles.title} >
                {title}
            </Text>
        </TouchableOpacity>
    )
};