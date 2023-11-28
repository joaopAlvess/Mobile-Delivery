import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, MD3DarkTheme, Portal, Text } from 'react-native-paper'

const Restaurantes = ({ navigation }) => {

  const [restaurantes, setRestaurantes] = useState([])
  const [idExcluir, setIdExcluir] = useState(0)

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados()
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('restaurantes').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setRestaurantes(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    restaurantes.splice(idExcluir, 1)
    AsyncStorage.setItem('restaurantes', JSON.stringify(restaurantes))
    carregarDados()
    setVisible(false)
  }

  return (
    <>

      <ScrollView style={{ padding: 15 }}>
      

        {restaurantes.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content>
              <Text variant="titleLarge">{item.nomeEmpresa}</Text>
              <Text variant="bodyMedium">Telefone: {item.telefone}</Text>
              <Text variant="bodyMedium">CEP: {item.cep}</Text>
              <Text variant="bodyMedium">Tempo Entrega: {item.tempo_entrega}</Text>
              <Text variant="bodyMedium">Horário Funcionamento: {item.horario}</Text>
              <Text variant="bodyMedium">Avaliação: {item.avaliacao}</Text>
              <Text variant="bodyMedium">Entregador: {item.entregador}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton 
                icon='pencil-outline' 
                onPress={() => navigation.push('restaurantes-form', {id: i, restaurante: item})}
              />
              <IconButton
                icon='trash-can-outline'
                onPress={() => confirmarExclusao(i)}
              />
            </Card.Actions>
          </Card>
        ))}

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">Deseja realmente excluir o registro?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={excluir}>Sim</Button>
              <Button onPress={hideDialog}>Não</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </ScrollView>

      <FAB
        icon="plus"
        size='small'
        style={{ position: 'absolute', right: 10, bottom: 10 }}
        onPress={() => navigation.push('restaurantes-form')}
      />

    </>
  )
}

export default Restaurantes;