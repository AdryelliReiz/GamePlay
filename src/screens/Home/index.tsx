import React, { useState ,useEffect } from 'react';
import {
    View,
    FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from './styles';

import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';



export const Home = () => {
  const navigation = useNavigation();

  const [category, setCategory] = useState('');
  const appointment = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true,
      }, 
      category: '1',
      date: '25/06 às 20:40h',
      description: 'É hoje que vamos para o torneio mundial de minecraft',
    },
    {
      id: '2',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true,
      }, 
      category: '1',
      date: '26/06 às 20:40h',
      description: 'É hoje que vamos para o torneio mundial de minecraft',
    },
    {
      id: '3',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: false,
      }, 
      category: '3',
      date: '27/06 às 20:40h',
      description: 'É hoje que vamos para o torneio mundial de minecraft',
    },
    {
      id: '4',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: false,
      }, 
      category: '3',
      date: '27/06 às 20:40h',
      description: 'É hoje que vamos para o torneio mundial de minecraft',
    },
    {
      id: '5',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: false,
      }, 
      category: '3',
      date: '27/06 às 20:40h',
      description: 'É hoje que vamos para o torneio mundial de minecraft',
    },
    {
      id: '6',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: false,
      }, 
      category: '3',
      date: '27/06 às 20:40h',
      description: 'É hoje que vamos para o torneio mundial de minecraft',
    },
  ];

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  };

  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails')
  };

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  };

  return (
    <Background>
      <View style={styles.header} >
        <Profile />
        <ButtonAdd 
          onPress={handleAppointmentCreate}
        />

      </View>

        <CategorySelect 
          categorySelected={category}
          setCategory={handleCategorySelect}
        />

        <ListHeader 
          title="Partidas agendadas"
          subtitle="Total 6"
        />

        <FlatList 
          data={appointment}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Appointment
              data={item}
              onPress={handleAppointmentDetails}
            />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
          contentContainerStyle={{paddingBottom: 69}}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
        />

    </Background>
  );
}