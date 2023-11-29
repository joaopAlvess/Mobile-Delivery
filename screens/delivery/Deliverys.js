import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView, View } from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, MD3DarkTheme, Portal, Text } from 'react-native-paper'

const Deliverys = ({ navigation }) => {

  const [deliverys, setDeliverys] = useState([])
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
    AsyncStorage.getItem('deliverys').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setDeliverys(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    deliverys.splice(idExcluir, 1)
    AsyncStorage.setItem('deliverys', JSON.stringify(deliverys))
    carregarDados()
    setVisible(false)
  }

  return (
    <>

      <ScrollView style={{ padding: 15 }}>

        {deliverys.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content  style={{backgroundColor: '#fcf7d2'}}>
              <Text variant="titleLarge">Nome da Empresa: {item.nome_empresa}</Text>
              <Text variant="bodyMedium">Telefone: {item.telefone}</Text>
              <Text variant="bodyMedium">CEP: {item.cep}</Text>
              <Text variant="bodyMedium">Tempo Entrega: {item.tempo_entrega}</Text>
              <Text variant="bodyMedium">Horário Funcionamento: {item.funcionamento}</Text>
              <Text variant="bodyMedium">Produto: {item.nome_produto}</Text>
              <Text variant="bodyMedium">Preço: {item.preco_produto}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon='pencil-outline'
                onPress={() => navigation.push('deliverys-form', { id: i, delivery: item })}
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
        onPress={() => navigation.push('deliverys-form')}
      />

    </>
  )
}

const styles = StyleSheet.create({
  imagem: {
    width: 50,
    height: 50
  }
})

export default Deliverys;