import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import produtoValidator from '../../validators/produtoValidator'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'

const ProdutosForm = ({ navigation, route }) => {

  let produto = {
    restaurante: '',
    nome_produto: '',
    preco_produto: '',
    pagamento: '',
    informacoes: ''
  }

  const [selectedLanguage, setSelectedLanguage] = useState();

  const id = route.params?.id

  if (id >= 0) {
    produto = route.params?.produto
  }

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

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Restaurante'
              value={values.restaurante}
              onChangeText={handleChange('nome')}
            />
            {(errors.nome && touched.nome) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.nome}
              </Text>
            }

            <TextInput
              style={{ marginTop: 10 }}
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
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Nome Produto'
              value={values.nome_produto}
              onChangeText={handleChange('')}
            />
            {(errors.duracao && touched.duracao) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.duracao}
              </Text>
            }
            <TextInput
              style={{ marginTop: 10 }}
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
              onValueChange={handleChange('pagamento')}>
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
              style={{ marginTop: 10 }}
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

            <Picker
              selectedValue={values.modalidade}
              onValueChange={handleChange('modalidade')}>
              <Picker.Item label="Modalidade" value="" />
              <Picker.Item label="Presencial" value="Presencial" />
              <Picker.Item label="EAD" value="EAD" />
              <Picker.Item label="Híbrido" value="Híbrido" />
            </Picker>
            {(errors.modalidade && touched.modalidade) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.modalidade}
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