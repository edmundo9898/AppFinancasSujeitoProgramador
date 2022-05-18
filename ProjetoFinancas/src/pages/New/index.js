import React, {useState, useContext} from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import firebase from '../../services/FirebaseConnection';
import Header from '../../components/Header';
import Picker from '../../components/picker';
import {AuthContext} from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Background, Input, SubmitButton, SubmitText} from './styles';

export default function New() {
   const navigation = useNavigation();
    
   const [valor, setValor] = useState('');
   const [tipo, setTipo] = useState(null);
    const { user: usuario } = useContext(AuthContext); 
  //Adicionando
   function handleSubmit(){
     Keyboard.dismiss();
     if(isNaN(parseFloat(valor)) || tipo === null){
       alert('Preencha os campos');
       return;
     }
     Alert.alert(
       'Confirmando dados',
       `Tipo ${tipo} - Valor: ${parseFloat(valor)}`,
       [
         {
           text: 'Cancelar',
           style: 'cancel'
         },
         {
           text: 'Continuar',
           onPress: () => handleAdd()
         }
       ]
     )
     
   }


   //Adicionando no firebase

  async function handleAdd(){
     let uid = usuario.uid;

     let key = await firebase.database().ref('historico').child(uid).push().key;
     await firebase.database().ref('historico').child(uid).child(key).set({
        tipo: tipo,
        valor: parseFloat(valor),
        data: format(new Date(), 'dd/MM/yy') // 
     })

     //Atualizar saldo
     let user = firebase.database().ref('users').child(uid);
     await user.once('value').then((snapshot)=> {
       let saldo = parseFloat(snapshot.val().saldo);
       tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

       user.child('saldo').set(saldo);

     });
     setValor('');

     Keyboard.dismiss();
     navigation.navigate('Home');
   }

 return (
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
   <Background>
     <Header/>

     <SafeAreaView style={{alignItems: 'center'}}>
      <Input
      placeholder="Valor desejado"
      keyboardType="numeric"
      returnKeyType="next"
      onSubmitEditing={() => Keyboard.dismiss()}
      value={valor}
      onChangeText={ (text) => setValor(text)}
     
     />
     <Picker onChange={setTipo} tipo={tipo} />

      <SubmitButton onPress={handleSubmit}>
        <SubmitText>Registrar</SubmitText>
      </SubmitButton>
     </SafeAreaView>
   </Background>
   </TouchableWithoutFeedback>
  );
}