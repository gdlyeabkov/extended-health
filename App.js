import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Octicons, Foundation, Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

function MainTabsActivity() {
  return (
    <Tab.Navigator screenOptions={{
      
    }}>
      <Tab.Screen name="Главная" component={MainPageActivity} />
      <Tab.Screen name="Together" component={TogetherActivity} />
      <Tab.Screen name="Фитнес" component={FitnesActivity} />
      <Tab.Screen name="Моя стр." component={MyPageActivity} />
    </Tab.Navigator>
  )
}

export function MainPageActivity() {
  return (
    <View></View>
  )
}

export function TogetherActivity() {
  return (
    <View></View>
  )
}

export function FitnesActivity() {
  
  const fitnesImg = require('./assets/fitnes.jpg')

  return (
    <ScrollView style={styles.fitnessContainer}>
      <View style={styles.fitnessContainerInnovations}>
        <View style={styles.fitnessContainerInnovationsHeader}>
          <Text style={styles.fitnessContainerInnovationsHeaderLabel}>
            Новшества
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
        <ScrollView style={styles.fitnessContainerInnovationsList} horizontal={true}>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.fitnessContainerInnovations}>
        <View style={styles.fitnessContainerInnovationsHeader}>
          <Text style={styles.fitnessContainerInnovationsHeaderLabel}>
            Фитнес для женщин
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
        <ScrollView style={styles.fitnessContainerInnovationsList} horizontal={true}>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.fitnessContainerInnovations}>
        <View style={styles.fitnessContainerInnovationsHeader}>
          <Text style={styles.fitnessContainerInnovationsHeaderLabel}>
            Похудение
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
        <ScrollView style={styles.fitnessContainerInnovationsList} horizontal={true}>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.fitnessContainerInnovations}>
        <View style={styles.fitnessContainerInnovationsHeader}>
          <Text style={styles.fitnessContainerInnovationsHeaderLabel}>
            Наращивание мышечной массы
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
        <ScrollView style={styles.fitnessContainerInnovationsList} horizontal={true}>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.fitnessContainerInnovations}>
        <View style={styles.fitnessContainerInnovationsHeader}>
          <Text style={styles.fitnessContainerInnovationsHeaderLabel}>
            Работа над балансом
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
        <ScrollView style={styles.fitnessContainerInnovationsList} horizontal={true}>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.fitnessContainerInnovations}>
        <View style={styles.fitnessContainerInnovationsHeader}>
          <Text style={styles.fitnessContainerInnovationsHeaderLabel}>
            Тренировка на выносливость
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
        <ScrollView style={styles.fitnessContainerInnovationsList} horizontal={true}>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.fitnessContainerInnovations}>
        <View style={styles.fitnessContainerInnovationsHeader}>
          <Text style={styles.fitnessContainerInnovationsHeaderLabel}>
            Бег
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
        <ScrollView style={styles.fitnessContainerInnovationsList} horizontal={true}>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
            <Text style={styles.fitnessContainerInnovationDuration}>
              1 неделя
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.fitnessContainerInnovations}>
        <View style={styles.fitnessContainerInnovationsHeader}>
          <Text style={styles.fitnessContainerInnovationsHeaderLabel}>
            Майндфулнес
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
        <ScrollView style={styles.fitnessContainerInnovationsList} horizontal={true}>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
            <Text style={styles.fitnessContainerInnovationName}>
              Упражнения для сжигания ...
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.fitnessContainerInnovations}>
        <View style={styles.fitnessContainerInnovationsHeader}>
          <Text style={styles.fitnessContainerInnovationsHeaderLabel}>
            По поставщику
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
        <ScrollView style={styles.fitnessContainerInnovationsList} horizontal={true}>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
          </View>
          <View style={styles.fitnessContainerInnovation}>
            <Image source={fitnesImg} style={styles.fitnessContainerInnovationImg} />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export function MyPageActivity() {
  
  const userLogoImg = require('./assets/user_logo.png')
  
  return (
    <ScrollView style={styles.myPageContainer}>
      <View style={styles.myPageContainerUserHeader}>
        <View style={styles.myPageContainerUserHeaderPhotoAndEditBtn}>
          <Image source={userLogoImg} style={styles.myPageContainerUserHeaderPhoto} />
          <View style={styles.myPageContainerUserHeaderEditBtnWrap}>
            <Button title="Изменить" />
          </View>
        </View>
        <Text style={styles.myPageContainerUserHeaderName}>
          glebdyakov2000
        </Text>
      </View>
      <View style={styles.myPageContainerUserReportPerWeek}>
        <Text style={styles.myPageContainerUserReportPerWeekHeader}>
          Сводка за неделю
        </Text>
        <Text style={styles.myPageContainerUserReportPerWeekPeriodLabel}>
          7-13 февраля
        </Text>
        <View style={styles.myPageContainerUserReportPerWeekRow}>
          <Text style={styles.myPageContainerUserReportPerWeekRowLabel}>
            Ср. время активности
          </Text>
          <Text style={styles.myPageContainerUserReportPerWeekRowSeparator}>
            ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          </Text>
          <Text style={styles.myPageContainerUserReportPerWeekRowValue}>
            49
          </Text>
          <Text style={styles.myPageContainerUserReportPerWeekRowMeasure}>
            мин.
          </Text>
        </View>
        <View style={styles.myPageContainerUserReportPerWeekRow}>
          <Text style={styles.myPageContainerUserReportPerWeekRowLabel}>
            Среднее потребление калорий            
          </Text>
          <Text style={styles.myPageContainerUserReportPerWeekRowSeparator}>
            ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          </Text>
          <Text style={styles.myPageContainerUserReportPerWeekRowValue}>
            50
          </Text>
          <Text style={styles.myPageContainerUserReportPerWeekRowMeasure}>
            ккал            
          </Text>
        </View>
      </View>
      <View style={styles.myPageContainerUserRecords}>
        <Text style={styles.myPageContainerUserRecordsHeader}>
          Личные рекорды
        </Text>
        <View style={styles.myPageContainerUserRecordsRow}>
          <View style={styles.myPageContainerUserRecord}>
            <FontAwesome5 name="walking" size={36} color="black" />
            <Text style={styles.myPageContainerUserRecordValue}>
              2475
            </Text>
            <Text style={styles.myPageContainerUserRecordMeasure}>
              шаг.
            </Text>
            <Text style={styles.myPageContainerUserRecordLabel}>
              Максимум шагов
            </Text>
          </View>
          <View style={styles.myPageContainerUserRecord}>
          <MaterialCommunityIcons name="stairs-up" size={36} color="black" />
            <Text style={styles.myPageContainerUserRecordValue}>
              
            </Text>
            <Text style={styles.myPageContainerUserRecordMeasure}>
              
            </Text>
            <Text style={styles.myPageContainerUserRecordLabel}>
              Больше всего этажей
            </Text>
          </View>
          <View style={styles.myPageContainerUserRecord}>
            <MaterialIcons name="timer" size={36} color="black" />
            <Text style={styles.myPageContainerUserRecordValue}>
              312
            </Text>
            <Text style={styles.myPageContainerUserRecordMeasure}>
              мин.
            </Text>
            <Text style={styles.myPageContainerUserRecordLabel}>
              Длительность
            </Text>
          </View>
        </View>
        <View style={styles.myPageContainerUserRecordsRow}>
          <View style={styles.myPageContainerUserRecord}>
            <Octicons name="flame" size={36} color="black" />
            <Text style={styles.myPageContainerUserRecordValue}>
              3254
            </Text>
            <Text style={styles.myPageContainerUserRecordMeasure}>
              ккал
            </Text>
            <Text style={styles.myPageContainerUserRecordLabel}>
              Потеряно калорий
            </Text>
          </View>
          <View style={styles.myPageContainerUserRecord}>
          <MaterialCommunityIcons name="map-marker-distance" size={36} color="black" />
            <Text style={styles.myPageContainerUserRecordValue}>
              
            </Text>
            <Text style={styles.myPageContainerUserRecordMeasure}>
              
            </Text>
            <Text style={styles.myPageContainerUserRecordLabel}>
              Расстояние
            </Text>
          </View>
          <View style={styles.myPageContainerUserRecord}>
            <Foundation name="mountains" size={36} color="black" />
            <Text style={styles.myPageContainerUserRecordValue}>
              
            </Text>
            <Text style={styles.myPageContainerUserRecordMeasure}>
              
            </Text>
            <Text style={styles.myPageContainerUserRecordLabel}>
              Прирост высоты
            </Text>
          </View>
        </View>
        <Text style={styles.myPageContainerUserRecordsLabel}>
          Всего шагов 3993 (после присоединения 5 февраля)
        </Text>
      </View>
      <View style={styles.myPageContainerUserAwards}>
        <View style={styles.myPageContainerUserAwardsHeader}>
          <Text style={styles.myPageContainerUserAwardsHeaderLabel}>
            Значки
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
        <ScrollView style={styles.myPageContainerUserAwardsShortcuts} horizontal={true}>
          <View style={styles.myPageContainerUserAwardsShortcut}>
            <FontAwesome5 name="trophy" size={96} color="rgb(255, 255, 50)" />
            <Text>
              Упражнение
            </Text>
            <Text>
              11 февр.
            </Text>
          </View>
          <View style={styles.myPageContainerUserAwardsShortcut}>
            <FontAwesome5 name="trophy" size={96} color="rgb(255, 255, 50)" />
            <Text>
              Упражнение
            </Text>
            <Text>
              11 февр.
            </Text>
          </View>
          <View style={styles.myPageContainerUserAwardsShortcut}>
            <FontAwesome5 name="trophy" size={96} color="rgb(255, 255, 50)" />
            <Text>
              Упражнение
            </Text>
            <Text>
              11 февр.
            </Text>
          </View>
          <View style={styles.myPageContainerUserAwardsShortcut}>
            <FontAwesome5 name="trophy" size={96} color="rgb(255, 255, 50)" />
            <Text>
              Упражнение
            </Text>
            <Text>
              11 февр.
            </Text>
          </View>
          <View style={styles.myPageContainerUserAwardsShortcut}>
            <FontAwesome5 name="trophy" size={96} color="rgb(255, 255, 50)" />
            <Text>
              Упражнение
            </Text>
            <Text>
              11 февр.
            </Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  )
}

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainTabsActivity'>
        <Stack.Screen name="MainTabsActivity" component={MainTabsActivity}
          options={{ title: 'Softtrack Здоровье' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  myPageContainer: {
    backgroundColor: 'rgb(225, 225, 225)'
  },
  myPageContainerUserHeader: {
    marginVertical: 25,
    marginHorizontal: 'auto',
    width: '95%',
    borderRadius: 8,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  myPageContainerUserHeaderPhotoAndEditBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 75
  },
  myPageContainerUserHeaderPhoto: {
    width: 100,
    height: 100,
    marginTop: -100
  },
  myPageContainerUserHeaderEditBtnWrap: {
      
  },
  myPageContainerUserHeaderEditBtn: {
    
  },
  myPageContainerUserHeaderName: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 24
  },
  myPageContainerUserReportPerWeek: {
    borderRadius: 8,
    marginVertical: 25,
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    marginHorizontal: 'auto',
    padding: 25
  },
  myPageContainerUserReportPerWeekHeader: {
    fontWeight: 500,
    fontSize: 24
  },
  myPageContainerUserReportPerWeekPeriodLabel: {
    color: 'rgb(150, 150, 150)'
  },
  myPageContainerUserReportPerWeekRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  myPageContainerUserReportPerWeekRowValue: {
    fontWeight: 700,
    fontSize: 28
  },
  myPageContainerUserReportPerWeekRowMeasure: {
    fontWeight: 500,
    fontSize: 18
  },
  myPageContainerUserRecords: {
    padding: 25,
    marginVertical: 25,
    borderRadius: 8,
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    marginHorizontal: 'auto'
  },
  myPageContainerUserRecordsHeader: {
    fontSize: 24,
    fontWeight: 700
  },
  myPageContainerUserRecordsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 25
  },
  myPageContainerUserRecord: {
    width: '33%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  myPageContainerUserRecordValue: {
    fontSize: 24,
    fontWeight: 700
  },
  myPageContainerUserRecordMeasure: {
    fontWeight: 700
  },
  myPageContainerUserRecordLabel: {
    color: 'rgb(150, 150, 150)'
  },
  myPageContainerUserRecordsLabel: {
    color: 'rgb(150, 150, 150)'
  },
  myPageContainerUserAwards: {
    padding: 25,
    marginVertical: 25,
    borderRadius: 8,
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    marginHorizontal: 'auto'
  },
  myPageContainerUserAwardsHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  myPageContainerUserAwardsHeaderLabel: {
    fontSize: 24,
    fontWeight: 700
  },
  myPageContainerUserAwardsShortcuts: {
    marginVertical: 25
  },
  myPageContainerUserAwardsShortcut: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 25
  },
  fitnessContainer: {
    
  },
  fitnessContainerInnovations: {
    width: '95%',
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto',
    padding: 15,
    marginVertical: 15
  },
  fitnessContainerInnovation: {
    width: 250
  },
  fitnessContainerInnovationsHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15
  },
  fitnessContainerInnovationsHeaderLabel: {
    fontWeight: 700,
    fontSize: 20
  },
  fitnessContainerInnovationsList: {

  },
  fitnessContainerInnovationImg: {
    width: 100,
    height: 100,
    marginVertical: 5
  },
  fitnessContainerInnovationName: {
    fontWeight: 700
  },
  fitnessContainerInnovationDuration: {
    color: 'rgb(150, 150, 150)'
  }
})