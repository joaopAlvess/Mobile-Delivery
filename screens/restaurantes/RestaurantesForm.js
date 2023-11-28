import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import restauranteValidator from '../../validators/restauranteValidator'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'

const RestaurantesForm = ({ navigation, route }) => {

  let restaurante = {
    nomeEmpresa: '',
    telefone: '',
    cep: '',
    tempo_entrega: '',
    funcionamento: '',
    avaliacao: '',
  }

  const [selectedLanguage, setSelectedLanguage] = useState();

  const id = route.params?.id

  if (id >= 0) {
    restaurante = route.params?.restaurante
  }

  useEffect(() => {
    AsyncStorage.getItem('entregadores').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setCursos(resultado)
    })
  }, [])

  function salvar(dados) {

    AsyncStorage.getItem('restaurantes').then(resultado => {

      const restaurantes = JSON.parse(resultado) || []

      if (id >= 0) {
        restaurantes.splice(id, 1, dados)
      } else {
        restaurantes.push(dados)
      }

      AsyncStorage.setItem('restaurantes', JSON.stringify(restaurantes))

      navigation.goBack()
    })
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Cadastro de restaurante</Text>

      <Formik
        initialValues={restaurante}
        validationSchema={restauranteValidator}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <View>

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
              label='Telefone'
              keyboardType='decimal-pad'
              value={values.telefone}
              onChangeText={handleChange('telefone')}
            />
            {(errors.telefone && touched.telefone) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.telefone}
              </Text>
            }

            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='CEP'
              keyboardType='decimal-pad'
              value={values.cep}
              onChangeText={handleChange('cep')}
            />
            {(errors.cep && touched.cep) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.cep}
              </Text>
            }

            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='Tempo Entrega'
              keyboardType='decimal-pad'
              value={values.tempo_entrega}
              onChangeText={handleChange('tempo_entrega')}
            />
            {(errors.tempo_entrega && touched.tempo_entrega) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.tempo_entrega}
              </Text>
            }

            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='Funcionamento'
              keyboardType='decimal-pad'
              value={values.funcionamento}
              onChangeText={handleChange('funcionamento')}
            />
            {(errors.funcionamento && touched.funcionamento) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.funcionamento}
              </Text>
            }

            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='Avaliacao'
              keyboardType='decimal-pad'
              value={values.avaliacao}
              onChangeText={handleChange('avaliacao')}
            />
            {(errors.avaliacao && touched.avaliacao) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.avaliacao}
              </Text>
            }

            <Button onPress={handleSubmit} style={{ borderWidth: 1, borderRadius: 10, backgroundColor: '#f7f16f', marginTop: 10, color: '#0000' }}>Salvar</Button>
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

export default RestaurantesForm;

