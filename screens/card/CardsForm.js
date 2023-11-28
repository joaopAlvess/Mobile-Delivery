import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
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
      <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>Formulário de Cards</Text>

      <Formik
        initialValues={card}
        validationSchema={cardValidator}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <View>

            <TextInput
              style={styles.compoInput}
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
              style={styles.compoInput}
              mode='outlined'
              label='Contato'
              keyboardType='number-pad'
              value={values.contato}
              onChangeText={(value) => { setFieldValue('contato', mask(value, '(99) 99999-9999')) }}
            />
            {(errors.contato && touched.contato) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.contato}
              </Text>
            }

            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='Email'
              keyboardType='email-address'
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {(errors.email && touched.email) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.email}
              </Text>
            }
            <TextInput
              style={styles.compoInput}
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
            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='CNPJ'
              keyboardType='number-pad'
              value={values.cnpj}
              onChangeText={(value) => { setFieldValue('cnpj', mask(value, '99.999.99/9999-99')) }}

            />
            {(errors.cnpj && touched.cnpj) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.cnpj}
              </Text>
            }

            <Picker
              selectedValue={values.fidelidade}
              onValueChange={handleChange('fidelidade')}
              style={{ height: 50, width: 370, marginTop: 10, textAlign: 'center' }}
              itemStyle={{ fontSize: 18, paddingLeft: 10 }}
            >
              <Picker.Item label="Cartão Fidelidade" value="" />
              <Picker.Item label="Sim" value="Sim" />
              <Picker.Item label="Não" value="Não" />
            </Picker>
            {(errors.fidelidade && touched.fidelidade) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.fidelidade}
              </Text>
            }

            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='Quantidade de Cartões'
              keyboardType='number-pad'
              value={values.qtdCartoes}
              onChangeText={handleChange('qtdCartoes')}
            />
            {(errors.qtdCartoes && touched.qtdCartoes) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.qtdCartoes}
              </Text>
            }

            <Button onPress={handleSubmit} style={{borderWidth: 1, borderRadius: 10, backgroundColor: '#f7f16f', marginTop: 10, color: '#0000'}}>Salvar</Button>
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
  }
})

export default CardsForm