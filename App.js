import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Octicons, Foundation, Ionicons, AntDesign } from '@expo/vector-icons'

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
  
  const activityLogo = require('./assets/activity_logo.png')
  
  return (
    <ScrollView style={styles.mainPageContainer}>
      <View style={styles.mainPageContainerActiveBlock}>
        <View style={styles.mainPageContainerBlockHeader}>
          <AntDesign name="minuscircle" size={24} color="red" />
        </View>
        <View style={styles.mainPageContainerActiveBlockBody}>
          <View style={styles.mainPageContainerActiveBlockBodyAside}>
            <Text style={styles.mainPageContainerActiveBlockBodyAsideHeader}>
              Активность
            </Text>
            <View style={styles.mainPageContainerActiveBlockBodyAsideBody}>
              <View style={styles.mainPageContainerActiveBlockBodyAsideBodyItem}>
                <FontAwesome5 name="walking" size={36} color="green" />
                <Text>
                  0
                </Text>
              </View>
              <View style={styles.mainPageContainerActiveBlockBodyAsideBodyItem}>
                <Ionicons name="time" size={36} color="blue" />
                <Text>
                  0
                </Text>
              </View>
              <View style={styles.mainPageContainerActiveBlockBodyAsideBodyItem}>
                <Octicons name="flame" size={36} color="red" />
                <Text>
                  0
                </Text>
              </View>
            </View>
          </View>
          <Image source={activityLogo} style={styles.mainPageContainerActiveBlockBodyImg} />
        </View>
      </View>
    </ScrollView>
  )
}

export function TogetherActivity() {
  
  const userLogoImg = require('./assets/user_logo.png')

  return (
    <View style={styles.togetherContainer}>
      <View style={styles.togetherContainerHeader}>
        <Image style={styles.togetherContainerHeaderImg} source={userLogoImg} />
        <View style={styles.togetherContainerHeaderColumn}>
          <Text style={styles.togetherContainerHeaderColumnLabel}>
            glebdyakov
          </Text>
          <Text style={styles.togetherContainerHeaderColumnLevel}>
            Уровень 1
          </Text>
        </View>
        <View style={styles.togetherContainerHeaderTasksWrap}>
          <Button style={styles.togetherContainerHeaderTasks} color={'rgb(0, 0, 0)'} title="Задачи" />
        </View>
      </View>
      <View style={styles.togetherContainerFriends}>
        <View style={styles.togetherContainerFriendsAside}>
          <Text style={styles.togetherContainerFriendsAsideLabel}>
            Друзья
          </Text>
          <Text style={styles.togetherContainerFriendsAsideCount}>
            0
          </Text>
        </View>
        <View style={styles.togetherContainerFriendsAddBtnWrap}>
          <Button title={'Добавить'} style={styles.togetherContainerFriendsAddBtn} />
        </View>
      </View>
      <View style={styles.togetherContainerStrongerTogether}>
        <Text style={styles.togetherContainerStrongerTogetherHeader}>
          #Stronger Together
        </Text>
        <Text style={styles.togetherContainerStrongerTogetherLabel}>
          Присоединяйтесь к соревнованию чтобы подде...
        </Text>
        <View style={styles.togetherContainerStrongerTogetherBody}>
          <View style={styles.togetherContainerStrongerTogetherBodyAside}>
            <Text style={styles.togetherContainerStrongerTogetherBodyAsideParticipantsLabel}>
              Участники
            </Text>
            <Text style={styles.togetherContainerStrongerTogetherBodyAsideParticipantsCount}>
              723882
            </Text>
            <View style={styles.togetherContainerStrongerTogetherBodyAsideParticipantsJoinBtnWrap}>
              <Button title={'Присоединиться'} style={styles.togetherContainerStrongerTogetherBodyAsideParticipantsJoinBtn} />
            </View>
          </View>
          <Image source={userLogoImg} style={styles.togetherContainerStrongerTogetherBodyImg} />
        </View>
      </View>
      <View style={styles.togetherContainerStrongerTogether}>
        <Text style={styles.togetherContainerStrongerTogetherHeader}>
          Спа, февраль
        </Text>
        <Text style={styles.togetherContainerStrongerTogetherLabel}>
          {'Присоединяйтесь к соревнованию чтобы\nподдерживать форму вместе с другими.'}
        </Text>
        <View style={styles.togetherContainerStrongerTogetherBody}>
          <View style={styles.togetherContainerStrongerTogetherBodyAside}>
            <Text style={styles.togetherContainerStrongerTogetherBodyAsideParticipantsLabel}>
              Участники
            </Text>
            <Text style={styles.togetherContainerStrongerTogetherBodyAsideParticipantsCount}>
              723882
            </Text>
            <View style={styles.togetherContainerStrongerTogetherBodyAsideParticipantsJoinBtnWrap}>
              <Button title={'Присоединиться'} style={styles.togetherContainerStrongerTogetherBodyAsideParticipantsJoinBtn} />
            </View>
          </View>
          <Image source={userLogoImg} style={styles.togetherContainerStrongerTogetherBodyImg} />
        </View>
      </View>
    </View>
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
  },
  togetherContainer: {
    backgroundColor: 'rgb(225, 225, 225)'
  },
  togetherContainerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 'auto',
    width: '95%',
    marginVertical: 15
  },
  togetherContainerHeaderImg: {
    width: 50,
    height: 50,
  },
  togetherContainerHeaderColumn: {

  },
  togetherContainerHeaderColumnLabel: {
    fontWeight: 700
  },
  togetherContainerHeaderColumnLevel: {
    fontSize: 24
  },
  togetherContainerHeaderTasksWrap: {

  },
  togetherContainerHeaderTasks: {
    color: 'rgb(0, 0, 0)'
  },
  togetherContainerFriends: {
    backgroundColor: 'rgb(255, 255, 255)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    width: '95%',
    marginHorizontal: 'auto',
    marginVertical: 15
  },
  togetherContainerFriendsAside: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  togetherContainerFriendsAsideLabel: {
    fontWeight: 700
  },
  togetherContainerFriendsAsideCount: {
    color: 'rgb(0, 100, 0)',
    fontWeight: 700,
    marginHorizontal: 5
  },
  togetherContainerFriendsAddBtnWrap: {
    
  },
  togetherContainerFriendsAddBtn: {

  },
  togetherContainerStrongerTogether: {
    padding: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    marginHorizontal: 'auto',
    marginVertical: 15
  },
  togetherContainerStrongerTogetherHeader: {
    fontWeight: 700
  },
  togetherContainerStrongerTogetherLabel: {
    color: 'rgb(150, 150, 150)'
  },
  togetherContainerStrongerTogetherBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  togetherContainerStrongerTogetherBodyAside: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  togetherContainerStrongerTogetherBodyAsideParticipantsLabel: {
    fontWeight: 700
  },
  togetherContainerStrongerTogetherBodyAsideParticipantsCount: {
    fontWeight: 700,
    fontSize: 20
  },
  togetherContainerStrongerTogetherBodyAsideParticipantsJoinBtnWrap: {

  },
  togetherContainerStrongerTogetherBodyAsideParticipantsJoinBtn: {
    
  },
  togetherContainerStrongerTogetherBodyImg: {
    width: 100,
    height: 100
  },
  mainPageContainer: {

  },
  mainPageContainerActiveBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerBlockHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  mainPageContainerActiveBlockBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainPageContainerActiveBlockBodyAside: {
    display: 'flex',
    flexDirection: 'column'
  },
  mainPageContainerActiveBlockBodyAsideHeader: {
    fontWeight: 700,
    fontSize: 20
  },
  mainPageContainerActiveBlockBodyAsideBody: {
    display: 'flex',
    flexDirection: 'row'
  },
  mainPageContainerActiveBlockBodyAsideBodyItem: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 25,
    alignItems: 'center'
  },
  mainPageContainerActiveBlockBodyImg: {
    width: 100,
    height: 100
  },
  mainPageContainerWalkBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerExerciseBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerFoodBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerSleepBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerBodyBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerWaterBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
})