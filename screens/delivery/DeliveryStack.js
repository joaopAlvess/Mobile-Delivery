import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Deliverys from './Deliverys';
import DeliverysForm from './DeliverysForm';

const Stack = createNativeStackNavigator();

const DeliveryStack = () => {
    return (
        <>
            <Stack.Navigator
            screenOptions={{
                headerStyle: {
                  backgroundColor: '#f7f16f'
                }
              }}>
                <Stack.Screen name="deliverys" component={Deliverys} options={{ title: 'Deliverys' }} />
                <Stack.Screen name="deliverys-form" component={DeliverysForm} options={{ title: 'Deliverys' }} />
            </Stack.Navigator>
        </>
    )
}

export default DeliveryStack