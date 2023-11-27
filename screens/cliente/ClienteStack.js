import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Clientes from './Clientes';
import ClientesForm from './ClientesForm';

const Stack = createNativeStackNavigator();

const ClienteStack = () => {
    return (
        <>
            <Stack.Navigator
            screenOptions={{
                headerStyle: {
                  backgroundColor: '#f7f16f'
                }
              }}>
                <Stack.Screen name="clientes" component={Clientes} options={{ title: 'Clientes' }} />
                <Stack.Screen name="clientes-form" component={ClientesForm} options={{ title: 'Clientes' }} />
            </Stack.Navigator>
        </>
    )
}

export default ClienteStack