import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import * as Yup from 'yup';

const CursosForm = ({ navigation, route }) => {

  const curso = route.params?.curso || {}
  const id = route.params?.id

  function salvar(dados) {

    AsyncStorage.getItem('cursos').then(resultado => {

      const cursos = JSON.parse(resultado) || []

      if (id >= 0) {
        cursos.splice(id, 1, dados)
      } else {
        cursos.push(dados)
      }

      AsyncStorage.setItem('cursos', JSON.stringify(cursos))

      navigation.goBack()
    })

  }

  const cursoValidator = Yup.object().shape({
    nome: Yup.string().strict()
      .min(5, 'Valor muito curto')
      .max(10, 'Valor muito grande')
      .required('Campo obrigatório'),
    duracao: Yup.number(),
    modalidade: Yup.string().strict(),
    teste: Yup.string().strict(),
  },{ strict: true })

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de Curso</Text>

      <Formik
        initialValues={curso}
        validationSchema={cursoValidator}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View>
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Nome'
              value={values.nome}
              onChangeText={handleChange('nome')}
            />
            {(errors.nome && touched.nome) &&
              <Text style={{color: 'red', marginTop: 5}}>
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
              <Text style={{color: 'red', marginTop: 5}}>
                {errors.duracao}
              </Text>
            }

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Modalidade'
              value={values.modalidade}
              onChangeText={handleChange('modalidade')}
            />
            {(errors.modalidade && touched.modalidade) &&
              <Text style={{color: 'red', marginTop: 5}}>
                {errors.modalidade}
              </Text>
            }

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='teste'
              value={values.teste}
              onChangeText={handleChange('teste')}
            />
            {(errors.teste && touched.teste) &&
              <Text style={{color: 'red', marginTop: 5}}>
                {errors.teste}
              </Text>
            }

            <Button onPress={handleSubmit}>Salvar</Button>
          </View>
        )}

      </Formik>



    </ScrollView>
  )
}

export default CursosForm