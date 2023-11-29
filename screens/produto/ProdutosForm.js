import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import produtoValidator from '../../validators/produtoValidator'
import { useEffect } from 'react'



const ProdutosForm = ({ navigation, route }) => {

  let produto = {
    delivery: '',
    produto_id: '',
    cliente: '',
    pagamento: '',
    informacoes: '',
  }

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [deliverys, setDeliverys] = useState([])
  const [clientes, setClientes] = useState([])
 


  const id = route.params?.id

  if (id >= 0) {
    produto = route.params?.produto
  }

  useEffect(() => {
    AsyncStorage.getItem('deliverys').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setDeliverys(resultado)
    })
    AsyncStorage.getItem('clientes').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setClientes(resultado)
    })
  }, [])

  function salvar(dados) {

    AsyncStorage.getItem('produtos').then(resultado => {

      const produtos = JSON.parse(resultado) || []

      if (id >= 0) {
        produtos.splice(id, 1, dados)
      } else {
        produtos.push(dados)
      }

      AsyncStorage.setItem('produtos', JSON.stringify(produtos))

      navigation.goBack()
    })
  }



  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de produto</Text>

      <Formik
        initialValues={produto}
        validationSchema={produtoValidator}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <View>

            <Picker
              style={{ marginTop: 10, padding: 10, fontSize: 15 }}
              selectedValue={values.delivery}
              onValueChange={handleChange('delivery')
              }>
              <Picker.Item label='Restaurante' value='' />
              {deliverys.map((item, i) => (
                <Picker.Item key={i}
                  label={item.nome_empresa}
                  value={item.nome_empresa}
                />
              ))}
            </Picker>
            {(errors.delivery && touched.delivery) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.delivery}
              </Text>
            }

            <Picker
              style={{ marginTop: 10, padding: 10, fontSize: 15 }}
              selectedValue={values.produto_id}
              onValueChange={handleChange('produto_id')
              }>
              <Picker.Item label='Produto' value='' />
              {deliverys.map((item, i) => (
                <Picker.Item key={i}
                  label={item.nome_produto}
                  value={item.nome_produto}
                />
              ))}
            </Picker>
            {(errors.produto && touched.produto) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.produto}
              </Text>
            }

            <Picker
              style={{ marginTop: 10, padding: 10, fontSize: 15 }}
              selectedValue={values.cliente}
              onValueChange={handleChange('cliente')
              }>
              <Picker.Item label='Cliente' value='' />
              {clientes.map((item, i) => (
                <Picker.Item key={i}
                  label={item.nome}
                  value={item.nome}
                />
              ))}
            </Picker>
            {(errors.cliente && touched.cliente) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.cliente}
              </Text>
            }

            <Picker
              selectedValue={values.pagamento}
              onValueChange={handleChange('pagamento')}
              style={{ height: 50, width: 370, marginTop: 10, textAlign: 'center' }}
              itemStyle={{ fontSize: 18, paddingLeft: 10 }}>
              <Picker.Item label="Forma de Pagamento" value="" />
              <Picker.Item label="Cartão de Crédito" value="cartao" />
              <Picker.Item label="Pagamento no Local" value="dinheiro" />
              <Picker.Item label="Pix" value="pix" />
            </Picker>
            {(errors.modalidade && touched.modalidade) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.modalidade}
              </Text>
            }

            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='Informações Adicionais'
              value={values.informacoes}
              onChangeText={handleChange('informacoes')}
            />
            {(errors.informacoes && touched.informacoes) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.informacoes}
              </Text>
            }

            <Button onPress={() => { console.log('Botão Salvar pressionado'); handleSubmit(); }} style={{ borderWidth: 1, borderRadius: 10, backgroundColor: '#f7f16f', marginTop: 10, color: '#0000' }}>Salvar</Button>
          </View>
        )}

      </Formik>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  compoInput: {
    backgroundColor: '#fcf2c5',
    marginTop: 10
  },
  maskCurrency: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#fcf2c5'

  }
})

export default ProdutosForm