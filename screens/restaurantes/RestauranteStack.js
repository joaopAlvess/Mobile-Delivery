import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Restaurantes from './Restaurantes';
import RestaurantesForm from './RestaurantesForm';

const Stack = createNativeStackNavigator();

const RestauranteStack = () => {
    return (
        <>
            <Stack.Navigator
            screenOptions={{
                headerStyle: {
                  backgroundColor: '#f7f16f'
                }
              }}>
                <Stack.Screen name="restaurantes" component={Restaurantes} options={{ title: 'Restaurantes' }} />
                <Stack.Screen name="restaurantes-form" component={RestaurantesForm} options={{ title: 'Restaurantes' }} />
            </Stack.Navigator>
        </>
    )
}

export default RestauranteStack;