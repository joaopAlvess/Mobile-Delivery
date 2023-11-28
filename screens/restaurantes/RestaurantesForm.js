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
    nome: '',
    telefone: '',
    cep: '',
    tempo_entrega: '',
    funcionamento: '',
    avaliacao: '',
    entregador: ''
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
    <ScrollView style={styles.container}>
      <Text>Cadastro de restaurante</Text>

      <Image style={{ height: '30%', width: '100%' }}
        source={require('..//..//assets/restaurante2.jpg')} />

      <Formik
        initialValues={restaurante}
        validationSchema={restauranteValidator}
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

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Cep'
              keyboardType='decimal-pad'
              value={values.cep}
              onChangeText={handleChange('duracao')}
            />
            {(errors.duracao && touched.duracao) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.duracao}
              </Text>
            }

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Tempo Entrega'
              keyboardType='decimal-pad'
              value={values.tempo_entrega}
              onChangeText={handleChange('duracao')}
            />
            {(errors.duracao && touched.duracao) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.duracao}
              </Text>
            }

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Funcionamento'
              keyboardType='decimal-pad'
              value={values.funcionamento}
              onChangeText={handleChange('duracao')}
            />
            {(errors.duracao && touched.duracao) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.duracao}
              </Text>
            }

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Avaliacao'
              keyboardType='decimal-pad'
              value={values.avaliacao}
              onChangeText={handleChange('duracao')}
            />
            {(errors.duracao && touched.duracao) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.duracao}
              </Text>
            }

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Entregador'
              keyboardType='decimal-pad'
              value={values.entregador}
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

            <Picker
              selectedValue={values.curso_id}
              onValueChange={handleChange('curso_id')}>
              <Picker.Item label="Curso" value="" />
              {cursos.map((item, i) => (
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

            <Button onPress={handleSubmit}>Salvar</Button>
          </View>
        )}

      </Formik>



    </ScrollView>
  )
}

export default RestaurantesForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 60,
  }
})