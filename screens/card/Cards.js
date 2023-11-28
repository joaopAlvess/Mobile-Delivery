import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, MD3DarkTheme, Portal, Text } from 'react-native-paper'

const Cards = ({ navigation }) => {

  const [cards, setCards] = useState([])
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
    AsyncStorage.getItem('cards').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setCards(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    cards.splice(idExcluir, 1)
    AsyncStorage.setItem('cards', JSON.stringify(cards))
    carregarDados()
    setVisible(false)
  }

  return (
    <>

      <ScrollView style={{ padding: 15 }}>

        {cards.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content>
              <Text variant="titleLarge">{item.nome}</Text>
              <Text variant="bodyMedium">Email Corporativo: {item.email}</Text>
              <Text variant="bodyMedium">Contato: {item.contato}</Text>
              <Text variant="bodyMedium">Endereco: {item.endereco}</Text>
              <Text variant="bodyMedium">Fidelidade: {item.fidelidade}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton 
                icon='pencil-outline' 
                onPress={() => navigation.push('cards-form', {id: i, card: item})}
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
        onPress={() => navigation.push('cards-form')}
      />

    </>
  )
}

export default Cards;