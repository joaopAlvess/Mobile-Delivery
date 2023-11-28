import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import entregadorValidator from '../../validators/entregadorValidator'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'

const EntregadorsForm = ({ navigation, route }) => {

  let entregador = {
    nome: '',
    telefone: '',
    restaurante: '',
    cpf: ''
  }

  const [selectedLanguage, setSelectedLanguage] = useState();

  const id = route.params?.id

  if (id >= 0) {
    entregador = route.params?.entregador
  }

  function salvar(dados) {

    AsyncStorage.getItem('entregadors').then(resultado => {

      const entregadors = JSON.parse(resultado) || []

      if (id >= 0) {
        entregadors.splice(id, 1, dados)
      } else {
        entregadors.push(dados)
      }

      AsyncStorage.setItem('entregadors', JSON.stringify(entregadors))

      navigation.goBack()
    })
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de entregador</Text>

      <Formik
        initialValues={entregador}
        validationSchema={entregadorValidator}
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
              label='Telefone'
              keyboardType='decimal-pad'
              value={values.telefone}
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

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='CPF'
              value={values.cpf}
              onChangeText={handleChange('cpf')}
            />
            {(errors.cpf && touched.cpf) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.cpf}
              </Text>
            }




            <Button onPress={handleSubmit}>Salvar</Button>
          </View>
        )}

      </Formik>



    </ScrollView>
  )
}

export default EntregadorsForm;