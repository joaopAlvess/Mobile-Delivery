import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import entregadorValidator from '../../validators/entregadorValidator'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'

const EntregadorsForm = ({ navigation, route }) => {

  let entregador = {
    nome: '',
    telefone: '',
    delivery: '',
    cpf: ''
  }

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [deliverys, setDeliverys] = useState([])
  
  const id = route.params?.id

  if (id >= 0) {
    entregador = route.params?.entregador
  }


  useEffect(() => {
    AsyncStorage.getItem('deliverys').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setDeliverys(resultado)
    })
  }, [])

  function salvar(dados) {

    AsyncStorage.getItem('entregadores').then(resultado => {

      const entregadores = JSON.parse(resultado) || []

      if (id >= 0) {
        entregadores.splice(id, 1, dados)
      } else {
        entregadores.push(dados)
      }

      AsyncStorage.setItem('entregadores', JSON.stringify(entregadores))

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
              onChangeText={(value) => { setFieldValue('telefone', mask(value, '(99) 99999-9999')) }}
            />
            {(errors.telefone && touched.duracao) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.telefone}
              </Text>
            }

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
              label='CPF'
              value={values.cpf}
              onChangeText={(value) => { setFieldValue('cpf', mask(value, '999.999.999-99')) }}
            />
            {(errors.cpf && touched.cpf) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.cpf}
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

export default EntregadorsForm;