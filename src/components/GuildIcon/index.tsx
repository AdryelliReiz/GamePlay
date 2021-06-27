import React from 'react';
import {
    Image, 
    View
} from 'react-native';
import { styles } from './styles';

import DiscordSvg from '../../assets/discord.svg';


const { CND_IMAGE } = process.env;
type Props = {
    guildId: string;
    iconId: string | null;
}

export const GuildIcon = ({guildId, iconId}: Props) => {
    const uri = `${CND_IMAGE}/icons/${guildId}/${iconId}.png`;

    return(
        <View style={styles.container} >
            { iconId 
                ?
                <Image 
                    source={{ uri }}
                    style={styles.image}
                    resizeMode="cover"
                />
                : 
                <DiscordSvg 
                    width={40}
                    height={40}
                />
            }
        </View>
        
    )
};