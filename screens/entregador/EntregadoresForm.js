import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
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
  const [restaurantes, setRestaurantes] = useState([])
  const id = route.params?.id

  if (id >= 0) {
    entregador = route.params?.entregador
  }


  useEffect(() => {
    AsyncStorage.getItem('restaurantes').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setRestaurantes(resultado)
    })
  }, [])

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
              style={{ marginTop: 10, padding: 10, fontSize: 15 }}
              selectedValue={values.restaurante}
              onValueChange={handleChange('restaurante')
              }>
              <Picker.Item label='Restaurante' value='' />
              {restaurantes.map((item, i) => (
                <Picker.Item key={i}
                  label={item.nome}
                  value={item.nome}
                />
              ))}

            </Picker>
            {(errors.modalidade && touched.modalidade) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.modalidade}
              </Text>
            }

            <TextInput
              style={styles.compoInput}
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

const styles = StyleSheet.create({
  compoInput: {
    backgroundColor: '#fcf2c5',
    marginTop: 10
  }
})

export default EntregadorsForm;