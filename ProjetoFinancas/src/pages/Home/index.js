import React, {useContext, useState, useEffect} from 'react';
import { View,Text, Button } from 'react-native';
import {AuthContext} from '../../contexts/auth';
import firebase from '../../services/FirebaseConnection';
import Header from '../../components/Header';

import HistoricoList from '../../components/HistoricoList';

import {Background, Container, Nome, Saldo, Title, List} from './styles';

export default function Home() {
     const [historico, setHistorico] = useState([]);
     
     const[saldo, setSaldo] = useState(0);

     const{user} = useContext(AuthContext); 
     
     const uid = user && user.uid;

     useEffect(() => {
       async function loadList(){
          await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
            setSaldo(snapshot.val().saldo);
          });
       }
       loadList();
     }, []);

  return (
   <Background>
     <Header/>
     <Container>
       <Nome>{user && user.nome}</Nome>
       <Saldo>R$ {saldo.toFixed(2).replace(/(?=(\d{3})+(?!\d))/g, '$1.')} </Saldo>
     </Container>
     <Title>Ultima movimentação</Title>

     <List
     showsVerticalScrollIndicator={false}
     data={historico}
     keyExtractor={item => item.key}
     renderItem={({item}) => ( <HistoricoList data={item}/>)}

     />
   </Background>
  );
}