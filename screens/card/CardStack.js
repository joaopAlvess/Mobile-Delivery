import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Cards from './Cards';
import CardsForm from './CardsForm';

const Stack = createNativeStackNavigator();

const CardStack = () => {
    return (
        <>
            <Stack.Navigator
            screenOptions={{
                headerStyle: {
                  backgroundColor: '#f7f16f'
                }
              }}>
                <Stack.Screen name="cards" component={Cards} options={{ title: 'Cards' }} />
                <Stack.Screen name="cards-form" component={CardsForm} options={{ title: 'Cartão Fidelidade' }} />
            </Stack.Navigator>
        </>
    )
}

export default CardStack