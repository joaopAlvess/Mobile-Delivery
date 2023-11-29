import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ClienteStack from './screens/cliente/ClienteStack';
import EntregadorsStack from './screens/entregador/EntregadorStack';
import CardStack from './screens/card/CardStack';
import ProdutoStack from './screens/produto/ProdutoStack';
import DeliveryStack from './screens/delivery/DeliveryStack';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
          barStyle={{backgroundColor: '#f7f16f'}}
          >
            <Tab.Screen
              name="Clientes" 
              component={ClienteStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account-box" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Delivery" 
              component={DeliveryStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="google-my-business" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Entregadores" 
              component={EntregadorsStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="motorbike" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Card" 
              component={CardStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="smart-card" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Produtos" 
              component={ProdutoStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="food" size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}