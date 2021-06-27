import React, {useState, useEffect} from 'react';
import { 
    View,
    Text,
    ImageBackground, 
    FlatList,
    Alert, 
    Share,
    Platform
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import  { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import { api } from '../../services/api';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { Load } from '../../components/Load';


type Params = {
    guildSelected: AppointmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}

export const AppointmentDetails = () => {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [isLoading, setIsLoading] = useState(true);

    const routes = useRoute();
    const { guildSelected } = routes.params as Params;

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);


        } catch {
            Alert.alert("Verifique as configurações do sevidor. Será que o Widget está habilitado?")
        } finally {
            setIsLoading(false)
        }
    }; 

    async function handleShareInvitation() {
        const message = Platform.OS === 'ios' 
        ? `Juste-se a ${guildSelected.guild.name}`
        : widget.instant_invite;

        Share.share({
            message,
            url: widget.instant_invite
        })
    }

    useEffect(() => {
        fetchGuildWidget()
    }, [])

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    guildSelected.guild.owner &&
                    <BorderlessButton onPress={handleShareInvitation} >
                        <Fontisto 
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground 
                source={BannerImg} 
                style={styles.banner}
            >
               <View style={styles.bannerContent} >
                    <Text style={styles.title} >
                        {guildSelected.guild.name}
                    </Text>

                    <Text style={styles.subtitle} >
                        {guildSelected.description}
                    </Text>
               </View>

            </ImageBackground>

            { 
                isLoading 
                ? <Load />
                : 
                <>
                    <ListHeader 
                        title="Jogadores"
                        subtitle={`Total ${widget.members.length}`}
                    />
                    <FlatList 
                        data={widget.members}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Member  data={item}/>
                        )}
                        ItemSeparatorComponent={() => <ListDivider isCentered />}
                        style={styles.members}
                    />
                </>
            }

            <View style={styles.footer} >
                <ButtonIcon 
                    title="Entrar na partida"
                />
            </View>
            
        </Background>
    )
};