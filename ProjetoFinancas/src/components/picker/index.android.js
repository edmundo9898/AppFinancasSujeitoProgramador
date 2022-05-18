import React from 'react';
import {Picker as RNPickerSelect } from '@react-native-picker/picker'; 
import {PickerView} from './styles';


export default function Picker({onChange, tipo}){
    return(
        <PickerView>
           <RNPickerSelect
           style={{
              width: '100%'
           }}
          

           selectedValue={tipo}
           onValueChange={ (valor) => onChange(valor) }
           >
                 <RNPickerSelect.item label="Selecione"  value="Null" />
                 <RNPickerSelect.item label="Receita"  value="receita" />
                 <RNPickerSelect.item label="Despesa"  value="Despesa" />
           </RNPickerSelect>

        </PickerView>
    )
}