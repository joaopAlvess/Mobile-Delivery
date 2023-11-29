import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import deliveryValidator from '../../validators/deliveryValidator'
import { mask } from 'remask'

const DeliverysForm = ({ navigation, route }) => {

  let delivery = {
    nome_empresa: '',
    telefone: '',
    cep: '',
    tempo_entrega: '',
    funcionamento: '',
    avaliacao: '',
  }

  const [selectedLanguage, setSelectedLanguage] = useState();

  const id = route.params?.id

  if (id >= 0) {
    delivery = route.params?.delivery
  }

  function salvar(dados) {

    AsyncStorage.getItem('deliverys').then(resultado => {

      const deliverys = JSON.parse(resultado) || []

      if (id >= 0) {
        deliverys.splice(id, 1, dados)
      } else {
        deliverys.push(dados)
      }

      AsyncStorage.setItem('deliverys', JSON.stringify(deliverys))

      navigation.goBack()
    })
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de delivery</Text>

      <Formik
        initialValues={delivery}
        validationSchema={deliveryValidator}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <View>

            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='Nome da Empresa'
              value={values.nome_empresa}
              onChangeText={handleChange('nome_empresa')}
            />
            {(errors.nome_empresa && touched.nome_empresa) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.nome_empresa}
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
              onChangeText={(value) => { setFieldValue('cep', mask(value, '99999-999')) }}
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
  }
})

export default DeliverysForm