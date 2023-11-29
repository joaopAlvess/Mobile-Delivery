import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView, View } from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, MD3DarkTheme, Portal, Text } from 'react-native-paper'
import { AirbnbRating } from 'react-native-ratings'

const Produtos = ({ navigation }) => {

  const [produtos, setProdutos] = useState([])
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
    AsyncStorage.getItem('produtos').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setProdutos(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    produtos.splice(idExcluir, 1)
    AsyncStorage.setItem('produtos', JSON.stringify(produtos))
    carregarDados()
    setVisible(false)
  }

  const handleRatingChange = (newRating, index) => {
    const updatedProdutos = [...produtos];
    updatedProdutos[index].rating = newRating;
    setProdutos(updatedProdutos);
    AsyncStorage.setItem('produtos', JSON.stringify(updatedProdutos));
  };

  return (
    <>

      <ScrollView style={{ padding: 15 }}>

        {produtos.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content style={{ backgroundColor: '#fcf7d2' }}>
              <Text variant="titleLarge">Restaurante: {item.delivery}</Text>
              <Text variant="bodyMedium">Produto: {item.produto_id}</Text>
              <Text variant="bodyMedium">Cliente: {item.cliente}</Text>
              <Text variant="bodyMedium">Informações Pagamento: {item.pagamento}</Text>
              <Text variant="bodyMedium">Informações Adicionais: {item.informacoes}</Text>
              <Text variant="bodyMedium">Avaliação: {item.rating}</Text>
              <AirbnbRating
                count={5}
                reviews={['Terrível', 'Ruim', 'Ok', 'Bom', 'Excelente']}
                defaultRating={item.rating}
                size={20}
                onFinishRating={(rating) => handleRatingChange(rating, i)}
              />
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon='pencil-outline'
                onPress={() => navigation.push('produtos-form', { id: i, produto: item })}
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
        onPress={() => navigation.push('produtos-form')}
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

export default Produtos;