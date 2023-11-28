import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import cardValidator from '../../validators/cardValidator'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'

const CardsForm = ({ navigation, route }) => {

  let card = {
    nome: '',
    email: '',
    contato: '',
    nomeEmpresa: '',
    cnpj: '',
    qtdCartoes: ''
  }

  const [selectedLanguage, setSelectedLanguage] = useState();

  const id = route.params?.id

  if (id >= 0) {
    card = route.params?.card
  }

  function salvar(dados) {

    AsyncStorage.getItem('cards').then(resultado => {

      const cards = JSON.parse(resultado) || []

      if (id >= 0) {
        cards.splice(id, 1, dados)
      } else {
        cards.push(dados)
      }

      AsyncStorage.setItem('cards', JSON.stringify(cards))

      navigation.goBack()
    })
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de Cards</Text>

      <Formik
        initialValues={card}
        validationSchema={cardValidator}
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
              label='Contato'
              value={values.contato}
              onChangeText={handleChange('contato')}
            />
            {(errors.contato && touched.contato) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.contato}
              </Text>
            }

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='email'
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {(errors.email && touched.email) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.email}
              </Text>
            }
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Nome Empresa'
              value={values.nomeEmpresa}
              onChangeText={handleChange('nomeEmpresa')}
            />
            {(errors.nomeEmpresa && touched.nomeEmpresa) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.nomeEmpresa}
              </Text>
            }

            <Picker
              selectedValue={values.fidelidade}
              onValueChange={handleChange('fidelidade')}>
              <Picker.Item label="Cartão Fidelidade" value="" />
              <Picker.Item label="Sim" value="Sim" />
              <Picker.Item label="Não" value="Não" />
            </Picker>
            {(errors.fidelidade && touched.fidelidade) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.fidelidade}
              </Text>
            }

            <Button onPress={handleSubmit}>Salvar</Button>
          </View>
        )}

      </Formik>



    </ScrollView>
  )
}

export default CardsForm