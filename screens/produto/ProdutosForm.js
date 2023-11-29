import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import produtoValidator from '../../validators/produtoValidator'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'

const ProdutosForm = ({ navigation, route }) => {

  let produto = {
    delivery: '',
    nome_produto: '',
    preco_produto: '',
    pagamento: '',
    informacoes: ''
  }

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [deliverys, setDeliverys] = useState([])

  const id = route.params?.id


  if (id >= 0) {
    produto = route.params?.produto
  }

  useEffect(() => {
    AsyncStorage.getItem('deliverys').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setDeliverys(resultado)
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

            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='Nome Produto'
              value={values.nome_produto}
              onChangeText={handleChange('nome_produto')}
            />
            {(errors.nome_produto && touched.nome_produto) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.nome_produto}
              </Text>
            }
           
            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='Preço Produto'
              value={values.preco_produto}
              onChangeText={handleChange('preco_produto')}
            />
            {(errors.preco_produto && touched.preco_produto) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.preco_produto}
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

            <Button onPress={handleSubmit} style={{ borderWidth: 1, borderRadius: 10, backgroundColor: '#f7f16f', marginTop: 10, color: '#0000' }}>Salvar</Button>
          </View>
        )}

      </Formik>


    </ScrollView>
  )
};

const styles = StyleSheet.create({
  compoInput: {
    backgroundColor: '#fcf2c5',
    marginTop: 10
  }
})

export default ProdutosForm;