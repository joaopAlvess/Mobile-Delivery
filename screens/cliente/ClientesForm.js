import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import clienteValidator from '../../validators/clienteValidator'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'

const ClientesForm = ({ navigation, route }) => {

  let cliente = {
    nome: '',
    email: '',
    contato: '',
    endereco: '',
    Fidelidade: ''
  }

  const [selectedLanguage, setSelectedLanguage] = useState();

  const id = route.params?.id

  if (id >= 0) {
    cliente = route.params?.cliente
  }

  function salvar(dados) {

    AsyncStorage.getItem('clientes').then(resultado => {

      const clientes = JSON.parse(resultado) || []

      if (id >= 0) {
        clientes.splice(id, 1, dados)
      } else {
        clientes.push(dados)
      }

      AsyncStorage.setItem('clientes', JSON.stringify(clientes))

      navigation.goBack()
    })
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de cliente</Text>

      <Formik
        initialValues={cliente}
        validationSchema={clienteValidator}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <View>

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Nome'
              value={values.nome}
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
              label='Duração'
              keyboardType='decimal-pad'
              value={values.duracao}
              onChangeText={handleChange('duracao')}
            />
            {(errors.duracao && touched.duracao) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.duracao}
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

            <Button onPress={handleSubmit}>Salvar</Button>
          </View>
        )}

      </Formik>



    </ScrollView>
  )
}

export default ClientesForm