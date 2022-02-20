import { StatusBar } from 'expo-status-bar'
import { React, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Button, ScrollView, CheckBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Octicons, Foundation, Ionicons, AntDesign, Entypo, Fontisto, Feather, FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import {
  Paragraph,
  Dialog,
  Portal,
  Provider,
  RadioButton
} from 'react-native-paper'

const Tab = createBottomTabNavigator();

function MainTabsActivity() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarShowIcon: true
    }}>
      <Tab.Screen
        name="Главная"
        component={MainPageActivity}
        options={{
          tabBarIcon: ({ focused, horizontal, tintColor }) => <MaterialCommunityIcons name="home-heart" size={24} color="black" />,
          tabBarLabelStyle: {
            marginTop: 25,
            marginLeft: -25
          },
          tabBarIconStyle: {
            marginTop: -25,
            marginLeft: 75
          }
        }}
      />
      <Tab.Screen
        name="Together"
        component={TogetherActivity}
        options={{
          tabBarIcon: ({ focused, horizontal, tintColor }) => <FontAwesome5 name="flag" size={24} color="black" />,
          tabBarLabelStyle: {
            marginTop: 25,
            marginLeft: -25
          },
          tabBarIconStyle: {
            marginTop: -25,
            marginLeft: 75
          }
        }}
      />
      <Tab.Screen
        name="Фитнес"
        component={FitnesActivity}
        options={{
          tabBarIcon: ({ focused, horizontal, tintColor }) => <MaterialIcons name="ondemand-video" size={24} color="black" />,
          tabBarLabelStyle: {
            marginTop: 25,
            marginLeft: -25
          },
          tabBarIconStyle: {
            marginTop: -25,
            marginLeft: 75
          }
        }}
      />
      <Tab.Screen
        name="Моя стр."
        component={MyPageActivity}
        options={{
          tabBarIcon: ({ focused, horizontal, tintColor }) => <FontAwesome name="user-o" size={24} color="black" />,
          tabBarLabelStyle: {
            marginTop: 25,
            marginLeft: -25
          },
          tabBarIconStyle: {
            marginTop: -25,
            marginLeft: 75
          }
        }}
      />
    </Tab.Navigator>
  )
}

export function MainPageActivity({ navigation }) {
  
  const activityLogo = require('./assets/activity_logo.png')
  
  const [countGlasses, setCountGlasses] = useState(0)
  
  const [isRemoveGlassBtnDisabled, setIsRemoveGlassBtnDisabled] = useState(false)

  const [indicators, setIndicators] = useState([])
  
  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM indicators;"
    transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
      let tempReceivedIndicators = []
      Array.from(receivedIndicators.rows).forEach((indicatorsItemRow, indicatorsItemRowIdx) => {
        const indicatorsItem = Object.values(receivedIndicators.rows.item(indicatorsItemRowIdx))
        tempReceivedIndicators = [
          ...tempReceivedIndicators,
          {
            id: indicatorsItem[0],
            water: indicatorsItem[2]
          }
        ]
      })
      setIndicators(tempReceivedIndicators)
    })
  })

  useEffect(() => {
    const countIndicators = indicators.length
    const isIndicatorsExists = countIndicators >= 1
    if (isIndicatorsExists) {
      const receiverdIndicators = indicators[0]
      const localCountGlasses = receiverdIndicators.water
      setCountGlasses(localCountGlasses)
    }
  }, [indicators])

  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const addGlass = () => {
    const updatedCountGlasses = countGlasses + 1
    setCountGlasses(updatedCountGlasses)
    setIsRemoveGlassBtnDisabled(false)

    db.transaction(transaction => {
      let sqlStatement = `UPDATE indicators SET water=${updatedCountGlasses} WHERE _id=0;`
      transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
      })
    })

  }

  const removeGlass = () => {
    const updatedCountGlasses = countGlasses - 1
    setCountGlasses(updatedCountGlasses)
    const isCountGlassesEmpty = countGlasses <= 1
    if (isCountGlassesEmpty) {
      setIsRemoveGlassBtnDisabled(true)
    } else {
      db.transaction(transaction => {
        let sqlStatement = `UPDATE indicators SET water=${updatedCountGlasses} WHERE _id=1;`
        transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
        })
      })
    }
  }

  return (
    <ScrollView style={styles.mainPageContainer}>
      <TouchableOpacity style={styles.mainPageContainerActiveBlock} onPress={() => goToActivity(navigation, 'ActiveActivity')}>
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
      </TouchableOpacity>
      <TouchableOpacity style={styles.mainPageContainerWalkBlock} onPress={() => goToActivity(navigation, 'WalkActivity')}>
        <View style={styles.mainPageContainerBlockHeader}>
          <AntDesign name="minuscircle" size={24} color="red" />
        </View>
        <View style={styles.mainPageContainerWalkBlockBody}>
          <Text style={styles.mainPageContainerWalkBlockBodyLabel}>
            Шаги
          </Text>
          <View style={styles.mainPageContainerWalkBlockBodyRow}>
            <View style={styles.mainPageContainerWalkBlockBodyRowAside}>
              <Text style={styles.mainPageContainerWalkBlockBodyRowCountLabel}>
                0
              </Text>
              <Text style={styles.mainPageContainerWalkBlockBodyRowMaxCountLabel}>
                /6000
              </Text>
            </View>
            <View>
              <Text>
                0%
              </Text>
              <Text>
                ------------------------------------
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={styles.mainPageContainerExerciseBlock}
        onPress={() => goToActivity(navigation, 'ExerciseActivity')}
      >
        <View style={styles.mainPageContainerBlockHeader}>
          <AntDesign name="minuscircle" size={24} color="red" />
        </View>
        <View style={styles.mainPageContainerExerciseBlockBody}>
          <View style={styles.mainPageContainerExerciseBlockBodyHeader}>
            <Text style={styles.mainPageContainerExerciseBlockBodyHeaderLabel}>
              Упражнение
            </Text>
            <Text style={styles.mainPageContainerExerciseBlockBodyHeaderLog}>
              Посмотреть журнал
            </Text>
          </View>
          <View style={styles.mainPageContainerExerciseBlockBodyExercises}>
            <TouchableOpacity
              style={styles.mainPageContainerExerciseBlockBodyExercisesItem}
              onPress={() => goToActivity(navigation, 'RecordExerciseActivity', {
                exerciseType: 'Ходьба'
              })}
            >
              <FontAwesome5 name="walking" size={36} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mainPageContainerExerciseBlockBodyExercisesItem}
              onPress={() => goToActivity(navigation, 'RecordExerciseActivity', {
                exerciseType: 'Бег'
              })}
            >
              <FontAwesome5 name="running" size={36} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mainPageContainerExerciseBlockBodyExercisesItem}
              onPress={() => goToActivity(navigation, 'RecordExerciseActivity', {
                exerciseType: 'Велоспорт'
              })}
            >
              <Ionicons name="bicycle-sharp" size={36} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mainPageContainerExerciseBlockBodyExercisesItem}
              onPress={() => goToActivity(navigation, 'ExercisesListActivity')}
            >
              <Feather name="list" size={36} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.mainPageContainerFoodBlock} onPress={() => goToActivity(navigation, 'FoodActivity')}>
        <View style={styles.mainPageContainerBlockHeader}>
          <AntDesign name="minuscircle" size={24} color="red" />
        </View>
        <View style={styles.mainPageContainerFoodBlockBody}>
          <Text style={styles.mainPageContainerFoodBlockLabel}>
            Еда
          </Text>
          <View style={styles.mainPageContainerFoodBlockRow}>
            <View style={styles.mainPageContainerFoodBlockRowAside}>
              <Text style={styles.mainPageContainerFoodBlockRowAsideLabel}>
                0
              </Text>
              <Text style={styles.mainPageContainerFoodBlockRowAsideMaxCount}>
                /1779 ккал
              </Text>
            </View>
            <View style={styles.mainPageContainerFoodBlockRecordBtnWrap}>
              <Button title="Запись" style={styles.mainPageContainerFoodBlockRecordBtn} />
            </View>
          </View>        
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mainPageContainerSleepBlock} onPress={() => goToActivity(navigation, 'SleepActivity')}>
        <View style={styles.mainPageContainerBlockHeader}>
          <AntDesign name="minuscircle" size={24} color="red" />
        </View>
        <View style={styles.mainPageContainerSleepBlockBody}>
          <Text style={styles.mainPageContainerSleepBlockLabel}>
            Сон
          </Text>
          <View style={styles.mainPageContainerSleepBlockRow}>
            <Text style={styles.mainPageContainerSleepBlockRowLabel}>
              Как вам спалось?
            </Text>
            <View style={styles.mainPageContainerSleepBlockRecordBtnWrap}>
              <Button title="Запись" style={styles.mainPageContainerSleepBlockRecordBtn} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mainPageContainerBodyBlock} onPress={() => goToActivity(navigation, 'BodyActivity')}>
        <View style={styles.mainPageContainerBlockHeader}>
          <AntDesign name="minuscircle" size={24} color="red" />
        </View>
        <View style={styles.mainPageContainerBodyBlockBody}>
          <Text style={styles.mainPageContainerBodyBlockBodyHeader}>
            Состав тела
          </Text>
          <View style={styles.mainPageContainerBodyBlockBodyRow}>
            <View style={styles.mainPageContainerBodyBlockBodyRowItem}>
              <Entypo name="home" size={24} color="green" />
              <View style={styles.mainPageContainerBodyBlockBodyRowItemFooter}>
                <Text style={styles.mainPageContainerBodyBlockBodyRowItemFooterLabel}>
                  0
                </Text>
                <Text style={styles.mainPageContainerBodyBlockBodyRowItemFooterMeasure}>
                  кг
                </Text>
              </View>              
            </View>
            <View style={styles.mainPageContainerBodyBlockBodyRowItem}>
              <Fontisto name="spinner-fidget" size={24} color="brown" />
              <View style={styles.mainPageContainerBodyBlockBodyRowItemFooter}>
                <Text style={styles.mainPageContainerBodyBlockBodyRowItemFooterLabel}>
                  0
                </Text>
                <Text style={styles.mainPageContainerBodyBlockBodyRowItemFooterMeasure}>
                  %
                </Text>
              </View>              
            </View>
            <View style={styles.mainPageContainerBodyBlockBodyRowItem}>
              <MaterialCommunityIcons name="human" size={24} color="blue" />
              <View style={styles.mainPageContainerBodyBlockBodyRowItemFooter}>
                <Text style={styles.mainPageContainerBodyBlockBodyRowItemFooterLabel}>
                  0
                </Text>
                <Text style={styles.mainPageContainerBodyBlockBodyRowItemFooterMeasure}>
                  кг
                </Text>
              </View>              
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mainPageContainerWaterBlock} onPress={() => goToActivity(navigation, 'WaterActivity')}>
        <View style={styles.mainPageContainerBlockHeader}>
          <AntDesign name="minuscircle" size={24} color="red" />
        </View>
        <View style={styles.mainPageContainerWaterBody}>
          <View style={styles.mainPageContainerWaterBodyAside}>
            <Text style={styles.mainPageContainerWaterBodyAsideLabel}>
              Вода
            </Text>
            <View style={styles.mainPageContainerWaterBodyAsideRow}>
              <Text style={styles.mainPageContainerWaterBodyAsideRowCount}>
                {
                  countGlasses
                }
              </Text>
              <Text style={styles.mainPageContainerWaterBodyAsideRowMeasure}>
                стак.
              </Text>
            </View>
          </View>
          <View style={styles.mainPageContainerWaterBodyRow}>
            <View style={styles.mainPageContainerWaterBodyRowRemoveBtnWrap}>
              <Button title="-" style={styles.mainPageContainerWaterBodyRowRemoveBtn} disabled={isRemoveGlassBtnDisabled} onPress={() => removeGlass()} />
            </View>
            <View style={styles.mainPageContainerWaterBodyRowAddBtnWrap}>
              <Button title="+" style={styles.mainPageContainerWaterBodyRowAddBtn} onPress={() => addGlass()} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
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

export function ActiveActivity() {
  
  const activityLogo = require('./assets/activity_logo.png')

  return (
    <ScrollView style={styles.activeActivityScroll}>
      <View style={styles.activeActivityBody}>
        <Text style={styles.activeActivityBodyHeader}>
          Сегодня
        </Text>
        <Image source={activityLogo} style={styles.activeActivityBodyImg} />
        <View style={styles.activeActivityBodyItems}>
          <View style={styles.activeActivityBodyItem}>
            <Text style={styles.activeActivityBodyItemHeader}>
              Шаги
            </Text>
            <View style={styles.activeActivityBodyItemRow}>
              <FontAwesome5 name="walking" size={18} color="green" style={styles.activeActivityBodyItemRowIcon} />
              <Text style={styles.activeActivityBodyItemRowLabel}>
                34
              </Text>
            </View>
            <Text style={styles.activeActivityBodyItemFooter}>
              /6000
            </Text>  
          </View>
          <View style={styles.activeActivityBodyItem}>
            <Text style={styles.activeActivityBodyItemHeader}>
              Время активности
            </Text>
            <View style={styles.activeActivityBodyItemRow}>
              <Ionicons name="time" size={18} color="blue" />
              <Text style={styles.activeActivityBodyItemRowLabel}>
                0
              </Text>
            </View>
            <Text style={styles.activeActivityBodyItemFooter}>
              /90 мин
            </Text>  
          </View>
          <View style={styles.activeActivityBodyItem}>
            <Text style={styles.activeActivityBodyItemHeader}>
              Активные калории
            </Text>
            <View style={styles.activeActivityBodyItemRow}>
              <Octicons name="flame" size={18} color="red" />
              <Text style={styles.activeActivityBodyItemRowLabel}>
                1
              </Text>
            </View>
            <Text style={styles.activeActivityBodyItemFooter}>
              /500 ккал
            </Text>  
          </View>
        </View>
        <View style={styles.activeActivityBodyCallories}>
          <Text style={styles.activeActivityBodyCalloriesAll}>
            Всего сожжено калорий
          </Text>
          <Text style={styles.activeActivityBodyCalloriesSeparator}>
            .....................................................................................................................................................................................................................................................................................................................................................
          </Text>
          <Text style={styles.activeActivityBodyCalloriesLabel}>
            1383 ккал
          </Text>
        </View>
        <View style={styles.activeActivityBodyDistanse}>
          <Text style={styles.activeActivityBodyDistanseAll}>
            Расстояние пройденное в ходе активностей
          </Text>
          <Text style={styles.activeActivityBodyDistanseSeparator}>
          ................................................................................................................................................................................................................................................................................................
          </Text>
          <Text style={styles.activeActivityBodyDistanseLabel}>
            0,02 км
          </Text>
        </View>
      </View>
    </ScrollView>
  )

}

export function WalkActivity() {
  
  return (
    <ScrollView style={styles.walkActivityScroll}>
      <View style={styles.walkActivityBody}>
        <Text style={styles.walkActivityBodyHeader}>
          Сегодня
        </Text>
        <View style={styles.walkActivityBodyData}>
          <Text style={styles.walkActivityBodyDataLabel}>
            60
          </Text>
          <Text style={styles.walkActivityBodyDataMeasure}>
            шагов
          </Text>
        </View>
        <View style={styles.walkActivityBodyDistanseAndCallories}>
          <Text style={styles.walkActivityBodyDistanseLabel}>
            0,04
          </Text>
          <Text style={styles.walkActivityBodyDistanseMeasure}>
            км
          </Text>
          <Text style={styles.walkActivityBodyCalloriesLabel}>
            2
          </Text>
          <Text style={styles.walkActivityBodyCalloriesMeasure}>
            ккал
          </Text>
        </View>
        <View>

        </View>
      </View>
    </ScrollView>
  )

}

export function ExerciseActivity() {
  
  const [exerciseRecords, setExerciseRecords] = useState([
    {

    },
    {

    },
    {

    }
  ])

  return (
    <ScrollView style={styles.exerciseActivityScroll}>
      <View style={styles.exerciseActivityBody}>
        <Text style={styles.exerciseActivityBodyPeriod}>
          7-13 февр.
        </Text>
        <Text style={styles.exerciseActivityBodyTime}>
          00:00:00
        </Text>
        <View style={styles.exerciseActivityBodyCalloriesAndSessions}>
          <Text style={styles.exerciseActivityBodyCalloriesLabel}>
            3563
          </Text>
          <Text style={styles.exerciseActivityBodyCalloriesMeasure}>
            ккал
          </Text>
          <Text style={styles.exerciseActivityBodySessionsLabel}>
            9
          </Text>
          <Text style={styles.exerciseActivityBodySessionsMeasure}>
            сеансы
          </Text>
        </View>
        {
          exerciseRecords.map((exerciseRecord, exerciseRecordIndex) => {
            return (
              <View style={styles.exerciseActivityBodyRecord}>
                <View style={styles.exerciseActivityBodyRecordHeader}>
                  <Text style={styles.exerciseActivityBodyRecordHeaderDate}>
                    вс, 13 февр.
                  </Text>
                  <Text style={styles.exerciseActivityBodyRecordHeaderTime}>
                    00:00:00
                  </Text>
                </View>
                <View style={styles.exerciseActivityBodyRecordContent}>
                  <FontAwesome5 name="walking" size={20} color="green" />
                  <Text style={styles.exerciseActivityBodyRecordContentName}>
                    Велоспорт
                  </Text>
                </View>
                <Text>
                  00:00:00 | 301 ккал
                </Text>
                <Text>
                  10:00
                </Text>
              </View>
            )
          })
        }
      </View>
    </ScrollView>
  )

}

export function FoodActivity({ navigation }) {
  
  const foodLogoImg = require('./assets/food_logo.png')

  const [isDialogVisible, setIsDialogVisible] = useState(false)

  const [foodType, setFoodType] = useState({
    checked: ''
  })

  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  return (
    <ScrollView style={styles.foodActivityScroll}>
      <View style={styles.foodActivityData}>
        <Text style={styles.foodActivityDataHeader}>
          Сегодня
        </Text>
        <View style={styles.foodActivityDataCallories}>
          <Text style={styles.foodActivityDataCalloriesContent}>
            0
          </Text>
          <Text style={styles.foodActivityDataCalloriesMeasure}>
            Ккал
          </Text>
        </View>
        <Image source={foodLogoImg} style={styles.foodActivityDataImg} />
        <Text style={styles.foodActivityDataDetectLabel}>
          {
            'Отслеживание питания поможет придерживаться\nздоровой, сбалансированной диеты'
          }
        </Text>
      </View>
      <View style={styles.foodActivityRecordBtnWrap}>
        <Button title="Запись" style={styles.foodActivityRecordBtnWrap} onPress={() => setIsDialogVisible(true)} />
      </View>
      <Dialog
        visible={isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}>
        <Dialog.Title>Прием пищи</Dialog.Title>
        <Dialog.Content>
          <View style={styles.foodActivityRecordFoodType}>
            <RadioButton
              value="Завтрак"
              label="Завтрак"
              status={foodType.checked === 'Завтрак' ? 'checked' : 'unchecked'}
              onPress={() => { setFoodType({ checked: 'Завтрак' }) }}
            />
            <Text style={styles.foodActivityRecordFoodTypeLabel}>Завтрак</Text>  
          </View>
          <View style={styles.foodActivityRecordFoodType}>
            <RadioButton
              value="Обед"
              label="Обед"
              status={foodType.checked === 'Обед' ? 'checked' : 'unchecked'}
              onPress={() => { setFoodType({ checked: 'Обед' }) }}
            />
            <Text style={styles.foodActivityRecordFoodTypeLabel}>Обед</Text>  
          </View>
          <View style={styles.foodActivityRecordFoodType}>
            <RadioButton
              value="Ужин"
              label="Ужин"
              status={foodType.checked === 'Ужин' ? 'checked' : 'unchecked'}
              onPress={() => { setFoodType({ checked: 'Ужин' }) }}
            />
            <Text style={styles.foodActivityRecordFoodTypeLabel}>Ужин</Text>  
          </View>
          <View style={styles.foodActivityRecordFoodType}>
            <RadioButton
              value="Утренний перекус"
              label="Утренний перекус"
              status={foodType.checked === 'Утренний перекус' ? 'checked' : 'unchecked'}
              onPress={() => { setFoodType({ checked: 'Утренний перекус' }) }}
            />
            <Text style={styles.foodActivityRecordFoodTypeLabel}>Утренний перекус</Text>  
          </View>
          <View style={styles.foodActivityRecordFoodType}>
            <RadioButton
              value="Дневной перекус"
              label="Дневной перекус"
              status={foodType.checked === 'Дневной перекус' ? 'checked' : 'unchecked'}
              onPress={() => { setFoodType({ checked: 'Дневной перекус' }) }}
            />
            <Text style={styles.foodActivityRecordFoodTypeLabel}>Дневной перекус</Text>  
          </View>
          <View style={styles.foodActivityRecordFoodType}>
            <RadioButton
              value="Вечерний перекус"
              label="Вечерний перекус"
              status={foodType.checked === 'Вечерний перекус' ? 'checked' : 'unchecked'}
              onPress={() => { setFoodType({ checked: 'Вечерний перекус' }) }}
            />
            <Text style={styles.foodActivityRecordFoodTypeLabel}>Вечерний перекус</Text>  
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button title="Готово" onPress={() => goToActivity(navigation, 'RecordFoodActivity', {
            foodType: foodType.checked
          })} />
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
  )

}

export function SleepActivity({ navigation }) {
  
  const goToActivity = (navigation, activityName) => {
    navigation.navigate(activityName)
  }

  return (
    <ScrollView style={styles.sleepActivityScroll}>
      <View style={styles.sleepActivityData}>
        <Text style={styles.sleepActivityDataHeader}>
          Сегодня
        </Text>
        <View style={styles.sleepActivityDataTime}>
          <Text style={styles.sleepActivityDataTimeHoursLabel}>
            Часов:
          </Text>
          <Text style={styles.sleepActivityDataTimeHoursContent}>
            11
          </Text>
          <Text style={styles.sleepActivityDataTimeMinutesLabel}>
            , минут:
          </Text>
          <Text style={styles.sleepActivityDataTimeMinutesContent}>
            30
          </Text>
          <Text style={styles.sleepActivityDataTimeEnd}>
            .
          </Text>
        </View>
        <View style={styles.sleepActivityWidget}>

        </View>
        {
          false ?
          <>
            <Text style={styles.sleepActivityTimeStartAndEnd}>
              21:10(чт) - 08:40(пт)
            </Text>
            <Text style={styles.sleepActivityRecordLabel}>
              Записать время
            </Text>
          </>
          :
            <Text style={styles.sleepActivityRecordLabel}>
              {
                'Создавайте записи о сне, чтобы установить закономерность\nи высыпаться лучше'
              }
            </Text>
        }
      </View>
      <View style={styles.sleepActivityRecordBtnWrap}>
        <Button title="Записать вручную" style={styles.sleepActivityRecordBtn} onPress={() => goToActivity(navigation, 'RecordSleepActivity')} />
      </View>
    </ScrollView>
  )

}

export function BodyActivity({ navigation }) {
  
  const goToActivity = (navigation, activityName) => {
    navigation.navigate(activityName)
  }

  const [bodyRecords, setBodyRecords] = useState([])

  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM body_records;"
    transaction.executeSql(sqlStatement, [], (tx, receivedBodyRecords) => {
      let tempReceivedBodyRecords = []
      Array.from(receivedBodyRecords.rows).forEach((bodyRecordRow, bodyRecordRowIdx) => {
        const bodyRecord = Object.values(receivedBodyRecords.rows.item(bodyRecordRowIdx))
        tempReceivedBodyRecords = [
          ...tempReceivedBodyRecords,
          {
            id: bodyRecord[0],
            marks: bodyRecord[1],
            musculature: bodyRecord[2],
            fat: bodyRecord[3],
            weight: bodyRecord[4]
          }
        ]
      })
      setBodyRecords(tempReceivedBodyRecords)
    })
  })

  return (
    <ScrollView style={styles.bodyActivityScroll}>
      <View style={styles.bodyActivityLastData}>
        <Text style={styles.bodyActivityLastDataHeader}>
          11 февр., 09:08
        </Text>
        <View style={styles.bodyActivityLastDataItems}>
          <View style={styles.bodyActivityLastDataItem}>
            <Text style={[
              styles.bodyActivityLastDataItemMeasure,
              styles.bodyActivityLastDataItemWeightMeasure
            ]}>
              Вес
            </Text>
            <View style={styles.bodyActivityLastDataRow}>
              <Text style={styles.bodyActivityLastDataRowContent}>
                74.2
              </Text>
              <Text style={styles.bodyActivityLastDataRowMeasure}>
                кг
              </Text>
            </View>
          </View>
          <View style={styles.bodyActivityLastDataItem}>
            <Text style={styles.bodyActivityLastDataItemMeasure}>
              Телесный жир
            </Text>
            <View style={styles.bodyActivityLastDataRow}>
              <Text style={styles.bodyActivityLastDataRowContent}>
                36.0
              </Text>
              <Text style={styles.bodyActivityLastDataRowMeasure}>
                %
              </Text>
            </View>
          </View>
          <View style={styles.bodyActivityLastDataItem}>
            <Text style={styles.bodyActivityLastDataItemMeasure}>
              {
                'Скелетн.\nмускулат.'
              }
            </Text>
            <View style={styles.bodyActivityLastDataRow}>
              <Text style={styles.bodyActivityLastDataRowContent}>
                47.5
              </Text>
              <Text style={styles.bodyActivityLastDataRowMeasure}>
                кг
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bodyActivityImt}>
          <Text style={styles.bodyActivityImtLabel}>
            Чтобы рассчитать ИМТ, укажите в профиле свой рост.
          </Text>
          <Text style={styles.bodyActivityImtEdit}>
            Редактировать профиль
          </Text>
        </View>
      </View>
      <View style={styles.bodyActivityRecords}>
        {
          bodyRecords.map((bodyRecord, bodyRecordIndex) => {
            return (
              <View style={styles.bodyActivityRecord}>
                <View style={styles.bodyActivityHeader}>
                  <View style={styles.bodyActivityHeaderItem}>
                    <Text style={styles.bodyActivityHeaderItemLabel}>
                      {
                        bodyRecord.weight
                      }
                    </Text>
                    <Text style={styles.bodyActivityHeaderItemMeasure}>
                      кг
                    </Text>
                  </View>
                  <View style={styles.bodyActivityHeaderItem}>
                    <Text style={styles.bodyActivityHeaderItemLabel}>
                      {
                        bodyRecord.fat
                      }
                    </Text>
                    <Text style={styles.bodyActivityHeaderItemMeasure}>
                      %
                    </Text>
                  </View>
                  <View style={styles.bodyActivityHeaderItem}>
                    <Text style={styles.bodyActivityHeaderItemLabel}>
                      {
                        bodyRecord.musculature
                      }
                    </Text>
                    <Text style={styles.bodyActivityHeaderItemMeasure}>
                      кг
                    </Text>
                  </View>
                </View>
                <Text style={styles.bodyActivityRecordTime}>
                  00:00
                </Text>
              </View>
            )
          })
        }
      </View>
      <View style={styles.bodyActivityAddRecordBtnWrap}>
        <Button title="Запись" style={styles.bodyActivityAddRecordBtn} onPress={() => goToActivity(navigation, 'RecordBodyActivity')} />
      </View>
    </ScrollView>
  )

}

export function WaterActivity() {
  
  const glassCalculatorImg = require('./assets/glass_calculator.png')
  
  const [countGlasses, setCountGlasses] = useState(0)

  const [isRemoveGlassBtnDisabled, setIsRemoveGlassBtnDisabled] = useState(false)

  const [indicators, setIndicators] = useState([])
  
  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM indicators;"
    transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
      let tempReceivedIndicators = []
      Array.from(receivedIndicators.rows).forEach((indicatorsItemRow, indicatorsItemRowIdx) => {
        const indicatorsItem = Object.values(receivedIndicators.rows.item(indicatorsItemRowIdx))
        tempReceivedIndicators = [
          ...tempReceivedIndicators,
          {
            id: indicatorsItem[0],
            water: indicatorsItem[2]
          }
        ]
      })
      setIndicators(tempReceivedIndicators)
    })
  })

  useEffect(() => {
    const countIndicators = indicators.length
    const isIndicatorsExists = countIndicators >= 1
    if (isIndicatorsExists) {
      const receiverdIndicators = indicators[0]
      const localCountGlasses = receiverdIndicators.water
      setCountGlasses(localCountGlasses)
    }
  }, [indicators])

  const addGlass = () => {
    const updatedCountGlasses = countGlasses + 1
    setCountGlasses(updatedCountGlasses)
    setIsRemoveGlassBtnDisabled(false)
  
    db.transaction(transaction => {
      let sqlStatement = `UPDATE indicators SET water=${updatedCountGlasses} WHERE _id=1;`
      transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
      })
    })

  }

  const removeGlass = () => {
    const updatedCountGlasses = countGlasses - 1
    setCountGlasses(updatedCountGlasses)
    const isCountGlassesEmpty = countGlasses <= 1
    if (isCountGlassesEmpty) {
      setIsRemoveGlassBtnDisabled(true)
    } else {
      db.transaction(transaction => {
        let sqlStatement = `UPDATE indicators SET water=${updatedCountGlasses} WHERE _id=1;`
        transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
        })
      })
    }
  }

  return (
    <ScrollView style={styles.waterActivityScroll}>
      <Text style={styles.waterActivityBodyLabel}>
        Сегодня
      </Text>
      <Image source={glassCalculatorImg} style={styles.waterActivityGlassCalculator} />
      <View style={styles.waterActivityRow}>
        <View style={styles.waterActivityRowRemoveBtnWrap}>
          <Button title="-" style={styles.waterActivityRowRemoveBtn} disabled={isRemoveGlassBtnDisabled} onPress={() => removeGlass()} />
        </View>
        <Text style={styles.waterActivityRowLabel}>
          {
            countGlasses
          }
        </Text>
        <View style={styles.waterActivityRowAddBtnWrap}>
          <Button title="+" style={styles.waterActivityRowAddBtn} onPress={() => addGlass()} />
        </View>
      </View>
      <Text style={styles.waterActivityMeasure}>
        стак.
      </Text>
      <Text style={styles.waterActivityMls}>
        (0 мл)
      </Text>
      <Text style={styles.waterActivityDetectLabel}>
        Отслеживайте объем потребляемой воды
      </Text>
    </ScrollView>
  )
}

const Stack = createStackNavigator()

var db = null

export default function App() {

  db = SQLite.openDatabase('healthdatabase.db')
  
  // let sqlStatement = `DROP TABLE \"indicators\";`
  // db.transaction(transaction => {
  //   transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
  //   })
  // })

  // let sqlStatement = `DELETE DATABASE \"healthdatabase.db\";`
  // db.transaction(transaction => {
  //   transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
  //   })
  // })
  db.transaction(transaction => {
    let sqlStatement = "CREATE TABLE IF NOT EXISTS indicators (_id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, water INTEGER, walk INTEGER, food INTEGER, is_exercise_enabled BOOLEAN, exercise_start_time TEXT, exercise_type TEXT, exercise_duration TEXT, photo TEXT, name TEXT, gender TEXT, growth REAL, weight REAL, birthday TEXT, level TEXT);"
    transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
      let sqlStatement = "CREATE TABLE IF NOT EXISTS exercises (_id INTEGER PRIMARY KEY AUTOINCREMENT, is_activated BOOLEAN, name TEXT, is_favorite BOOLEAN);"
      transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
        let sqlStatement = "CREATE TABLE IF NOT EXISTS controllers (_id INTEGER PRIMARY KEY AUTOINCREMENT, is_activated BOOLEAN, name TEXT);"
        transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
          let sqlStatement = "CREATE TABLE IF NOT EXISTS measures (_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value TEXT);"
          transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
            let sqlStatement = "CREATE TABLE IF NOT EXISTS body_records (_id INTEGER PRIMARY KEY AUTOINCREMENT, marks TEXT, musculature INTEGER, fat INTEGER, weight REAL, date TEXT);"
            transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
              let sqlStatement = "CREATE TABLE IF NOT EXISTS sleep_records (_id INTEGER PRIMARY KEY AUTOINCREMENT, hours TEXT, minutes TEXT, date TEXT);"
              transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
                let sqlStatement = "CREATE TABLE IF NOT EXISTS food_records (_id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT);"
                transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
                  let sqlStatement = "CREATE TABLE IF NOT EXISTS exercise_records (_id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, datetime TEXT, duration TEXT);"
                  transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
                    let sqlStatement = "CREATE TABLE IF NOT EXISTS food_items (_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, callories INTEGER, total_carbs INTEGER, total_fats INTEGER, protein INTEGER, saturated_fats INTEGER, trans_fats INTEGER, cholesterol INTEGER, sodium INTEGER, potassium INTEGER, cellulose INTEGER, sugar INTEGER, a INTEGER, c INTEGER, calcium INTEGER, iron INTEGER, portions REAL, type TEXT);"
                    transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
                      let sqlStatement = "CREATE TABLE IF NOT EXISTS awards (_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, type TEXT);"
                      transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
      

      // sqlStatement = `DELETE DATABASE \"healthdatabase.db\";`
      // db.transaction(transaction => {
      //   transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
      //   })
      // })

      sqlStatement = "SELECT * FROM indicators;"
      transaction.executeSql(sqlStatement, [], (tx, receivedAlarms) => {
        const indicators = Array.from(receivedAlarms.rows)
        const countIndicators = indicators.length
        const isPreInstall = countIndicators <= 0
        if (isPreInstall) {
          let sqlStatement = `INSERT INTO \"indicators\"(time, water, walk, food, is_exercise_enabled, exercise_start_time, exercise_type, exercise_duration, photo, name, gender, growth, weight, birthday, level) VALUES (\"\", 0, 0, 0, 0, \"\", \"\", \"\", \"\", \"\", \"\", 0.0, 0.0, \"\", \"\");`
          db.transaction(transaction => {
            transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
              let sqlStatement = `INSERT INTO \"exercises\"(is_activated, name, is_favorite) VALUES (true, \"Ходьба\", true);`
              db.transaction(transaction => {
                transaction.executeSql(sqlStatement, [], (tx, receivedExercises) => {
                  let sqlStatement = `INSERT INTO \"exercises\"(is_activated, name, is_favorite) VALUES (true, \"Бег\", true);`
                  db.transaction(transaction => {
                    transaction.executeSql(sqlStatement, [], (tx, receivedExercises) => {
                      let sqlStatement = `INSERT INTO \"exercises\"(is_activated, name, is_favorite) VALUES (true, \"Велоспорт\", true);`
                      db.transaction(transaction => {
                        transaction.executeSql(sqlStatement, [], (tx, receivedExercises) => {
                          let sqlStatement = `INSERT INTO \"exercises\"(is_activated, name, is_favorite) VALUES (false, \"Поход\", false);`
                          db.transaction(transaction => {
                            transaction.executeSql(sqlStatement, [], (tx, receivedExercises) => {
                              let sqlStatement = `INSERT INTO \"exercises\"(is_activated, name, is_favorite) VALUES (false, \"Плавание\", false);`
                              db.transaction(transaction => {
                                transaction.executeSql(sqlStatement, [], (tx, receivedExercises) => {
                                  let sqlStatement = `INSERT INTO \"exercises\"(is_activated, name, is_favorite) VALUES (false, \"Йога\", false);`
                                  db.transaction(transaction => {
                                    transaction.executeSql(sqlStatement, [], (tx, receivedExercises) => {
                                    })
                                  })        
                                })
                              })    
                            })
                          })
                        })
                      })    
                    })
                  })    
                })
              })
            }, (tx) => {
              console.log('ошибка получения индикаторов')
            })
          })
        }
      })  
    })
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainTabsActivity'>
        <Stack.Screen name="MainTabsActivity" component={MainTabsActivity}
          options={{ title: 'Softtrack Здоровье' }} />
        <Stack.Screen
          name="ActiveActivity"
          component={ActiveActivity}
          options={{
            title: 'Активность'
          }}
        />
        <Stack.Screen
          name="WalkActivity"
          component={WalkActivity}
          options={{
            title: 'Шаги'
          }}
        />
        <Stack.Screen
          name="ExerciseActivity"
          component={ExerciseActivity}
          options={{
            title: 'Упражнение'
          }}
        />
        <Stack.Screen
          name="FoodActivity"
          component={FoodActivity}
          options={{
            title: 'Еда'
          }}
        />
        <Stack.Screen
          name="SleepActivity"
          component={SleepActivity}
          options={{
            title: 'Сон'
          }}
        />
        <Stack.Screen
          name="BodyActivity"
          component={BodyActivity}
          options={{
            title: 'Состав тела'
          }}
        />
        <Stack.Screen
          name="WaterActivity"
          component={WaterActivity}
          options={{
            title: 'Вода'
          }}
        />
        <Stack.Screen
          name="RecordBodyActivity"
          component={RecordBodyActivity}
          options={{
            title: 'Запись данных о весе'
          }}
        />
        <Stack.Screen
          name="RecordSleepActivity"
          component={RecordSleepActivity}
          options={{
            title: 'Записать вручную'
          }}
        />
        <Stack.Screen
          name="RecordFoodActivity"
          component={RecordFoodActivity}
          options={{
            title: ''
          }}
        />
        <Stack.Screen
          name="RecordExerciseActivity"
          component={RecordExerciseActivity}
          options={{
            title: ''
          }}
        />
        <Stack.Screen
          name="RecordStartedExerciseActivity"
          component={RecordStartedExerciseActivity}
          options={{
            title: ''
          }}
        />
        <Stack.Screen
          name="ExercisesListActivity"
          component={ExercisesListActivity}
          options={{
            title: 'Упражнения'
          }}
        />
        <Stack.Screen
          name="AddExerciseActivity"
          component={AddExerciseActivity}
          options={{
            title: 'Добавить тренировки'
          }}
        />
        <Stack.Screen
          name="AddFoodItemActivity"
          component={AddFoodItemActivity}
          options={{
            title: 'Добав. нов. прием пищи'
          }}
        />
        <Stack.Screen
          name="FoodHistoryActivity"
          component={FoodHistoryActivity}
          options={{
            title: 'Журнал питания'
          }}
        />
        <Stack.Screen
          name="RecordExerciseResultsActivity"
          component={RecordExerciseResultsActivity}
          options={{
            title: ''
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export function RecordSleepActivity({ navigation }) {

  const goToActivity = (navigation, activityName) => {
    navigation.navigate(activityName)
  }

  const addSleepRecord = () => {
    let sqlStatement = `INSERT INTO \"sleep_records\"(hours, minutes, date) VALUES (\"00\", \"00\", \"22.11.2000\");`
    db.transaction(transaction => {
      transaction.executeSql(sqlStatement, [], (tx, receivedRecords) => {
        goToActivity(navigation, 'SleepActivity')
      }, (tx) => {
        console.log('ошибка добавления записей')
      })
    })
  }

  return (
    <View style={styles.sleepActivityContainer}>
      <View style={styles.sleepActivityBody}>
        <View style={styles.sleepActivityBodyDateBtnWrap}>
          <Button title="сб, 19 февр." onPress={() => {

          }} style={styles.sleepActivityBodyDateBtn} />
        </View>
        <View style={styles.sleepActivityPicker}>

        </View>
        <Text style={styles.sleepActivityBodyTimeLabel}>
          8 ч
        </Text>
        <Text style={styles.sleepActivityBodyTimeDesc}>
          Время сна
        </Text>
      </View>
      <View style={styles.sleepActivityFooter}>
        <View style={styles.sleepActivityFooterCancelBtnWrap}>
          <Button
            title="Отмена"
            onPress={() => goToActivity(navigation, 'SleepActivity')}
            style={styles.sleepActivityFooterCancelBtn}
          />
        </View>
        <View style={styles.sleepActivityFooterSaveBtnWrap}>
          <Button
            title="Сохранить"
            onPress={() => addSleepRecord()}
            style={styles.sleepActivityFooterSaveBtn}
          />
        </View>
      </View>
    </View>
  )

}

export function RecordBodyActivity({ navigation }) {

  const goToActivity = (navigation, activityName) => {
    navigation.navigate(activityName)
  }

  const [fat, setFat] = useState(0)

  const [musculature, setMusculature] = useState(0)

  const addBodyRecord = () => {
    let sqlStatement = `INSERT INTO \"body_records\"(marks, musculature, fat, weight, date) VALUES (\"\", 0, 0, 0.0, \"\");`
    db.transaction(transaction => {
      transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
        goToActivity(navigation, 'BodyActivity')  
      }, (tx) => {
        console.log('ошибка получения индикаторов')
      })
    })
  }

  return (
    <View style={styles.recordBodyActivityContainer}>
      <Text style={styles.recordBodyActivityHeader}>
        Запись данных о весе
      </Text>
      <View style={styles.recordBodyActivityDateBtnWrap}>
        <Button title="пт, 3 февраля, 12:06" />
      </View>
      <View style={styles.recordBodyActivityWeightSelector}>

      </View>
      <Text style={styles.recordBodyActivityWeightLabel}>
        Указанный вес будет также выводиться в профиле пользователя
      </Text>
      <View style={styles.recordBodyActivityFatAndMusculature}>
        <View style={styles.recordBodyActivityFat}>
          <Text style={styles.recordBodyActivityFatLabel}>
            Телесн. жир
          </Text>
          <TextInput
            style={styles.recordBodyActivityFatField}
            value={fat}
            onChangeText={text => setFat(text)}
          />
          <Text style={styles.recordBodyActivityFatMeasure}>
            %
          </Text>
        </View>
        <View style={styles.recordBodyActivityMusculature}>
          <Text style={styles.recordBodyActivityMusculatureLabel}>
            Скелетн. мускулат.
          </Text>
          <TextInput
            style={styles.recordBodyActivityMusculatureField}
            value={musculature}
            onChangeText={text => setMusculature(text)}
          />
          <Text style={styles.recordBodyActivityMusculatureMeasure}>
            кг.
          </Text>
        </View>
      </View>
      <View style={styles.recordBodyActivityFooter}>
        <View style={styles.recordBodyActivityFooterCancelBtnWrap}>
          <Button
            color="transparent"
            style={styles.recordBodyActivityFooterCancelBtn}
            title="Отменить"
            onPress={() => goToActivity(navigation, 'BodyActivity')}
          />
        </View>
        <View style={styles.recordBodyActivityFooterSaveBtnWrap}>
          <Button
            color="transparent"
            style={styles.recordBodyActivityFooterSaveBtn}
            title="Сохранить"
            onPress={() => addBodyRecord()}
          />
        </View>
      </View>
    </View>
  )

}

export function RecordFoodActivity({
  navigation,
  route
}) {
  
  const { foodType } = route.params

  const [foodItems, setFoodItems] = useState([])

  const [foodItemsCheckboxes, setFoodItemsCheckboxes] = useState([])

  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM food_items;"
    transaction.executeSql(sqlStatement, [], (tx, receivedItems) => {
      let tempReceivedItems = []
      Array.from(receivedItems.rows).forEach((itemsItemRow, itemsItemRowIdx) => {
        const foodItem = Object.values(receivedItems.rows.item(itemsItemRowIdx))
        tempReceivedItems = [
          ...tempReceivedItems,
          {
            id: foodItem[0],
            name: foodItem[1]            
          }
        ]
      })
      setFoodItems(tempReceivedItems)
    })
  })

  const goToActivity = (navigation, activityName) => {
    navigation.navigate(activityName)
  }

  const addFoodRecord = () => {
    let sqlStatement = `INSERT INTO \"food_records\"(type) VALUES (\"${foodType}\");`
    db.transaction(transaction => {
      transaction.executeSql(sqlStatement, [], (tx, receivedRecords) => {
        goToActivity(navigation, 'FoodActivity')  
      }, (tx) => {
        console.log('ошибка добавления записей')
      })
    })
  }

  const goToFoodHistoryOrAddFoodRecord = () => {
    const activeFoodItemsCheckboxes = foodItemsCheckboxes.filter(foodItemsCheckbox => foodItemsCheckbox) 
    const countActiveFoodItemsCheckboxes = activeFoodItemsCheckboxes.length 
    const isCountActiveFoodItemsCheckboxesGT = countActiveFoodItemsCheckboxes >= 1
    if (isCountActiveFoodItemsCheckboxesGT) {
      goToActivity(navigation, 'FoodHistoryActivity')
    } else {
      addFoodRecord()
    }
  }
  
  return (
    <View style={styles.recordFoodActivityContainer}>
      <View style={styles.recordFoodActivityHeader}>
        <View style={styles.recordFoodActivityHeaderAside}>
          <Entypo
            name="chevron-left"
            size={24}
            color="black"
            onPress={() => goToActivity(navigation, 'FoodActivity')}
          />
          <Text style={styles.recordFoodActivityHeaderAsideLabel}>
            {
              foodType
            }
          </Text>
        </View>
        <View style={styles.recordFoodActivityHeaderBtnWrap}>
          <Button
            title={
              foodItemsCheckboxes.filter(foodItemsCheckbox => foodItemsCheckbox).length >= 1 ?
                'Журнал'
              :
                'Проп. еду'
            }
            style={styles.recordFoodActivityHeaderBtn}
            onPress={() => goToFoodHistoryOrAddFoodRecord()}
          />
        </View>
      </View>
      <View style={styles.recordFoodActivityTabs}>
        <Text style={styles.recordFoodActivityTab}>
          Поиск
        </Text>
        <Text style={styles.recordFoodActivityTab}>
          Любимые
        </Text>
        <Text style={styles.recordFoodActivityTab}>
          Мое питание
        </Text>
      </View>
      <View style={styles.recordFoodActivityProducts}>
        <Text style={styles.recordFoodActivityProductsLabel}>
          Продукты
        </Text>
        <Text style={styles.recordFoodActivityProductsSeparator}>
          ********************************
        </Text>
      </View>
      <View style={styles.recordFoodActivityProductsList}>
        <TouchableOpacity
          style={styles.recordFoodActivityProductsListAdd}
          onPress={() => goToActivity(navigation, 'AddFoodItemActivity')}
        >
          <Text style={styles.recordFoodActivityProductsListAddLabel}>
            Добав. нов. прием пищи
          </Text>
        </TouchableOpacity>
        {
          foodItems.map((foodItem, foodItemIndex) => {
            return (
              <View
                key={foodItemIndex}
                style={styles.recordFoodActivityProductsListItem}
              >
                <Text>
                  {
                    foodItem.name 
                  }
                </Text>
                <CheckBox
                  value={foodItemsCheckboxes[foodItemIndex]}
                  onValueChange={(value) => {
                    foodItemsCheckboxes[foodItemIndex] = !foodItemsCheckboxes[foodItemIndex]
                  }}
                />
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export function RecordExerciseActivity({ navigation, route }) {
  
  const { exerciseType } = route.params

  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  return (
    <View style={styles.recordExerciseActivityContainer}>
      <View style={styles.recordExerciseActivityHeader}>
        <View style={styles.recordExerciseActivityHeaderAside}>
          <Text style={styles.recordExerciseActivityHeaderExerciseType}>
            {
              exerciseType
            }
          </Text>
        </View>
        <View style={styles.recordExerciseActivityHeaderBtns}>
          <Entypo name="note" size={24} color="black" />
          <Feather name="more-vertical" size={24} color="black" />
        </View>
      </View>
      <View style={styles.recordExerciseActivityMap}>

      </View>
      <View style={styles.recordExerciseActivityStartBtnWrap}>
        <Button
          title="Начать"
          onPress={() => goToActivity(navigation, 'RecordStartedExerciseActivity')}
          style={styles.recordExerciseActivityStartBtn}
        />
      </View>
    </View>
  )
}

export function RecordStartedExerciseActivity({ navigation }) {
  
  const [isStarted, setIsStarted] = useState(true)
  
  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const completeExercise = () => {
    goToActivity(navigation, 'RecordExerciseResultsActivity')
  }

  return (
    <View style={styles.recordStartedExerciseActivityContainer}>
      <View style={styles.recordStartedExerciseActivityHeader}>
      </View>
      <View style={styles.recordStartedExerciseActivityBody}>

      </View>
      <View style={styles.recordStartedExerciseActivityFooter}>
        {
          isStarted ?
            (
              <View style={styles.recordStartedExerciseActivityFooterPauseBtnWrap}>
                <Button
                  style={styles.recordStartedExerciseActivityFooterPauseBtn}
                  title="Пауза"
                  onPress={() => setIsStarted(false)}
                />
              </View>
            )
          :
          (
            <>
              <View style={styles.recordStartedExerciseActivityFooterResumeBtnWrap}>
                <Button
                  style={styles.recordStartedExerciseActivityFooterResumeBtn}
                  title="Продолжить"
                  onPress={() => setIsStarted(true)}
                />  
              </View>
              <View style={styles.recordStartedExerciseActivityFooterCompleteBtnWrap}>
                <Button
                  style={styles.recordStartedExerciseActivityFooterCompleteBtn}
                  title="Завершить"
                  onPress={() => completeExercise()}
                />  
              </View>
            </>
          )
        }
        <Ionicons name="md-location-sharp" size={24} color="black" />
      </View>
    </View>
  )
}

export function ExercisesListActivity({ navigation }) {
  
  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const [exercises, setExercises] = useState([])

  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM exercises;"
    transaction.executeSql(sqlStatement, [], (tx, receivedExercises) => {
      let tempReceivedExercises = []
      Array.from(receivedExercises.rows).forEach((exercisesItemRow, exercisesItemRowIdx) => {
        const exercise = Object.values(receivedExercises.rows.item(exercisesItemRowIdx))
        tempReceivedExercises = [
          ...tempReceivedExercises,
          {
            id: exercise[0],
            isActivated: exercise[1],
            name: exercise[2],
            isFavorite: exercise[3]
          }
        ]
      })
      setExercises(tempReceivedExercises)
    })
  })
  
  return (
    <View style={styles.exercisesListActivityContainer}>
      <View style={styles.exercisesListActivityHeader}>
        <View style={styles.exercisesListActivityHeaderAside}>
          <Entypo
            name="chevron-left"
            size={24}
            color="black"
            onPress={() => goToActivity(navigation, 'MainActivity')}
          />
          <Text style={styles.exercisesListActivityHeaderAsideLabel}>
            Упражнения
          </Text>
        </View>
        <Feather name="more-vertical" size={24} color="black" />
      </View>
      <ScrollView style={styles.exercisesListActivityList}>
        {
          exercises.map((exercise, exerciseIndex) => {
            return (
              exercise.isActivated ?
                <View key={exerciseIndex} style={styles.exercisesListActivityListItem}>
                  <View style={styles.exercisesListActivityListItemAside}>
                    <FontAwesome5 name="walking" size={36} color="green" />
                    <Text style={styles.exercisesListActivityListItemAsideLabel}>
                      {
                        exercise.name
                      }
                    </Text>
                  </View>
                  <AntDesign
                    name="star"
                    size={24}
                    color={
                      exercise.isFavorite ? 'yellow' : 'black'
                    }
                  />
                </View>
              :
                null
            )
          })
        }
      </ScrollView>
      <TouchableOpacity
        style={styles.exercisesListActivityFooter}
        onPress={() => goToActivity(navigation, 'AddExerciseActivity')}
      >
        <Text style={styles.exercisesListActivityFooterLabel}>
          Добавить тренировки
        </Text>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export function AddExerciseActivity({ navigation }) {
  
    
  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const [exercises, setExercises] = useState([])

  const [exerciseType, setExerciseType] = useState({
    checked: ''
  })

  const [exercisesCheckboxes, setExercisesCheckboxes] = useState([])

  const activateExercises = () => {
    exercisesCheckboxes.map((exercisesCheckbox, exercisesCheckboxIndex) => {
      const exercisesCheckboxId = exercisesCheckboxIndex + 1
      let sqlStatement = `UPDATE exercises SET is_activated=${exercisesCheckbox} WHERE _id=${exercisesCheckboxId};`
      transaction.executeSql(sqlStatement, [], (tx, receivedExercises) => {
      
      })
    })
    goToActivity(navigation, 'ExercisesListActivity')
  }

  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM exercises;"
    transaction.executeSql(sqlStatement, [], (tx, receivedExercises) => {
      let tempReceivedExercises = []
      Array.from(receivedExercises.rows).forEach((exercisesItemRow, exercisesItemRowIdx) => {
        const exercise = Object.values(receivedExercises.rows.item(exercisesItemRowIdx))
        tempReceivedExercises = [
          ...tempReceivedExercises,
          {
            id: exercise[0],
            isActivated: exercise[1],
            name: exercise[2],
            isFavorite: exercise[3]
          }
        ]
      })
      setExercises(tempReceivedExercises)
    })
  })
  
  return (
    <View style={styles.exercisesListActivityContainer}>
      <View style={styles.exercisesListActivityHeader}>
        <View style={styles.exercisesListActivityHeaderAside}>
          <Entypo
            name="chevron-left"
            size={24}
            color="black"
            onPress={() => goToActivity(navigation, 'MainActivity')}
          />
          <Text style={styles.exercisesListActivityHeaderAsideLabel}>
            Добавить тренировки
          </Text>
        </View>
        <Feather name="more-vertical" size={24} color="black" />
      </View>
      <ScrollView style={styles.exercisesListActivityList}>
        {
          exercises.map((exercise, exerciseIndex) => {
            return (
              !exercise.isActivated ?
                <View key={exerciseIndex} style={styles.exercisesListActivityListItem}>
                  {/* <RadioButton
                    value={exercise.name}
                    label={exercise.name}
                    status={
                      exerciseType == exercise.name ? 'checked' : 'unchecked'
                    }
                    onPress={() => { 
                      setExerciseType({
                        checked: exercise.name
                      })
                    }}
                  /> */}
                  <CheckBox
                    value={exercisesCheckboxes[exerciseIndex]}
                    onValueChange={() => {
                      exercisesCheckboxes[exerciseIndex] = !exercisesCheckboxes[exerciseIndex]
                    }}
                  />
                  <View style={styles.exercisesListActivityListItemAside}>
                    <FontAwesome5 name="walking" size={36} color="green" />
                    <Text style={styles.exercisesListActivityListItemAsideLabel}>
                      {
                        exercise.name
                      }
                    </Text>
                  </View>
                </View>
              :
                null
            )
          })
        }
      </ScrollView>
      <TouchableOpacity
        style={styles.addExerciseActivityFooter}
        onPress={() => activateExercises()}
      >
        <Text style={styles.exercisesListActivityFooterLabel}>
          Добавить
        </Text>
        <AntDesign name="plus" size={72} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export function AddFoodItemActivity({ navigation }) {
  
  const [kKal, setKKal] = useState('')
  
  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const addFoodItem = () => {
    let sqlStatement = `INSERT INTO \"food_items\"(name, callories, total_carbs, total_fats, protein, saturated_fats, trans_fats, cholesterol, sodium, potassium, cellulose, sugar, a, c, calcium, iron, portions, type) VALUES (\"\", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, \"\");`
    db.transaction(transaction => {
      transaction.executeSql(sqlStatement, [], (tx, receivedItems) => {
        goToActivity(navigation, 'RecordFoodActivity')  
      }, (tx) => {
        console.log('ошибка добавления элементов')
      })
    })
  }

  return (
    <View style={styles.addFoodActivityContainer}>
      <View style={styles.addFoodActivityCaloriesRow}>
        <Text style={styles.addFoodActivityLabel}>
          Калорий на порцию
        </Text>
        <View style={styles.addFoodActivityCaloriesRowAside}>
          <TextInput
            style={styles.addFoodActivityCaloriesRowAsideInput}
            value={kKal}
            onChangeText={text => setKKal(text)}
          />
          <Text style={styles.addFoodActivityCaloriesRowAsideLabel}>
            ккал
          </Text>
        </View>
      </View>
      <View style={styles.addFoodActivityAddNutrientsBtnWrap}>
        <Button
          style={styles.addFoodActivityAddNutrientsBtn}
          title="Добав. питат. вещества"
        />
      </View>
      <View style={styles.addFoodActivityFooter}>
        <View style={styles.addFoodActivityFooterCancelBtnWrap}>
          <Button
            style={styles.addFoodActivityFooterCancelBtn}
            title="Отмена"
            onPress={() => goToActivity(navigation, 'RecordFoodActivity')}
          />
        </View>
        <View style={styles.addFoodActivityFooterSaveBtnWrap}>
          <Button
            style={styles.addFoodActivityFooterSaveBtn}
            title="Сохранить"
            onPress={() => addFoodItem()}
          />
        </View>
      </View>
    </View>
  )
}

export function FoodHistoryActivity() {
  return (
    <View>
      <Text>
        FoodHistoryActivity
      </Text>
    </View>
  )
}

export function RecordExerciseResultsActivity({ navigation, route }) {
  return (
    <View style={styles.recordExerciseResultsActivityContainer}>
      <View style={styles.recordExerciseResultsActivityHeader}>
        <View style={styles.recordExerciseResultsActivityHeaderAside}>
          <Entypo
            name="chevron-left"
            size={24}
            color="black"
            onPress={() => goToActivity(navigation, 'MainActivity')}
          />
          <Text>
            Бег
          </Text>
        </View>
        <View style={styles.recordExerciseResultsActivityHeaderBtns}>
          <FontAwesome5 name="share-alt" size={24} color="black" />
          <Feather name="more-vertical" size={24} color="black" />
        </View>
      </View>
      <Text style={styles.recordExerciseResultsActivityDateLabel}>
        вс, 20 февр.
      </Text>
      <Text style={styles.recordExerciseResultsActivityTimeLabel}>
        19:21 - 19:31
      </Text>
      <View style={styles.recordExerciseResultsActivityDistanseAndTime}>

      </View>
      <View style={styles.recordExerciseResultsActivityDetails}>
        <Text style={styles.recordExerciseResultsActivityDetailsHeader}>
          Сведения о тренировке
        </Text>
        <View style={styles.recordExerciseResultsActivityDetailsRow}>
          <View style={styles.recordExerciseResultsActivityDetailsRowItem}>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemHeader}>
              Время тренировки
            </Text>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemContent}>
              00:01:06
            </Text>
          </View>
          <View style={styles.recordExerciseResultsActivityDetailsRowItem}>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemHeader}>
              Время тренировки
            </Text>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemContent}>
              00:01:06
            </Text>
          </View>
        </View>
        <View style={styles.recordExerciseResultsActivityDetailsRow}>
          <View style={styles.recordExerciseResultsActivityDetailsRowItem}>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemHeader}>
              Время тренировки
            </Text>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemContent}>
              00:01:06
            </Text>
          </View>
          <View style={styles.recordExerciseResultsActivityDetailsRowItem}>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemHeader}>
              Время тренировки
            </Text>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemContent}>
              00:01:06
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.recordExerciseResultsActivityImages}>
        <Ionicons name="camera" size={24} color="black" />
        <Text style={styles.recordExerciseResultsActivityImagesLabel}>
          Изображения
        </Text>      
      </View>
      <View style={styles.recordExerciseResultsActivityNotes}>
        <Foundation name="clipboard-notes" size={24} color="black" />
        <Text style={styles.recordExerciseResultsActivityNotesLabel}>
          Заметки
        </Text>
      </View>
    </View>
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
  mainPageContainerWalkBlockBody: {
    
  },
  mainPageContainerWalkBlockBodyLabel: {
    fontWeight: 700,
    fontSize: 24
  },
  mainPageContainerWalkBlockBodyRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainPageContainerWalkBlockBodyRowAside: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  mainPageContainerWalkBlockBodyRowCountLabel: {
    fontWeight: 700,
    fontSize: 24,
    marginHorizontal: 10
  },
  mainPageContainerWalkBlockBodyRowMaxCountLabel: {

  },
  mainPageContainerExerciseBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerExerciseBlockBody: {

  },
  mainPageContainerExerciseBlockBodyHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainPageContainerExerciseBlockBodyHeaderLabel: {
    fontWeight: 700,
    fontSize: 20
  },
  mainPageContainerExerciseBlockBodyHeaderLog: {
    fontWeight: 700,
    fontSize: 20,
    color: 'rgb(150, 150, 150)'
  },
  mainPageContainerExerciseBlockBodyExercises: {
    marginVertical: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  mainPageContainerExerciseBlockBodyExercisesItem: {
    borderRadius: '100%',
    borderColor: 'rgb(0, 0, 0)',
    borderWidth: 1,
    width: 75,
    height: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainPageContainerFoodBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerFoodBlockLabel: {
    fontSize: 24,
    fontWeight: 700
  },
  mainPageContainerFoodBlockRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainPageContainerFoodBlockRowAside: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainPageContainerFoodBlockRowAsideLabel: {
    fontWeight: 700,
    fontSize: 24, 
    marginRight: 15
  },
  mainPageContainerFoodBlockRowAsideMaxCount: {
    
  },
  mainPageContainerFoodBlockRecordBtnWrap: {
    
  },
  mainPageContainerFoodBlockRecordBtn: {

  },
  mainPageContainerSleepBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerSleepBlockLabel: {
    fontSize: 24,
    fontWeight: 700
  },
  mainPageContainerSleepBlockRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainPageContainerSleepBlockRowLabel: {
    
  },
  mainPageContainerSleepBlockRecordBtnWrap: {
    
  },
  mainPageContainerSleepBlockRecordBtn: {

  },
  mainPageContainerBodyBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerBodyBlockBodyHeader: {
    fontWeight: 700,
    fontSize: 20
  },
  mainPageContainerBodyBlockBodyRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainPageContainerBodyBlockBodyRowItem: {
    marginHorizontal: 25  
  },
  mainPageContainerBodyBlockBodyRowItemIcon: {
    
  },
  mainPageContainerBodyBlockBodyRowItemFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainPageContainerBodyBlockBodyRowItemFooterLabel: {
    marginRight: 10,
    fontWeight: 700,
    fontSize: 24
  },
  mainPageContainerBodyBlockBodyRowItemFooterMeasure: {
    
  },
  mainPageContainerWaterBlock: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerWaterBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainPageContainerWaterBodyAside: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  mainPageContainerWaterBodyAsideLabel: {
    fontSize: 20,
    fontWeight: 700
  },
  mainPageContainerWaterBodyAsideRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  mainPageContainerWaterBodyAsideRowCount: {
    fontWeight: 700,
    fontSize: 28
  },
  mainPageContainerWaterBodyAsideRowMeasure: {
    marginHorizontal: 5 
  },
  mainPageContainerWaterBodyRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  mainPageContainerWaterBodyRowRemoveBtnWrap: {
    marginHorizontal: 10,
    width: 35,
    height: 35,
    borderRadius: '100%'
  },
  mainPageContainerWaterBodyRowRemoveBtn: {
    
  },
  mainPageContainerWaterBodyRowAddBtnWrap: {
    marginHorizontal: 10,
    width: 35,
    height: 35,
    borderRadius: '100%'
  },
  mainPageContainerWaterBodyRowAddBtn: {

  },
  waterActivityScroll: {
    
  },
  waterActivityBodyLabel: {
    fontSize: 20,
    fontWeight: 700
  },
  waterActivityGlassCalculator: {
    width: 100,
    height: 100,
    marginHorizontal: 'auto'
  },
  waterActivityRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  waterActivityRowRemoveBtnWrap: {
    width: 125
  },
  waterActivityRowRemoveBtn: {

  },
  waterActivityRowLabel: {
    fontWeight: 700,
    fontSize: 48
  },
  waterActivityRowAddBtnWrap: {
    width: 125
  },
  waterActivityRowAddBtn: {

  },
  waterActivityMeasure: {
    textAlign: 'center'
  },
  waterActivityMls: {
    textAlign: 'center'
  },
  waterActivityDetectLabel: {
    textAlign: 'center'
  },
  activeActivityScroll: {
    backgroundColor: 'rgb(225, 225, 225)'
  },
  activeActivityBody: {
    width: '95%',
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  activeActivityBodyHeader: {
    fontWeight: 700,
    fontSize: 24
  },
  activeActivityBodyImg: {
    width: 100,
    height: 100,
    marginHorizontal: 'auto'
  },
  activeActivityBodyItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  activeActivityBodyItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%'
  },
  activeActivityBodyItemHeader: {
    textAlign: 'center'
  },
  activeActivityBodyItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  activeActivityBodyItemRowIcon: {

  },
  activeActivityBodyItemRowLabel: {
    fontWeight: 700,
    fontSize: 36
  },
  activeActivityBodyItemFooter: {
    textAlign: 'center'  
  },
  activeActivityBodyCallories: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  activeActivityBodyCalloriesAll: {
    color: 'rgb(185, 185, 185)'  
  },
  activeActivityBodyCalloriesSeparator: {
    
  },
  activeActivityBodyCalloriesLabel: {
    fontWeight: 700
  },
  activeActivityBodyDistanse: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  activeActivityBodyDistanseAll: {
    color: 'rgb(185, 185, 185)'  
  },
  activeActivityBodyDistanseSeparator: {
    
  },
  activeActivityBodyDistanseLabel: {
    fontWeight: 700  
  },
  walkActivityScroll: {

  },
  walkActivityBody: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    marginHorizontal: 'auto',
    width: '95%',
    marginVertical: 15
  },
  walkActivityBodyHeader: {

  },
  walkActivityBodyData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  walkActivityBodyDataLabel: {
    fontWeight: 700,
    fontSize: 24,
    marginRight: 5
  },
  walkActivityBodyDataMeasure: {
    fontWeight: 700,
    fontSize: 20
  },
  walkActivityBodyDistanseAndCallories: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  walkActivityBodyDistanseLabel: {
    fontWeight: 700,
    fontSize: 22,
    marginHorizontal: 5
  },
  walkActivityBodyDistanseMeasure: {
    fontWeight: 700,
    fontSize: 18,
    marginHorizontal: 5
  },
  walkActivityBodyCalloriesLabel: {
    fontWeight: 700,
    fontSize: 22,
    marginHorizontal: 5
  },
  walkActivityBodyCalloriesMeasure: {
    fontWeight: 700,
    fontSize: 18,
    marginHorizontal: 5
  },
  exerciseActivityBody: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    marginHorizontal: 'auto',
    width: '95%',
    marginVertical: 15
  },
  exerciseActivityBodyPeriod: {
    fontWeight: 700
  },
  exerciseActivityBodyTime: {
    fontWeight: 700,
    fontSize: 36,
    textAlign: 'center'
  },
  exerciseActivityBodyCalloriesAndSessions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  exerciseActivityBodyCalloriesLabel: {
    fontWeight: 700,
    fontSize: 22,
    marginHorizontal: 5
  },
  exerciseActivityBodyCalloriesMeasure: {
    fontWeight: 700,
    fontSize: 18,
    marginHorizontal: 5
  },
  exerciseActivityBodySessionsLabel: {
    fontWeight: 700,
    fontSize: 22,
    marginHorizontal: 5
  },
  exerciseActivityBodySessionsMeasure: {
    fontWeight: 700,
    fontSize: 18,
    marginHorizontal: 5
  },
  exerciseActivityBodyRecord: {
    marginVertical: 25
  },
  exerciseActivityBodyRecordHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(0, 0, 0)',
    marginVertical: 5
  },
  exerciseActivityBodyRecordHeaderDate: {
    fontWeight: 700
  },
  exerciseActivityBodyRecordHeaderTime: {
    
  },
  exerciseActivityBodyRecordContent: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5
  },
  exerciseActivityBodyRecordContentName: {
    marginLeft: 15
  },
  foodActivityData: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    marginVertical: 15,
    marginHorizontal: 'auto',
    width: '95%'
  },
  foodActivityDataHeader: {
    fontWeight: 700
  },
  foodActivityDataCallories: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  foodActivityDataCalloriesContent: {
    fontWeight: 700,
    fontSize: 48,
    marginHorizontal: 5
  },
  foodActivityDataCalloriesMeasure: {
    fontWeight: 700,
    marginHorizontal: 5,
    fontSize: 20
  },
  foodActivityDataImg: {
    width: 250,
    height: 250,
    marginHorizontal: 'auto'
  },
  foodActivityDataDetectLabel: {
    textAlign: 'center'  
  },
  foodActivityRecordBtnWrap: {
    width: 125,
    marginHorizontal: 'auto'
  },
  foodActivityRecordBtn: {

  },
  foodActivityRecordFoodType: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  foodActivityRecordFoodTypeLabel: {
    marginLeft: 25,
    fontWeight: 700,
    fontSize: 24
  },
  bodyActivityLastData: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    marginHorizontal: 'auto',
    marginVertical: 15,
    padding: 15,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  bodyActivityLastDataHeader: {

  },
  bodyActivityLastDataItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bodyActivityLastDataItem: {
    width: '20%'
  },
  bodyActivityLastDataItemMeasure: {
    textAlign: 'center'
  },
  bodyActivityLastDataItemWeightMeasure: {
    color: 'rgb(0, 150, 0)'
  },
  bodyActivityLastDataRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bodyActivityLastDataRowContent: {
    marginHorizontal: 5,
    fontWeight: 700,
    fontSize: 36
  },
  bodyActivityLastDataRowMeasure: {
    marginHorizontal: 5,
    fontWeight: 700,
    fontSize: 20
  },
  bodyActivityImt: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderTopColor: 'rgb(150, 150, 150)',
    borderTopWidth: 1,
    borderBottomColor: 'rgb(150, 150, 150)',
    borderBottomWidth: 1,
    paddingVertical: 15
  },
  bodyActivityImtLabel: {

  },
  bodyActivityImtEdit: {
    fontWeight: 700
  },
  bodyActivityRecords: {
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    padding: 15,
    marginVertical: 15,
    marginHorizontal: 'auto'
  },
  bodyActivityRecord: {
    marginVertical: 15,
    borderBottomColor: 'rgb(150, 150, 150)',
    borderBottomWidth: 1
  },
  bodyActivityHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bodyActivityHeaderItem: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bodyActivityHeaderItemLabel: {
    fontSize: 24,
    marginHorizontal: 5
  },
  bodyActivityHeaderItemMeasure: {
    fontSize: 20,
    marginHorizontal: 5
  },
  bodyActivityRecordTime: {
    color: 'rgb(175, 175, 175)',
    marginVertical: 10
  },
  sleepActivityData: {
    padding: 15,
    marginHorizontal: 'auto',
    marginVertical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%'
  },
  bodyActivityAddRecordBtnWrap: {
    width: 125,
    marginHorizontal: 'auto'
  },
  bodyActivityAddRecordBtn: {

  },
  sleepActivityDataHeader: {

  },
  sleepActivityDataTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sleepActivityDataTimeHoursLabel: {
    marginHorizontal: 5
  },
  sleepActivityDataTimeHoursContent: {
    fontWeight: 700,
    fontSize: 20,
    marginHorizontal: 5
  },
  sleepActivityDataTimeMinutesLabel: {
    marginHorizontal: 5
  },
  sleepActivityDataTimeMinutesContent: {
    fontWeight: 700,
    fontSize: 20,
    marginHorizontal: 5
  },
  sleepActivityDataTimeEnd: {

  },
  sleepActivityTimeStartAndEnd: {

  },
  sleepActivityRecordLabel: {
    textAlign: 'center',
    marginVertical: 10
  },
  sleepActivityRecordBtnWrap: {
    width: 275,
    marginHorizontal: 'auto'
  },
  sleepActivityRecordBtn: {

  },
  recordBodyActivityContainer: {

  },
  recordBodyActivityHeader: {

  },
  recordBodyActivityDateBtnWrap: {

  },
  recordBodyActivityDateBtn: {
    
  },
  recordBodyActivityWeightSelector: {
    height: 250
  },
  recordBodyActivityWeightLabel: {
    textAlign: 'center'
  },
  recordBodyActivityFatAndMusculature: {

  },
  recordBodyActivityFat: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVerical: 15
  },
  recordBodyActivityFatLabel: {

  },
  recordBodyActivityFatField: {

  },
  recordBodyActivityFatMeasure: {

  },
  recordBodyActivityMusculature: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVerical: 15
  },
  recordBodyActivityMusculatureLabel: {

  },
  recordBodyActivityMusculatureField: {

  },
  recordBodyActivityMusculatureMeasure: {

  },
  recordBodyActivityFooter: {
    display: 'flex',
    flexDirection: 'row'
  },
  recordBodyActivityFooterCancelBtnWrap: {
    color: 'rgb(0, 0, 0)',
    width: '50%'
  },
  recordBodyActivityFooterCancelBtn: {
    color: 'rgb(0, 0, 0)'
  },
  recordBodyActivityFooterSaveBtnWrap: {
    color: 'rgb(0, 0, 0)',
    width: '50%'
  },
  recordBodyActivityFooterSaveBtn: {
    color: 'rgb(0, 0, 0)'
  },
  sleepActivityContainer: {

  },
  sleepActivityBody: {
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    marginVertical: 15,
    marginHorizontal: 'auto',
    padding: 15
  },
  sleepActivityBodyDateBtnWrap: {
    width: 125,
    marginHorizontal: 'auto'
  },
  sleepActivityBodyDateBtn: {

  },
  sleepActivityPicker: {
    height: 100,
    width: 100
  },
  sleepActivityBodyTimeLabel: {
    textAlign: 'center'
  },
  sleepActivityBodyTimeDesc: {
    textAlign: 'center'
  },
  sleepActivityFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sleepActivityFooterCancelBtnWrap: {
    width: '50%'
  },
  sleepActivityFooterCancelBtn: {

  },
  sleepActivityFooterSaveBtnWrap: {
    width: '50%'
  },
  sleepActivityFooterSaveBtn: {

  },
  sleepActivityWidget: {
    width: 150,
    height: 150,
    borderRadius: '100%'
  },
  recordFoodActivityContainer: {

  },
  recordFoodActivityHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recordFoodActivityHeaderAside: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recordFoodActivityHeaderAsideLabel: {

  },
  recordFoodActivityHeaderBtn: {

  },
  recordFoodActivityHeaderBtnWrap: {
    width: 125
  },
  recordFoodActivityTabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recordFoodActivityTab: {
    width: '25%'
  },
  recordFoodActivityProducts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recordFoodActivityProductsLabel: {
    color: 'rgb(150, 150, 150)'
  },
  recordFoodActivityProductsSeparator: {
    color: 'rgb(150, 150, 150)'
  },
  recordFoodActivityProductsList: {
    width: '95%',
    marginHorizontal: 'auto',
    marginVerical: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 25
  },
  recordFoodActivityProductsListAdd: {
    marginVertical: 15
  },
  recordFoodActivityProductsListItem: {
    marginVertical: 15
  },
  recordFoodActivityProductsListAddLabel: {
    textAlign: 'center',
    fontWeight: 700
  },
  recordExerciseActivityContainer: {

  },
  recordExerciseActivityHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recordExerciseActivityHeaderAside: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recordExerciseActivityHeaderExerciseType: {

  },
  recordExerciseActivityHeaderBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recordExerciseActivityMap: {
    height: 500
  },
  recordExerciseActivityStartBtnWrap: {
    width: 125,
    marginHorizontal: 'auto'
  },
  recordExerciseActivityStartBtn: {

  },
  exercisesListActivityHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  exercisesListActivityHeaderAside: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  exercisesListActivityHeaderAsideLabel: {
    fontSize: 24,
    fontWeight: 700
  },
  exercisesListActivityList: {
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    marginHorizontal: 'auto',
    padding: 15,
    marginVertical: 15
  },
  exercisesListActivityListItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgb(150, 150, 150)',
    borderBottomWidth: 1
  },
  exercisesListActivityListItemAside: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  exercisesListActivityListItemAsideLabel: {
    fontWeight: 700,
    fontSize: 20,
    marginLeft: 25
  },
  exercisesListActivityFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  exercisesListActivityFooterLabel: {
    fontSize: 20,
    fontWeight: 700
  },
  addExerciseActivityFooter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100
  },
  addFoodActivityContainer: {

  },
  addFoodActivityCaloriesRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addFoodActivityCaloriesRowAside: {
    display: 'flex',
    flexDirection: 'row'
  },
  addFoodActivityCaloriesRowAsideInput: {

  },
  addFoodActivityCaloriesRowAsideLabel: {

  },
  addFoodActivityAddNutrientsBtnWrap: {
    width: 250,
    marginVertical: 15,
    marginHorizontal: 'auto'
  },
  addFoodActivityAddNutrientsBtn: {

  },
  addFoodActivityFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addFoodActivityFooterCancelBtnWrap: {
    width: '50%'
  },
  addFoodActivityFooterCancelBtn: {
    
  },
  addFoodActivityFooterSaveBtnWrap: {
    width: '50%'
  },
  addFoodActivityFooterSaveBtn: {
    
  },
  recordStartedExerciseActivityFooter: {
    display: 'flex',
    flexDirection: 'row'
  },
  recordStartedExerciseActivityFooterPauseBtnWrap: {
    width: 500
  },
  recordStartedExerciseActivityFooterPauseBtn: {

  },
  recordStartedExerciseActivityFooterResumeBtnWrap: {
    width: 250
  },
  recordStartedExerciseActivityFooterResumeBtn: {

  },
  recordStartedExerciseActivityFooterCompleteBtnWrap: {
    width: 250
  },
  recordStartedExerciseActivityFooterCompleteBtn: {

  },
  recordExerciseResultsActivityContainer: {
    width: '100%'
  },
  recordExerciseResultsActivityHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recordExerciseResultsActivityHeaderAside: {
    display: 'flex',
    flexDirection: 'row'
  },
  recordExerciseResultsActivityHeaderBtns: {
    display: 'flex',
    flexDirection: 'row'
  },
  recordExerciseResultsActivityDetails: {
    width: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    margniVertical: 15,
    marginHorizontal: 'auto'
  },
  recordExerciseResultsActivityDetailsHeader: {
    fontWeight: 700,
    fontSize: 24
  },
  recordExerciseResultsActivityDetailsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  recordExerciseResultsActivityDetailsRowItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  recordExerciseResultsActivityDetailsRowItemHeader: {
    color: 'rgb(175, 175, 175)'
  },
  recordExerciseResultsActivityDetailsRowItemContent: {
    fontWeight: 700,
    fontSize: 24
  },
  recordExerciseResultsActivityImages: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    marginVertical: 15,
    marginHorizontal: 'auto'
  },
  recordExerciseResultsActivityImagesLabel: {
    marginLeft: 25
  },
  recordExerciseResultsActivityNotes: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    marginVertical: 15,
    marginHorizontal: 'auto'
  },
  recordExerciseResultsActivityNotesLabel: {
    marginLeft: 25
  }
})