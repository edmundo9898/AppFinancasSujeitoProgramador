import React from 'react';
import { Feather } from '@expo/vector-icons'; 
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {Container, ButtonMenu} from './styles';

export default function Header() {
   
    const navigation = useNavigation();
    
 return (
   <Container>
       <ButtonMenu onPress={() => navigation.toggleDrawer()}>
         <Feather name="menu" size={24} color="#fff" />
       </ButtonMenu>
   </Container>
  );
}