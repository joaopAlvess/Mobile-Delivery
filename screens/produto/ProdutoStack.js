import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import produtos from './Produtos';
import ProdutosForm from './ProdutosForm';


const Stack = createNativeStackNavigator();

const ProdutoStack = () => {
    return (
        <>
            <Stack.Navigator
            screenOptions={{
                headerStyle: {
                  backgroundColor: '#f7f16f'
                }
              }}>
                <Stack.Screen name="produtos" component={produtos} options={{ title: 'Produtos' }} />
                <Stack.Screen name="produtos-form" component={ProdutosForm} options={{ title: 'Produtos' }} />
            </Stack.Navigator>
        </>
    )
}

export default ProdutoStack