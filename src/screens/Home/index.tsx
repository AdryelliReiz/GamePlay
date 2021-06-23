import React, { useState ,useEffect } from 'react';
import {
    View,
    FlatList
} from 'react-native';
import {styles} from './styles';

import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';


export const Home = () => {
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
    }
  ];

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  };

  return (
    <View style={styles.container} >
        <View style={styles.header} >
            <Profile />
            <ButtonAdd />
        </View>

        <View>
            <CategorySelect 
              categorySelected={category}
              setCategory={handleCategorySelect}
            />

            <View style={styles.content} >
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
                  />
                )}
                ItemSeparatorComponent={() => <ListDivider />}
                style={styles.matches}
                showsVerticalScrollIndicator={false}
              />
          </View>
       </View>   
    </View>
  );
}