import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Entregadores from './Entregadores';
import EntregadorsForm from './EntregadoresForm';

const Stack = createNativeStackNavigator();

const EntregadorsStack = () => {
    return (
        <>
            <Stack.Navigator
            screenOptions={{
                headerStyle: {
                  backgroundColor: '#f7f16f'
                }
              }}>
                <Stack.Screen name="entregadores" component={Entregadores} options={{ title: 'Entregadores' }} />
                <Stack.Screen name="entregadores-form" component={EntregadorsForm} options={{ title: 'Entregadores' }} />
            </Stack.Navigator>
        </>
    )
}

export default EntregadorsStack