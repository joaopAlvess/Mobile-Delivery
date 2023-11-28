import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import clienteValidator from '../../validators/clienteValidator'


const ClientesForm = ({ navigation, route }) => {

  let cliente = {
    nome: '',
    email: '',
    contato: '',
    endereco: '',
    fidelidade: ''
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
              label='Email'
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
              label='Contato'
              keyboardType='number-pad'
              value={values.contato}
              onChangeText={handleChange('contato')}
            />
            {(errors.contato && touched.contato) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.contato}
              </Text>
            }

            <TextInput
              style={styles.compoInput}
              mode='outlined'
              label='Endereço'
              value={values.endereco}
              onChangeText={handleChange('endereco')}
            />
            {(errors.endereco && touched.endereco) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.endereco}
              </Text>
            }

            <Picker
              selectedValue={values.fidelidade}
              onValueChange={handleChange('fidelidade')}
              style={{ height: 50, width: 370, marginTop: 10, textAlign: 'center' }}
              itemStyle={{ fontSize: 18, paddingLeft: 10 }}>
              <Picker.Item label="Plano Fidelidade" value="" />
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

const styles = StyleSheet.create({
  compoInput: {
    backgroundColor: '#fcf2c5',
    marginTop: 10
  }
})

export default ClientesForm