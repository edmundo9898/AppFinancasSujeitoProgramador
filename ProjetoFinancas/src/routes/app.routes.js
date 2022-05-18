import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';


const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
    <AppDrawer.Navigator
        screenOptions={{
        headerShown: false,

        drawerStyle:{
            backgroundColor: '#171717'
        },
        drawerActiveTintColor: '#fff',
        drawerActiveBackgroundColor: '#00b94a',
        drawerInactiveBackgroundColor: '#000',
        drawerInactiveTintColor: '#DDD',
        drawerItemStyle:{
            marginVertical: 5,
        }

       }}  
    >
        <AppDrawer.Screen name='Home' component={Home}/>
        <AppDrawer.Screen name='Registrar'  component={New}/>
        <AppDrawer.Screen name='Profile' component={Profile}/>
    </AppDrawer.Navigator>
    );
}

export default AppRoutes;
