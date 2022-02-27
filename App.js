import { StatusBar } from 'expo-status-bar'
import { React, useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, Button, ScrollView, CheckBox, Dimensions, Switch, Menu, MenuItem, Platform, } from 'react-native'
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
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors'
import DateTimePicker from '@react-native-community/datetimepicker'
import MapView from 'react-native-maps'
// Menu, MenuItem, MenuDivider
import * as MaterialMenu from 'react-native-material-menu'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { ProgressBar, Colors } from 'react-native-paper'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

const Tab = createBottomTabNavigator()

function MainTabsActivity({ navigation }) {
  
  const [isMainActivityContextMenuVisible, setIsMainActivityContextMenuVisible] = useState(false)
  const [isTogetherActivityContextMenuVisible, setIsTogetherActivityContextMenuVisible] = useState(false)
  const [isFitnesActivityContextMenuVisible, setIsFitnesActivityContextMenuVisible] = useState(false)
  const [isMyPageActivityContextMenuVisible, setIsMyPageActivityContextMenuVisible] = useState(false)

  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowIcon: true
      }}
    >
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
          },
          headerRight: () => {
            return (
              <View>
                <MaterialMenu.Menu
                  onRequestClose={() => setIsMainActivityContextMenuVisible(false)}
                  visible={isMainActivityContextMenuVisible}
                >
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityContextMenuVisible(false)
                      setIsSelectionMode(true)
                    }}
                  >
                    Управление
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityContextMenuVisible(false)
                    }}
                  >
                    Для вас
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityContextMenuVisible(false)
                    }}
                  >
                    События
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityContextMenuVisible(false)
                    }}
                  >
                    Уведомления
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityContextMenuVisible(false)
                      goToActivity(navigation, 'SettingsActivity')
                    }}
                  >
                    Настр.
                  </MaterialMenu.MenuItem>
                </MaterialMenu.Menu>
                <TouchableOpacity
                  onLongPress={() => setIsMainActivityContextMenuVisible(true)}
                >
                <Feather
                  name="more-vertical"
                  size={24} color="black"
                />
                </TouchableOpacity>
              </View>
            )
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
          },
          headerRight: () => {
            return (
              <View>
                <MaterialMenu.Menu
                  onRequestClose={() => setIsTogetherActivityContextMenuVisible(false)}
                  visible={isTogetherActivityContextMenuVisible}
                >
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsTogetherActivityContextMenuVisible(false)
                    }}
                  >
                    Для вас
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsTogetherActivityContextMenuVisible(false)
                    }}
                  >
                    События
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsTogetherActivityContextMenuVisible(false)
                    }}
                  >
                    Уведомления
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsTogetherActivityContextMenuVisible(false)
                      goToActivity(navigation, 'SettingsActivity')
                    }}
                  >
                    Настр.
                  </MaterialMenu.MenuItem>
                </MaterialMenu.Menu>
                <TouchableOpacity
                  onLongPress={() => setIsTogetherActivityContextMenuVisible(true)}
                >
                <Feather
                  name="more-vertical"
                  size={24} color="black"
                />
                </TouchableOpacity>
              </View>
            )
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
          },
          headerRight: () => {
            return (
              <View>
                <MaterialMenu.Menu
                  onRequestClose={() => setIsFitnesActivityContextMenuVisible(false)}
                  visible={isFitnesActivityContextMenuVisible}
                >
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsFitnesActivityContextMenuVisible(false)
                    }}
                  >
                    Направления
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsFitnesActivityContextMenuVisible(false)
                    }}
                  >
                    Журнал
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsFitnesActivityContextMenuVisible(false)
                    }}
                  >
                    Для вас
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsFitnesActivityContextMenuVisible(false)
                    }}
                  >
                    События
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsFitnesActivityContextMenuVisible(false)
                    }}
                  >
                    Уведомления
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsFitnesActivityContextMenuVisible(false)
                      goToActivity(navigation, 'SettingsActivity')
                    }}
                  >
                    Настр.
                  </MaterialMenu.MenuItem>
                </MaterialMenu.Menu>
                <TouchableOpacity
                  onLongPress={() => setIsFitnesActivityContextMenuVisible(true)}
                >
                <Feather
                  name="more-vertical"
                  size={24} color="black"
                />
                </TouchableOpacity>
              </View>
            )
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
          },
          headerRight: () => {
            return (
              <View>
                <MaterialMenu.Menu
                  onRequestClose={() => setIsMyPageActivityContextMenuVisible(false)}
                  visible={isMyPageActivityContextMenuVisible}
                >
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMyPageActivityContextMenuVisible(false)
                    }}
                  >
                    Для вас
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMyPageActivityContextMenuVisible(false)
                    }}
                  >
                    События
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMyPageActivityContextMenuVisible(false)
                    }}
                  >
                    Уведомления
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMyPageActivityContextMenuVisible(false)
                      goToActivity(navigation, 'SettingsActivity')
                    }}
                  >
                    Настр.
                  </MaterialMenu.MenuItem>
                </MaterialMenu.Menu>
                <TouchableOpacity
                  onLongPress={() => setIsMyPageActivityContextMenuVisible(true)}
                >
                <Feather
                  name="more-vertical"
                  size={24} color="black"
                />
                </TouchableOpacity>
              </View>
            )
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
  
  const [isExerciseEnabled, setIsExerciseEnabled] = useState(false)

  const [exerciseStartTime, setExerciseStartTime] = useState('')

  const [exerciseType, setExerciseType] = useState('')

  const [exerciseDuration, setExerciseDuration] = useState('00:00:00')
  
  const [isStarted, setIsStarted] = useState(true)
  
  const [startTimerTitle, setStartTimerTitle] = useState('00:00:00')

  const [startedTimer, setStartedTimer] = useState(null)
  
  const millisecondsInSecond = 1000

  const timePartsSeparator = ':'
  
  const initialSeconds = 0
  
  const initialMinutes = 0
  
  const countSecondsInMinute = 60
  
  const countMinutesInHour = 60
  
  const oneCharPrefix = 0

  const [startedTimerHoursTime, setStartedTimerHoursTime] = useState('00')

  const [startedTimerMinutesTime, setStartedTimerMinutesTime] = useState('00')

  const [startedTimerSecondsTime, setStartedTimerSecondsTime] = useState('00')

  const [controllers, setControllers] = useState([
    false,
    true,
    true,
    true,
    true,
    true,
    true
  ])

  var initialControllers = [
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ]

  const [isSelectionMode, setIsSelectionMode] = useState(false)

  const [expoPushToken, setExpoPushToken] = useState('')
  
  const [notification, setNotification] = useState(false)
  
  const notificationListener = useRef()
  
  const responseListener = useRef()

  const resetStartedTimer = () => {
    clearInterval(startedTimer)
    setStartedTimer(null)
    setIsStarted(false)
  }

  const runStartedTimer = () => {
    setIsStarted(true)
    const initialStartedTitle = `${startedTimerHoursTime}:${startedTimerMinutesTime}:${startedTimerSecondsTime}`
    setStartTimerTitle(initialStartedTitle)
    let lastStartedTimerTitle = `${startedTimerHoursTime}:${startedTimerMinutesTime}:${startedTimerSecondsTime}`
    setStartedTimer(
      setInterval(() => {
        const timeParts = lastStartedTimerTitle.split(timePartsSeparator)
        const rawHours = timeParts[0]
        const rawMinutes = timeParts[1]
        const rawSeconds = timeParts[2]
        let hours = Number(rawHours)
        let minutes = Number(rawMinutes)
        let seconds = Number(rawSeconds)
        if (minutes >= 0) {
          seconds = seconds + 1
        }
        const isToggleSecond = seconds == countSecondsInMinute
        if (isToggleSecond) {
          seconds = initialSeconds
          minutes = minutes + 1
          const isToggleHour = minutes == countMinutesInHour
          if (isToggleHour) {
            minutes = initialMinutes
            hours = hours + 1
          }
        }
        let updatedHoursText = hours.toString()
        const countHoursChars = updatedHoursText.length
        const isAddHoursPrefix = countHoursChars == 1
        if (isAddHoursPrefix) {
          updatedHoursText = oneCharPrefix + updatedHoursText
        }
        let updatedMinutesText = minutes.toString()
        const countMinutesChars = updatedMinutesText.length
        const isAddMinutesPrefix = countMinutesChars == 1
        if (isAddMinutesPrefix) {
          updatedMinutesText = oneCharPrefix + updatedMinutesText
        }
        let updatedSecondsText = seconds.toString()
        const countSecondsChars = updatedSecondsText.length
        const isAddSecondsPrefix = countSecondsChars === 1
        if (isAddSecondsPrefix) {
          updatedSecondsText = oneCharPrefix + updatedSecondsText
        }
        const currentTime = `${updatedHoursText}:${updatedMinutesText}:${updatedSecondsText}`
        setStartedTimerHoursTime(updatedHoursText)
        setStartedTimerMinutesTime(updatedMinutesText)
        setStartedTimerSecondsTime(updatedSecondsText)
        setStartTimerTitle(currentTime)
        lastStartedTimerTitle = currentTime
      
        let sqlStatement = `UPDATE indicators SET exercise_duration=\"${lastStartedTimerTitle}\" WHERE _id=1;`
        db.transaction(transaction => {
          transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
            
          })
        })

        const isTimerOver = false
        if (isTimerOver) {
          resetStartedTimer()
          return;
        }

      }, millisecondsInSecond)
    )
  }

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
            water: indicatorsItem[2],
            isExerciseEnabled: indicatorsItem[5],
            exerciseStartTime: indicatorsItem[6],
            exerciseType: indicatorsItem[7],
            exerciseDuration: indicatorsItem[8]
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
      const localIsExerciseEnabled = receiverdIndicators.isExerciseEnabled === 1 ? true : false
      setIsExerciseEnabled(localIsExerciseEnabled)
      const localExerciseStartTime = receiverdIndicators.exerciseStartTime
      setExerciseStartTime(localExerciseStartTime)
      const localExerciseType = receiverdIndicators.exerciseType
      setExerciseType(localExerciseType)
      const localExerciseDuration = receiverdIndicators.exerciseDuration
      setExerciseDuration(localExerciseDuration)
      if (isExerciseEnabled) {
        const exerciseDurationParts = exerciseDuration.split(':')
        setStartedTimerHoursTime(exerciseDurationParts[0])
        setStartedTimerMinutesTime(exerciseDurationParts[1])
        setStartedTimerSecondsTime(exerciseDurationParts[2])    
        // runStartedTimer()
      }
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

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  const [subscription, setSubscription] = useState(null)

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000)
  }

  const _fast = () => {
    Accelerometer.setUpdateInterval(16)
  }

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData)
      })
    )
  }

  const _unsubscribe = () => {
    subscription && subscription.remove()
    setSubscription(null)
  }

  const updateControllers = (index) => {
    const updatedControllers = controllers
    updatedControllers[index] = !updatedControllers[index]
    setControllers(updatedControllers)
  }

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${stepsCount} шагов`,
        body: (
          stepsCount === 0 ?
            'Нет данных о шагах за сегодня'
          :
            'Цель: 6000 шага (-ов)'
        ),
        data: { data: '' },
      },
      trigger: { seconds: 15 }
    })
  }
  
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
  }

  // registerForPushNotificationsAsync = async () => {
  //   if (Device.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  //     let finalStatus = existingStatus
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  //       finalStatus = status
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!')
  //       return
  //     }
  //     const token = await Notifications.getExpoPushTokenAsync()
  //     console.log(token)
  //     this.setState({ expoPushToken: token })
  //   } else {
  //     alert('Must use physical device for Push Notifications')
  //   }
  
  //   if (Platform.OS === 'android') {
  //     Notifications.createChannelAndroidAsync('default', {
  //       name: 'default',
  //       sound: true,
  //       priority: 'max',
  //       vibrate: [0, 250, 250, 250],
  //     })
  //   }
  // }

  async function registerForPushNotificationsAsync() {
    let token
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
      console.log(token)
    } else {
      alert('Must use physical device for Push Notifications')
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }
  
    return token
  }

  useEffect(() => {
    _subscribe()
    return () => _unsubscribe()
  }, [])

  const { x, y, z } = data
  const [isDetectStep, setIsDetectStep] = useState(false)
  const [stepsCount, setStepsCount] = useState(0)
  const [stepsCountProgress, setStepsCountProgress] = useState(0)
  const [isDebugMode, setDebugMode] = useState(false)
  const isXGt = x > 0
  const isXLess = x < 0
  const isFirstPhase = isXGt && isDetectStep
  const isSecondPhase = isXLess && !isDetectStep
  if (isFirstPhase) {
    const lastStepsCount = stepsCount
    const updatedStepsCount = lastStepsCount + 1
    setStepsCount(updatedStepsCount)
    setIsDetectStep(false)
    // loadedSize / this.currentFileSize * 100
    // setStepsCountProgress(Number.parseInt(updatedStepsCount / 6000))
    setStepsCountProgress(updatedStepsCount / 6000)
    // setStepsCountProgress(Number.parseInt(updatedStepsCount / 6000 * 100))
    // setStepsCountProgress(Number.parseInt(6000 - 6000 / updatedStepsCount))
    schedulePushNotification()
  } else if (isSecondPhase) {
    setIsDetectStep(true)
  }

  initialControllers = controllers

  useEffect(() => {
    
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token))

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }

  })

  return (
    <ScrollView style={styles.mainPageContainer}>
      {
        isDebugMode ?
          <>
           <Text>
              {
                `${x}`
              }
            </Text>
            <Text>
              {
                `${y}`
              }
            </Text>
            <Text>
              {
                `${z}`
              }
            </Text>
          </>
        :
          <Text>

          </Text>
      }
      {
        isDebugMode ?
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text>Title: {notification && notification.request.content.title} </Text>
              <Text>Body: {notification && notification.request.content.body}</Text>
              <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
              title="Press to schedule a notification"
              onPress={async () => {
                // await sendPushNotification()
                await schedulePushNotification()
              }}
            />
          </View>
        :
          <View>

          </View>
      }
      <Button onPress={() => {
        setIsSelectionMode(true)
      }} title="Управление элементами" />
      {
        isSelectionMode || (!isSelectionMode && controllers[0]) ?
          <View
            style={styles.mainPageContainerActiveBlock}
            onPress={() => goToActivity(navigation, 'ActiveActivity')}
          >
            {
              isSelectionMode ?
                <View style={styles.mainPageContainerBlockHeader}>
                  <AntDesign
                    name={
                      controllers[0] ?
                        'minuscircle'
                      :
                        'pluscircle'
                    }
                    size={24}
                    color={
                      controllers[0] ?
                        'red'
                      :
                        'green'
                    }
                    onPress={() => updateControllers(0)}
                  />
                </View>
              :
                <View>
                  
                </View>
            }
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
        :
          <View>

          </View>
      }
      {
        isSelectionMode || (!isSelectionMode && controllers[1]) ?
          <View style={styles.mainPageContainerWalkBlock} onPress={() => goToActivity(navigation, 'WalkActivity')}>
            {
              isSelectionMode ?
                <View style={styles.mainPageContainerBlockHeader}>
                  <AntDesign
                    name={
                      controllers[1] ?
                        'minuscircle'
                      :
                        'pluscircle'
                    }
                    size={24}
                    color={
                      controllers[1] ?
                        'red'
                      :
                        'green'
                    }
                    onPress={() => updateControllers(1)}
                  />
                </View>
              :
                <View>
                  
                </View>
            }
            <View style={styles.mainPageContainerWalkBlockBody}>
              <Text style={styles.mainPageContainerWalkBlockBodyLabel}>
                Шаги
              </Text>
              <View style={styles.mainPageContainerWalkBlockBodyRow}>
                <View style={styles.mainPageContainerWalkBlockBodyRowAside}>
                  <Text style={styles.mainPageContainerWalkBlockBodyRowCountLabel}>
                    {
                      stepsCount
                    }
                  </Text>
                  <Text style={styles.mainPageContainerWalkBlockBodyRowMaxCountLabel}>
                    /6000
                  </Text>
                </View>
                <View>
                  <Text>
                    {
                      Number.parseInt(stepsCountProgress * 100)
                    }%
                  </Text>
                  <ProgressBar
                    style={{width: 150}}
                    progress={stepsCountProgress}
                    color="#49B5F2"
                  />
                </View>
              </View>
            </View>
          </View>
        :
          <View>
            
          </View>
      }
      {
        isExerciseEnabled ?
          <TouchableOpacity
            style={styles.mainPageContainerExerciseStartedBlock}
            onPress={() => {
              resetStartedTimer()
              goToActivity(navigation, 'RecordStartedExerciseActivity', {
                exerciseType: exerciseType
              })
            }}
          >
            <View style={styles.mainPageContainerExerciseStartedBlockHeader}>
              <Text style={styles.mainPageContainerExerciseStartedBlockHeaderName}>
                {
                  exerciseType
                }
              </Text>
              <Text style={styles.mainPageContainerExerciseStartedBlockHeaderStartTime}>
                {
                  `Начало: ${exerciseStartTime}`
                }
              </Text>
            </View>    
            <Text style={styles.mainPageContainerExerciseStartedBlockTitle}>
              {
                startTimerTitle
              }
            </Text>
          </TouchableOpacity>
        :
          isSelectionMode || (!isSelectionMode && controllers[2]) ?
            <View
              style={styles.mainPageContainerExerciseBlock}
              onPress={() => goToActivity(navigation, 'ExerciseActivity')}
            >
              {
                isSelectionMode ?
                  <View style={styles.mainPageContainerBlockHeader}>
                    <AntDesign
                      name={
                        controllers[2] ?
                          'minuscircle'
                        :
                          'pluscircle'
                      }
                      size={24}
                      color={
                        controllers[2] ?
                          'red'
                        :
                          'green'
                      }
                      onPress={() => updateControllers(2)}
                    />
                  </View>
                :
                  <View>

                  </View>
              }
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
          :
            <View>
            </View>
      }
      {
        isSelectionMode || (!isSelectionMode && controllers[3]) ?
          <View
            style={styles.mainPageContainerFoodBlock}
            onPress={() => goToActivity(navigation, 'FoodActivity')}
          >
            {
              isSelectionMode ?
                <View style={styles.mainPageContainerBlockHeader}>
                  <AntDesign
                    name={
                      controllers[3] ?
                        'minuscircle'
                      :
                        'pluscircle'
                    }
                    size={24}
                    color={
                      controllers[3] ?
                        'red'
                      :
                        'green'
                    }
                    onPress={() => updateControllers(3)}
                  />
                </View>
              :
                <View>
                  
                </View>
            }
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
          </View>
        :
          <View>
            
          </View>
      }
      {
        isSelectionMode || (!isSelectionMode && controllers[4]) ?
          <View
            style={styles.mainPageContainerSleepBlock}
            onPress={() => goToActivity(navigation, 'SleepActivity')}
          >
            {
              isSelectionMode ?
                <View style={styles.mainPageContainerBlockHeader}>
                  <AntDesign
                    name={
                      controllers[4] ?
                        'minuscircle'
                      :
                        'pluscircle'
                    }
                    size={24}
                    color={
                      controllers[4] ?
                        'red'
                      :
                        'green'
                    }
                    onPress={() => updateControllers(4)}
                  />
                </View>
              :
                <View>

                </View>
            }
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
          </View>
        :
          <View>
            
          </View>
      }
      {
        isSelectionMode || (!isSelectionMode && controllers[5]) ?
          <View style={styles.mainPageContainerBodyBlock} onPress={() => goToActivity(navigation, 'BodyActivity')}>
            {
              isSelectionMode ?
                <View style={styles.mainPageContainerBlockHeader}>
                  <AntDesign
                    name={
                      controllers[5] ?
                        'minuscircle'
                      :
                        'pluscircle'
                    }
                    size={24}
                    color={
                      controllers[5] ?
                        'red'
                      :
                        'green'
                    }
                    onPress={() => updateControllers(5)}
                  />
                </View>
              :
                <View>
                  
                </View>
            }
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
          </View>
        :
          <View>
            
          </View>
      }
      {
        isSelectionMode || (!isSelectionMode && controllers[6]) ?
          <View
            style={styles.mainPageContainerWaterBlock}
            onPress={() => goToActivity(navigation, 'WaterActivity')}
          >
            {
              isSelectionMode ?
                <View style={styles.mainPageContainerBlockHeader}>
                  <AntDesign
                    name={
                      controllers[6] ?
                        'minuscircle'
                      :
                        'pluscircle'
                    }
                    size={24}
                    color={
                      controllers[6] ?
                        'red'
                      :
                        'green'
                    }
                    onPress={() => updateControllers(6)}
                  />
                </View>
              :
                <View>
                  
                </View>
            }
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
          </View>
        :
          <View>
            
          </View>
      }
      {
        isSelectionMode ?
          <View>
            <View>
              <Button
                title="Отмена"
                onPress={() => {
                  setIsSelectionMode(false)
                  setControllers(initialControllers)
                }}
              />
            </View>
            <View>
              <Button
                title="Сохранить"
                onPress={() => setIsSelectionMode(false)}
              />
            </View>
          </View>
        :
          <View>

          </View>
      }
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

export function MyPageActivity({ navigation }) {
  
  const userLogoImg = require('./assets/user_logo.png')
  
  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const [awards, setAwards] = useState([])

  const monthsLabels = {
    '1': 'янв',
    '2': 'февр.',
    '3': 'мар.',
    '4': 'апр.',
    '5': 'мая',
    '6': 'июн.',
    '7': 'июл.',
    '8': 'авг.',
    '9': 'сен.',
    '10': 'окт.',
    '11': 'ноя.',
    '12': 'дек.'
  }

  const getAwardDate = (desc) => {
    const awardDateAndTime = desc.split(' ')
    const awardDate = awardDateAndTime[0]
    const awardTime = awardDateAndTime[1]
    const awardDateParts = awardDate.split('.')
    const rawAwardDateDay = awardDateParts[0]
    const rawAwardDateMonth = awardDateParts[1]
    const awardDateMonth = monthsLabels[rawAwardDateMonth]
    const representationAwardDate = `${rawAwardDateDay} ${awardDateMonth}`
    return representationAwardDate
  }

  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM awards;"
    transaction.executeSql(sqlStatement, [], (tx, receivedAwards) => {
      let tempReceivedAwards = []
      Array.from(receivedAwards.rows).forEach((awardRow, awardRowIdx) => {
        const award = Object.values(receivedAwards.rows.item(awardRowIdx))
        tempReceivedAwards = [
          ...tempReceivedAwards,
          {
            id: award[0],
            name: award[1],
            description: award[2],
            type: award[3]
          }
        ]
      })
      setAwards(tempReceivedAwards)
    })
  })

  return (
    <ScrollView style={styles.myPageContainer}>
      <View style={styles.myPageContainerUserHeader}>
        <View style={styles.myPageContainerUserHeaderPhotoAndEditBtn}>
          <Image source={userLogoImg} style={styles.myPageContainerUserHeaderPhoto} />
          <View style={styles.myPageContainerUserHeaderEditBtnWrap}>
            <Button
              title="Изменить"
              onPress={() => {
                goToActivity(navigation, 'EditMyPageActivity')
              }}
            />
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
          <Ionicons
            name="chevron-forward"
            size={24}
            color="black"
            onPress={() => goToActivity(navigation, 'AwardsActivity')}
          />
        </View>
        <ScrollView style={styles.myPageContainerUserAwardsShortcuts} horizontal={true}>
          {
            awards.map((award, awardIndex) => {
              return (
                <TouchableOpacity
                  style={styles.myPageContainerUserAwardsShortcut}
                  onPress={() => {
                    goToActivity(navigation, 'AwardActivity', {
                      awardName: award.name,
                      awardDesc: award.description,
                      awardType: award.type
                    })
                  }}
                  key={awardIndex}
                >
                  <FontAwesome5 name="trophy" size={96} color="rgb(255, 255, 50)" />
                  <Text>
                    {
                      award.name
                    }
                  </Text>
                  <Text>
                    {
                      getAwardDate(award.description)
                    }
                  </Text>
                </TouchableOpacity>
              )
            })
          }
          {/* <View style={styles.myPageContainerUserAwardsShortcut}>
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
          </View> */}
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
  
  const testActivity = 'MainTabsActivity'
  
  // let sqlStatement = `DROP TABLE \"awards\";`
  // db.transaction(transaction => {
  //   transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
  //   })
  // })

  // let sqlStatement = `DROP TABLE \"indicators\";`
  // db.transaction(transaction => {
  //   transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
  //     let sqlStatement = `DROP TABLE \"controllers\";`
  //     db.transaction(transaction => {
  //       transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
  //       })
      // })
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
                        
                        sqlStatement = "SELECT * FROM indicators;"
                        transaction.executeSql(sqlStatement, [], (tx, receivedAlarms) => {
                          const indicators = Array.from(receivedAlarms.rows)
                          const countIndicators = indicators.length
                          const isPreInstall = countIndicators <= 0
                          if (isPreInstall) {
                            let sqlStatement = `INSERT INTO \"indicators\"(time, water, walk, food, is_exercise_enabled, exercise_start_time, exercise_type, exercise_duration, photo, name, gender, growth, weight, birthday, level) VALUES (\"\", 0, 0, 0, 0, \"\", \"\", \"\", \"\", \"\", \"\", 0.0, 0.0, \"\", \"\");`
                            db.transaction(transaction => {
                              transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
                              })
                            })
                          }
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
          sqlStatement = `DELETE FROM \"controllers\";`
          db.transaction(transaction => {
            transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
              let sqlStatement = `INSERT INTO \"controllers\"(is_activated, name) VALUES (true, \"active\");`
              db.transaction(transaction => {
                transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                  let sqlStatement = `INSERT INTO \"controllers\"(is_activated, name) VALUES (true, \"walk\");`
                  db.transaction(transaction => {
                    transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                      let sqlStatement = `INSERT INTO \"controllers\"(is_activated, name) VALUES (true, \"exercise\");`
                      db.transaction(transaction => {
                        transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                          let sqlStatement = `INSERT INTO \"controllers\"(is_activated, name) VALUES (true, \"food\");`
                          db.transaction(transaction => {
                            transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                              let sqlStatement = `INSERT INTO \"controllers\"(is_activated, name) VALUES (true, \"sleep\");`
                              db.transaction(transaction => {
                                transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                                  let sqlStatement = `INSERT INTO \"controllers\"(is_activated, name) VALUES (true, \"body\");`
                                  db.transaction(transaction => {
                                    transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                                      let sqlStatement = `INSERT INTO \"controllers\"(is_activated, name) VALUES (true, \"water\");`
                                      db.transaction(transaction => {
                                        transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {

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
                })
              })
            })
          })
          sqlStatement = `DELETE FROM \"measures\";`
          db.transaction(transaction => {
            transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
              let sqlStatement = `INSERT INTO \"measures\"(name, value) VALUES (\"Рост\", \"см\");`
              db.transaction(transaction => {
                transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                  let sqlStatement = `INSERT INTO \"measures\"(name, value) VALUES (\"Вес\", \"кг\");`
                  db.transaction(transaction => {
                    transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                      let sqlStatement = `INSERT INTO \"measures\"(name, value) VALUES (\"Температура\", \"°C\");`
                      db.transaction(transaction => {
                        transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                          let sqlStatement = `INSERT INTO \"measures\"(name, value) VALUES (\"Расстояние\", \"км\");`
                          db.transaction(transaction => {
                            transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                              let sqlStatement = `INSERT INTO \"measures\"(name, value) VALUES (\"Сахар крови\", \"ммоль/л\");`
                              db.transaction(transaction => {
                                transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                                  let sqlStatement = `INSERT INTO \"measures\"(name, value) VALUES (\"Кровянное давление\", \"мм рт. ст.\");`
                                  db.transaction(transaction => {
                                    transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                                      let sqlStatement = `INSERT INTO \"measures\"(name, value) VALUES (\"HbA1c\", \"%\");`
                                      db.transaction(transaction => {
                                        transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                                          let sqlStatement = `INSERT INTO \"measures\"(name, value) VALUES (\"Вода\", \"мл\");`
                                          db.transaction(transaction => {
                                            transaction.executeSql(sqlStatement, [], (tx, receivedControllers) => {
                                                
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
                    })
                  })   
                })
              })
            })
          })
        }
      })  
    })
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={testActivity}>
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
        <Stack.Screen
          name="EditMyPageActivity"
          component={EditMyPageActivity}
          options={{
            title: ''
          }}
        />
        <Stack.Screen
          name="SettingsActivity"
          component={SettingsActivity}
          options={{
            title: ''
          }}
        />
        <Stack.Screen
          name="SettingsGeneralMeasureActivity"
          component={SettingsGeneralMeasureActivity}
          options={{
            title: ''
          }}
        />
        <Stack.Screen
          name="SettingsPrivacyPhoneActivity"
          component={SettingsPrivacyPhoneActivity}
          options={{
            title: ''
          }}
        />
        <Stack.Screen
          name="AwardsActivity"
          component={AwardsActivity}
          options={{
            title: 'Значки'
          }}
        />
        <Stack.Screen
          name="AwardsCategoryActivity"
          component={AwardsCategoryActivity}
          options={{
            title: ''
          }}
        />
        <Stack.Screen
          name="AwardActivity"
          component={AwardActivity}
          options={{
            title: 'Награды',
            headerRight: () => <FontAwesome5 name="share-alt" size={24} color="black" />
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export function RecordSleepActivity({ navigation }) {

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [isShowDatePicker, setIsShowDatePicker] = useState(false)
  const monthsLabels = [
    'янв.',
    'февр.',
    'мар.',
    'апр.',
    'мая',
    'июн.',
    'июл.',
    'авг.',
    'сен.',
    'окт.',
    'ноя.',
    'дек.'
  ]

  const weeksLabels = [
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб',
    'вс'
  ]

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setIsShowDatePicker(Platform.OS === 'ios')
    setDate(currentDate)
  }

  const showMode = (currentMode) => {
    setIsShowDatePicker(true)
    setMode(currentMode)
  }

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
          <Button
            title={`${weeksLabels[date.getDay()]}, ${date.getDate()} ${monthsLabels[date.getMonth()]}`}
            onPress={() => setIsShowDatePicker(true)}
            style={styles.sleepActivityBodyDateBtn}
          />
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
      {isShowDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
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

  const startExercise = () => {
    db.transaction(transaction => {
      // let sqlStatement = `UPDATE indicators SET is_exercise_enabled=${true} WHERE _id=1;`
      // let sqlStatement = `UPDATE indicators SET is_exercise_enabled=${true}, exercise_type=\"${exerciseType}\" WHERE _id=1;`
      const currentDate = new Date()
      const currentDateDay = currentDate.getDate()
      const currentDateMonthIndex = currentDate.getMonth()
      const currentDateMonth = currentDateMonthIndex + 1
      const currentDateYear = currentDate.getFullYear()
      let currentDateHours = currentDate.getHours()
      if (currentDateHours < 10) {
        currentDateHours = `0${currentDateHours}`
      }
      const currentDateMinutes = currentDate.getMinutes()
      if (currentDateMinutes < 10) {
        currentDateHours = `0${currentDateMinutes}`
      }
      // const exerciseStartTime = `${currentDateDay}.${currentDateMonth}.${currentDateYear}`
      const exerciseStartTime = `${currentDateHours}:${currentDateMinutes}`
      let sqlStatement = `UPDATE indicators SET is_exercise_enabled=${true}, exercise_type=\"${exerciseType}\", exercise_start_time=\"${exerciseStartTime}\" WHERE _id=1;`
      transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
        goToActivity(navigation, 'RecordStartedExerciseActivity', {
          exerciseType: exerciseType
        })
      })
    })
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
      <View style={styles.recordExerciseActivityMapContainer}>
        <MapView style={styles.recordExerciseActivityMap} />
      </View>
      <View style={styles.recordExerciseActivityStartBtnWrap}>
        <Button
          title="Начать"
          onPress={() => startExercise()}
          style={styles.recordExerciseActivityStartBtn}
        />
      </View>
    </View>
  )
}

export function RecordStartedExerciseActivity({ navigation, route }) {
  
  const [isStarted, setIsStarted] = useState(true)
  
  const [startTimerTitle, setStartTimerTitle] = useState('00:00:00')

  const [startedTimer, setStartedTimer] = useState(null)
  
  const millisecondsInSecond = 1000

  const timePartsSeparator = ':'
  
  const initialSeconds = 0
  
  const initialMinutes = 0
  
  const countSecondsInMinute = 60
  
  const countMinutesInHour = 60
  
  const oneCharPrefix = 0

  const [startedTimerHoursTime, setStartedTimerHoursTime] = useState('00')

  const [startedTimerMinutesTime, setStartedTimerMinutesTime] = useState('00')

  const [startedTimerSecondsTime, setStartedTimerSecondsTime] = useState('00')

  const [exerciseRecords, setExerciseRecords] = useState([])

  const { exerciseType } = route.params

  const [exerciseStartTime, setExerciseStartTime] = useState(new Date())

  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const completeExercise = () => {

    const currentExerciseRecordDuration = startTimerTitle
    const currentExerciseRecordDurationParts = currentExerciseRecordDuration.split(':')
    const currentRawExerciseRecordDurationHours = currentExerciseRecordDurationParts[0]
    const currentRawExerciseRecordDurationMinutes = currentExerciseRecordDurationParts[1]
    const currentRawExerciseRecordDurationSeconds = currentExerciseRecordDurationParts[2]
    const currentExerciseRecordDurationHours = Number.parseInt(currentRawExerciseRecordDurationHours)
    const currentExerciseRecordDurationMinutes = Number.parseInt(currentRawExerciseRecordDurationMinutes)
    const currentExerciseRecordDurationSeconds = Number.parseInt(currentRawExerciseRecordDurationSeconds)
    const currentExerciseRecordDurationTotalSeconds = currentExerciseRecordDurationSeconds + (currentExerciseRecordDurationMinutes * 60) + (currentExerciseRecordDurationHours * 60 * 60)

    resetStartedTimer()
    
    const currentDate = new Date()
    const currentDateDay = currentDate.getDate()
    const currentDateMonthIndex = currentDate.getMonth()
    const currentDateMonth = currentDateMonthIndex + 1
    const currentDateYear = currentDate.getFullYear()
    let currentDateHours = currentDate.getHours()
    if (currentDateHours < 10) {
      currentDateHours = `0${currentDateHours}`
    }
    const currentDateMinutes = currentDate.getMinutes()
    if (currentDateMinutes < 10) {
      currentDateHours = `0${currentDateMinutes}`
    }
    const dateTime = `${currentDateDay}.${currentDateMonth}.${currentDateYear} ${currentDateHours}:${currentDateMinutes}`
    
    let sqlStatement = `INSERT INTO \"exercise_records\"(type, datetime, duration) VALUES (\"${exerciseType}\", \"${dateTime}\", \"${startTimerTitle}\");`
    db.transaction(transaction => {
      transaction.executeSql(sqlStatement, [], (tx, receivedItems) => {
        let sqlStatement = `UPDATE indicators SET is_exercise_enabled=${false} WHERE _id=1;`
        transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
          let cursorOfWins = 0
          for (let exerciseRecord of exerciseRecords) {
            const exerciseRecordDuration = exerciseRecord.duration
            const exerciseRecordDurationParts = exerciseRecordDuration.split(':')
            const rawExerciseRecordDurationHours = exerciseRecordDurationParts[0]
            const rawExerciseRecordDurationMinutes = exerciseRecordDurationParts[1]
            const rawExerciseRecordDurationSeconds = exerciseRecordDurationParts[2]
            const exerciseRecordDurationHours = Number.parseInt(rawExerciseRecordDurationHours)
            const exerciseRecordDurationMinutes = Number.parseInt(rawExerciseRecordDurationMinutes)
            const exerciseRecordDurationSeconds = Number.parseInt(rawExerciseRecordDurationSeconds)
            const exerciseRecordDurationTotalSeconds = exerciseRecordDurationSeconds + (exerciseRecordDurationMinutes * 60) + (exerciseRecordDurationHours * 60 * 60)
            const isDurationGt = currentExerciseRecordDurationTotalSeconds > exerciseRecordDurationTotalSeconds
            if (isDurationGt) {
              cursorOfWins++
            }
          }
          const isAddDurationAward = cursorOfWins >= exerciseRecords.length
          console.log(`isAddDurationAward: ${isAddDurationAward}, cursorOfWins: ${cursorOfWins}, exerciseRecords.length: ${exerciseRecords.length}`)
          let exerciseStartTimeHours = exerciseStartTime.getHours()
          if (exerciseStartTimeHours < 10) {
            exerciseStartTimeHours = `0${exerciseStartTimeHours}`
          }
          let exerciseStartTimeMinutes = exerciseStartTime.getMinutes()
          if (exerciseStartTimeMinutes < 10) {
            exerciseStartTimeMinutes = `0${exerciseStartTimeMinutes}`
          }
          if (isAddDurationAward) {
            let sqlStatement = `INSERT INTO \"awards\"(name, description, type) VALUES (\"Самая большая длительность\", \"${dateTime}\", \"${exerciseType}\");`
            db.transaction(transaction => {
              transaction.executeSql(sqlStatement, [], (tx, receivedItems) => {
                goToActivity(navigation, 'RecordExerciseResultsActivity', {
                  exerciseType: `${exerciseType}`,
                  exerciseDate: `${currentDateDay}.${currentDateMonth - 1}.${currentDateYear}`,
                  exerciseStartTime: `${exerciseStartTimeHours}:${exerciseStartTimeMinutes}`,
                  exerciseEndTime: `${currentDateHours}:${currentDateMinutes}`,
                  exerciseDuration: `${startTimerTitle}`
                })
              })
            })
          } else {
            goToActivity(navigation, 'RecordExerciseResultsActivity', {
              exerciseType: `${exerciseType}`,
              exerciseDate: `${currentDateDay}.${currentDateMonth - 1}.${currentDateYear}`,
              exerciseStartTime: `${exerciseStartTimeHours}:${exerciseStartTimeMinutes}`,
              exerciseEndTime: `${currentDateHours}:${currentDateMinutes}`,
              exerciseDuration: `${startTimerTitle}`
            })
          }
          // goToActivity(navigation, 'RecordExerciseResultsActivity')
        })
      }, (tx) => {
        console.log('ошибка добавления записи')
      })
    })
  }

  const runStartedTimer = () => {
    setIsStarted(true)
    const initialStartedTitle = `${startedTimerHoursTime}:${startedTimerMinutesTime}:${startedTimerSecondsTime}`
    setStartTimerTitle(initialStartedTitle)
    let lastStartedTimerTitle = `${startedTimerHoursTime}:${startedTimerMinutesTime}:${startedTimerSecondsTime}`
    setStartedTimer(
      setInterval(() => {
        const timeParts = lastStartedTimerTitle.split(timePartsSeparator)
        const rawHours = timeParts[0]
        const rawMinutes = timeParts[1]
        const rawSeconds = timeParts[2]
        let hours = Number(rawHours)
        let minutes = Number(rawMinutes)
        let seconds = Number(rawSeconds)
        if (minutes >= 0) {
          seconds = seconds + 1
        }
        const isToggleSecond = seconds == countSecondsInMinute
        if (isToggleSecond) {
          seconds = initialSeconds
          minutes = minutes + 1
          const isToggleHour = minutes == countMinutesInHour
          if (isToggleHour) {
            minutes = initialMinutes
            hours = hours + 1
          }
        }
        let updatedHoursText = hours.toString()
        const countHoursChars = updatedHoursText.length
        const isAddHoursPrefix = countHoursChars == 1
        if (isAddHoursPrefix) {
          updatedHoursText = oneCharPrefix + updatedHoursText
        }
        let updatedMinutesText = minutes.toString()
        const countMinutesChars = updatedMinutesText.length
        const isAddMinutesPrefix = countMinutesChars == 1
        if (isAddMinutesPrefix) {
          updatedMinutesText = oneCharPrefix + updatedMinutesText
        }
        let updatedSecondsText = seconds.toString()
        const countSecondsChars = updatedSecondsText.length
        const isAddSecondsPrefix = countSecondsChars === 1
        if (isAddSecondsPrefix) {
          updatedSecondsText = oneCharPrefix + updatedSecondsText
        }
        const currentTime = `${updatedHoursText}:${updatedMinutesText}:${updatedSecondsText}`
        setStartedTimerHoursTime(updatedHoursText)
        setStartedTimerMinutesTime(updatedMinutesText)
        setStartedTimerSecondsTime(updatedSecondsText)
        setStartTimerTitle(currentTime)
        lastStartedTimerTitle = currentTime
    
        let sqlStatement = `UPDATE indicators SET exercise_duration=\"${lastStartedTimerTitle}\" WHERE _id=1;`
        db.transaction(transaction => {
          transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
            
          })
        })

        const isTimerOver = false
        if (isTimerOver) {
          resetStartedTimer()
          return;
        }

      }, millisecondsInSecond)
    )
  }

  useEffect(() => {
    runStartedTimer()
  }, [])

  const resetStartedTimer = () => {
    clearInterval(startedTimer)
    setStartedTimer(null)
    setIsStarted(false)
  }

  const getStartedTimerColorLabel = () => {
    return isStarted ?
      'rgb(0, 0, 0)'
    :
      'rgb(175, 175, 175)'
  }

  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM exercise_records;"
    transaction.executeSql(sqlStatement, [], (tx, receivedExerciseRecords) => {
      let tempReceivedExerciseRecords = []
      Array.from(receivedExerciseRecords.rows).forEach((exerciseRecordRow, exerciseRecordRowIdx) => {
        const exerciseRecord = Object.values(receivedExerciseRecords.rows.item(exerciseRecordRowIdx))
        tempReceivedExerciseRecords = [
          ...tempReceivedExerciseRecords,
          {
            id: exerciseRecord[0],
            duration: exerciseRecord[3]
          }
        ]
      })
      setExerciseRecords(tempReceivedExerciseRecords)
    })
  })

  return (
    <View style={styles.recordStartedExerciseActivityContainer}>
      <View style={styles.recordStartedExerciseActivityHeader}>
      </View>
      <View style={styles.recordStartedExerciseActivityBody}>
        <View style={styles.recordStartedExerciseActivityBodyDestination}>
          <Text style={styles.recordStartedExerciseActivityBodyDestinationHeader}>
            Оставшееся расстояние
          </Text>
          <View style={styles.recordStartedExerciseActivityBodyDestinationRow}>
            <Text style={styles.recordStartedExerciseActivityBodyDestinationRowContent}>
              10,0
            </Text>
            <Text style={styles.recordStartedExerciseActivityBodyDestinationRowMeasure}>
              км
            </Text>
          </View>
        </View>
        <View style={styles.recordStartedExerciseActivityBodyRow}>
          <View style={styles.recordStartedExerciseActivityBodyRowItem}>
            <Text
              style={styles.recordStartedExerciseActivityBodyRowItemHeader}
            >
              Длительность
            </Text>
            <Text
              style={
                [
                  styles.recordStartedExerciseActivityBodyRowItemContent,
                  {
                    color: getStartedTimerColorLabel()
                  }
                ]
              }
            >
              {
                startTimerTitle
              }
            </Text>
          </View>
          <View style={styles.recordStartedExerciseActivityBodyRowItem}>
            <Text style={styles.recordStartedExerciseActivityBodyRowItemHeader}>
              Скорость
            </Text>
            <Text
              style={
                [
                  styles.recordStartedExerciseActivityBodyRowItemContent,
                  {
                    color: getStartedTimerColorLabel()
                  }
                ]
              }
            >
              -- км/ч
            </Text>
          </View>
        </View>
        <View style={styles.recordStartedExerciseActivityBodyRow}>
          <View style={styles.recordStartedExerciseActivityBodyRowItem}>
            <Text style={styles.recordStartedExerciseActivityBodyRowItemHeader}>
              Темп
            </Text>
            <Text
              style={
                [
                  styles.recordStartedExerciseActivityBodyRowItemContent,
                  {
                    color: getStartedTimerColorLabel()
                  }
                ]
              }
            >
              -- /км
            </Text>
          </View>
          <View style={styles.recordStartedExerciseActivityBodyRowItem}>
            <Text style={styles.recordStartedExerciseActivityBodyRowItemHeader}>
              Подъем
            </Text>
            <Text
              style={
                [
                  styles.recordStartedExerciseActivityBodyRowItemContent,
                  {
                    color: getStartedTimerColorLabel()
                  }
                ]
              }
            >
              -- м
            </Text>
          </View>
        </View>
        <View style={styles.recordStartedExerciseActivityBodyRow}>
          <View style={styles.recordStartedExerciseActivityBodyRowItem}>
            <Text style={styles.recordStartedExerciseActivityBodyRowItemHeader}>
              Калории
            </Text>
            <Text
              style={
                [
                  styles.recordStartedExerciseActivityBodyRowItemContent,
                  {
                    color: getStartedTimerColorLabel()
                  }
                ]
              }
            >
              0 ккал
            </Text>
          </View>
          <View style={styles.recordStartedExerciseActivityBodyRowItem}>
            <Text style={styles.recordStartedExerciseActivityBodyRowItemHeader}>
              Расстояние
            </Text>
            <Text
              style={
                [
                  styles.recordStartedExerciseActivityBodyRowItemContent,
                  {
                    color: getStartedTimerColorLabel()
                  }
                ]
              }
            >
              0,0 км
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.recordStartedExerciseActivityFooter}>
        {
          isStarted ?
            (
              <View style={styles.recordStartedExerciseActivityFooterBtnsContainer}>
                <FontAwesome name="lock" size={24} color="black" />
                <View style={styles.recordStartedExerciseActivityFooterPauseBtnWrap}>
                  <Button
                    style={styles.recordStartedExerciseActivityFooterPauseBtn}
                    title="Пауза"
                    color="rgb(175, 175, 175)"
                    onPress={() => resetStartedTimer()}
                  />
                </View>
              </View>
            )
          :
          (
            <View style={styles.recordStartedExerciseActivityFooterBtnsContainer}>
              <View style={styles.recordStartedExerciseActivityFooterResumeBtnWrap}>
                <Button
                  style={styles.recordStartedExerciseActivityFooterResumeBtn}
                  title="Продолжить"
                  color="rgb(175, 175, 175)"
                  onPress={() => runStartedTimer()}
                />  
              </View>
              <View style={styles.recordStartedExerciseActivityFooterCompleteBtnWrap}>
                <Button
                  style={styles.recordStartedExerciseActivityFooterCompleteBtn}
                  title="Завершить"
                  color="rgb(0, 150, 0)"
                  onPress={() => completeExercise()}
                />  
              </View>
            </View>
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
  
  const { exerciseType, exerciseDate, exerciseStartTime, exerciseEndTime, exerciseDuration } = route.params
  
  const monthsLabels = [
    'янв.',
    'февр.',
    'мар.',
    'апр.',
    'мая',
    'июн.',
    'июл.',
    'авг.',
    'сен.',
    'окт.',
    'ноя.',
    'дек.'
  ]

  const weeksLabels = [
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб',
    'вс'
  ]

  const getRepresentationeDate = (date) => {
    const exerciseDateParts = date.split('.')
    const rawExerciseDateDay = exerciseDateParts[0]
    const rawExerciseDateMonth = exerciseDateParts[1]
    const exerciseDateMonth = monthsLabels[rawExerciseDateMonth]
    const representationExerciseDate = `${rawExerciseDateDay} ${exerciseDateMonth}`
    return representationExerciseDate
  }

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
            {
              exerciseType
            }
          </Text>
        </View>
        <View style={styles.recordExerciseResultsActivityHeaderBtns}>
          <FontAwesome5 name="share-alt" size={24} color="black" />
          <Feather name="more-vertical" size={24} color="black" />
        </View>
      </View>
      <Text style={styles.recordExerciseResultsActivityDateLabel}>
        {
          `${getRepresentationeDate(exerciseDate)}`
        }
      </Text>
      <Text style={styles.recordExerciseResultsActivityTimeLabel}>
        {
          `${exerciseStartTime} - ${exerciseEndTime}`
        }
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
              {
                exerciseDuration
              }
            </Text>
          </View>
          <View style={styles.recordExerciseResultsActivityDetailsRowItem}>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemHeader}>
              Время тренировки
            </Text>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemContent}>
              {
                exerciseDuration
              }
            </Text>
          </View>
        </View>
        <View style={styles.recordExerciseResultsActivityDetailsRow}>
          <View style={styles.recordExerciseResultsActivityDetailsRowItem}>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemHeader}>
              Время тренировки
            </Text>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemContent}>
              {
                exerciseDuration
              }
            </Text>
          </View>
          <View style={styles.recordExerciseResultsActivityDetailsRowItem}>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemHeader}>
              Время тренировки
            </Text>
            <Text style={styles.recordExerciseResultsActivityDetailsRowItemContent}>
              {
                exerciseDuration
              }
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

export function EditMyPageActivity({ navigation }) {
  
  const userLogoImg = require('./assets/user_logo.png')

  const [nickName, setNickName] = useState('')

  const [isGenderDialogVisible, setIsGenderDialogVisible] = useState(false)

  const [isGrowthDialogVisible, setIsGrowthDialogVisible] = useState(false)

  const [isWeightDialogVisible, setIsWeightDialogVisible] = useState(false)

  const [gender, setGender] = useState('')

  const [growth, setGrowth] = useState('')

  const [weight, setWeight] = useState('')

  const [activityLevel, setActivityLevel] = useState('')

  const [indicators, setIndicators] = useState([])

  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const openCamera = () => {
    
  }

  const openGallery = () => {
    
  }

  const saveData = () => {
    db.transaction(transaction => {
      // let sqlStatement = `UPDATE indicators SET gender=${gender}, growth=${growth}, weight=${weight}, level=${activityLevel} WHERE _id=1;`
      let sqlStatement = `UPDATE indicators SET level=\"${activityLevel}\" WHERE _id=1;`
      transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
        goToActivity(navigation, 'MainTabsActivity')
      })
    })
  }

  const getSelectedActivityStyle = (level) => {
    if (level === activityLevel) {
      return {
        backgroundColor: 'rgb(0, 150, 0)'
      }
    }
    return {}
  }

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
            water: indicatorsItem[2],
            isExerciseEnabled: indicatorsItem[5],
            exerciseStartTime: indicatorsItem[6],
            exerciseType: indicatorsItem[7],
            exerciseDuration: indicatorsItem[8]
          }
        ]
      })
      setIndicators(tempReceivedIndicators)
    })
  })

  useEffect(() => {
    const countIndicators = indicators.length
    const isIndicatorsExists = countIndicators >= 1
    console.log(`isIndicatorsExists: ${isIndicatorsExists}`)
    if (isIndicatorsExists) {
      const receiverdIndicators = indicators[0]
      const localActivityLevel = receiverdIndicators.level
      setActivityLevel(localActivityLevel)
    }
  })

  return (
    <View style={styles.editMyPageActivityContainer}>
      <Image
        source={userLogoImg}
        style={styles.editMyPageActivityAvatar}
      />
      <View style={styles.editMyPageActivityAvatarShortcuts}>
        <Image
          source={userLogoImg}
          style={styles.editMyPageActivityAvatarShortcut}
        />
        <Image
          source={userLogoImg}
          style={styles.editMyPageActivityAvatarShortcut}
        />
        <Image
          source={userLogoImg}
          style={styles.editMyPageActivityAvatarShortcut}
        />
        <Image
          source={userLogoImg}
          style={styles.editMyPageActivityAvatarShortcut}
        />
        <Image
          source={userLogoImg}
          style={styles.editMyPageActivityAvatarShortcut}
        />
      </View>
      <View style={styles.editMyPageActivityAvatarBtns}>
        <View style={styles.editMyPageActivityAvatarGalleryBtnWrap}>
          <Button
            title="Камера"
            onPress={() => openCamera()}
            style={styles.editMyPageActivityAvatarGalleryBtn}
          />
        </View>
        <View style={styles.editMyPageActivityAvatarCameraBtnWrap}>
          <Button
            title="Галлерея"
            onPress={() => openGallery()}
            style={styles.editMyPageActivityAvatarCameraBtn}
          />
        </View>
      </View>
      <View style={styles.editMyPageActivityNickName}>
        <Text style={styles.editMyPageActivityNickNameLabel}>
          Псевдоним
        </Text>
        <TextInput
          value={nickName}
          onChangeText={text => setNickName(text)}
          style={styles.editMyPageActivityNickNameInput}
        />
      </View>
      <View style={styles.editMyPageActivityData}>
        <TouchableOpacity
          style={styles.editMyPageActivityDataItem}
          onPress={() => setIsGenderDialogVisible(true)}
        >
          <FontAwesome name="user" size={24} color="black" />
          <Text style={styles.editMyPageActivityDataItemLabel}>
            Пол
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editMyPageActivityDataItem}
          onPress={() => {
            setIsGrowthDialogVisible(true)
            setGrowth('0.0')
          }}
        >
          <Ionicons name="body" size={24} color="black" />
          <Text style={styles.editMyPageActivityDataItemLabel}>
            Рост
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editMyPageActivityDataItem}
          onPress={() => {
            setIsWeightDialogVisible(true)
            setWeight('0.0')
          }}
        >
          <Entypo name="home" size={24} color="green" />
          <Text style={styles.editMyPageActivityDataItemLabel}>
            74,2 кг
          </Text>
        </TouchableOpacity>
        <View style={styles.editMyPageActivityDataItem}>
          <FontAwesome name="birthday-cake" size={24} color="black" />
          <Text style={styles.editMyPageActivityDataItemLabel}>
            22 нояб. 2000 г.
          </Text>
        </View>
      </View>
      <Text style={styles.editMyPageActivityHelp}>
        {
          'Данные про пол, рост, вес и дату рождения\nиспользуются для расчета количества сожженных\n каллорий, оптимального потребления каллорий и\nдиапазона частоты пульса во время тренировки.\nВы можете не предоставлять эту информацию, но в этом случае рекомендации по здоровью будут менее\nточными.'
        }
      </Text>
      <View style={styles.editMyPageActivityActive}>
        <Text style={styles.editMyPageActivityActiveHeader}>
          Уровень активности
        </Text>
        <View style={styles.editMyPageActivityActivities}>
          <TouchableOpacity
            style={styles.editMyPageActivityActivitiesItem}
            onPress={() => setActivityLevel('Сидячий образ жизни')}  
          >
            <View
              style={
                [
                  styles.editMyPageActivityActivitiesItemIcon,
                  getSelectedActivityStyle('Сидячий образ жизни')
                ]
              }
            >
              <MaterialCommunityIcons
                name="human-handsdown"
                size={48}
                color={
                  activityLevel === 'Сидячий образ жизни' ?
                    'rgb(255, 255, 255)'
                  :
                    'rgb(175, 175, 175)'
                }
              />
            </View>
            <Text>
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editMyPageActivityActivitiesItem}
            onPress={() => setActivityLevel('Несущественная активность')}  
          >
            <View
              style={
                [
                  styles.editMyPageActivityActivitiesItemIcon,
                  getSelectedActivityStyle('Несущественная активность')
                ]
              }
            >
              <FontAwesome5
                name="walking"
                size={48}
                color={
                  activityLevel === 'Несущественная активность' ?
                    'rgb(255, 255, 255)'
                  :
                    'rgb(175, 175, 175)'
                }
              />
            </View>
            <Text>
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editMyPageActivityActivitiesItem}
            onPress={() => setActivityLevel('Активный')}  
          >
            <View style={styles.editMyPageActivityActivitiesItemIcon}>
              <MaterialCommunityIcons
                name="human-handsdown"
                size={48}
                color={
                  activityLevel === 'Активный' ?
                    'rgb(255, 255, 255)'
                  :
                    'rgb(175, 175, 175)'
                }
              />
            </View>
            <Text>
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editMyPageActivityActivitiesItem}
            onPress={() => setActivityLevel('Большая активность')}  
          >
            <View style={styles.editMyPageActivityActivitiesItemIcon}>
              <FontAwesome5
                name="running"
                size={48}
                color={
                  activityLevel === 'Большая активность' ?
                    'rgb(255, 255, 255)'
                  :
                    'rgb(175, 175, 175)'
                }
              />
            </View>
            <Text>
              1
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.editMyPageActivityActiveName}>
          Сидячий образ жизни
        </Text>
        <Text style={styles.editMyPageActivityActiveDesc}>
          Обычные ежедневные нагрузки
        </Text>
      </View>
      <View style={styles.editMyPageActivityFooter}>
        <View style={styles.editMyPageActivityFooterCancelBtnWrap}>
          <Button
            title="Отмена"
            onPress={() => goToActivity(navigation, 'MainTabsActivity')}
            style={styles.editMyPageActivityFooterCancelBtn}
          />
        </View>
        <View style={styles.editMyPageActivityFooterSaveBtnWrap}>
          <Button
            title="Сохранить"
            onPress={() => saveData()}
            style={styles.editMyPageActivityFooterSaveBtn}
          />
        </View>
      </View>
      <Dialog
        visible={isGenderDialogVisible}
        onDismiss={() => setIsGenderDialogVisible(false)}
      >
        <Dialog.Title>Выбор пола</Dialog.Title>
        <Dialog.Content>
          <View style={styles.foodActivityRecordFoodType}>
            <RadioButton
              value="Женский"
              label="Женский"
              status={gender.checked === 'Женский' ? 'checked' : 'unchecked'}
              onPress={() => { setGender({ checked: 'Женский' }) }}
            />
            <Text style={styles.foodActivityRecordFoodTypeLabel}>Женский</Text>  
          </View>
          <View style={styles.foodActivityRecordFoodType}>
            <RadioButton
              value="Мужской"
              label="Мужской"
              status={gender.checked === 'Мужской' ? 'checked' : 'unchecked'}
              onPress={() => { setGender({ checked: 'Мужской' }) }}
            />
            <Text style={styles.foodActivityRecordFoodTypeLabel}>Мужской</Text>  
          </View>
          <View style={styles.foodActivityRecordFoodType}>
            <RadioButton
              value="Другое"
              label="Другое"
              status={gender.checked === 'Другое' ? 'checked' : 'unchecked'}
              onPress={() => { setGender({ checked: 'Другое' }) }}
            />
            <Text style={styles.foodActivityRecordFoodTypeLabel}>Другое</Text>  
          </View>
          <View style={styles.foodActivityRecordFoodType}>
            <RadioButton
              value="Не хочу указывать"
              label="Не хочу указывать"
              status={gender.checked === 'Не хочу указывать' ? 'checked' : 'unchecked'}
              onPress={() => { setGender({ checked: 'Не хочу указывать' }) }}
            />
            <Text style={styles.foodActivityRecordFoodTypeLabel}>Не хочу указывать</Text>  
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button title="Отмена" onPress={() => setIsGenderDialogVisible(false)} />
          <Button disabled={gender === ''} title="Готово" onPress={() => setIsGenderDialogVisible(false)} />
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={isGrowthDialogVisible}
        onDismiss={() => setIsGrowthDialogVisible(false)}
      >
        <Dialog.Title>Рост</Dialog.Title>
        <Dialog.Content>
          
        </Dialog.Content>
        <Dialog.Actions>
          <Button title="Отмена" onPress={() => setIsGrowthDialogVisible(false)} />
          <Button title="Готово" onPress={() => setIsGrowthDialogVisible(false)} />
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={isWeightDialogVisible}
        onDismiss={() => setIsWeightDialogVisible(false)}
      >
        <Dialog.Title>Вес</Dialog.Title>
        <Dialog.Content>
          
        </Dialog.Content>
        <Dialog.Actions>
          <Button title="Отмена" onPress={() => setIsWeightDialogVisible(false)} />
          <Button title="Готово" onPress={() => setIsWeightDialogVisible(false)} />
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

export function AwardsActivity({ navigation }) {
  
  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const [isAwardExerciseExists, setIsAwardExerciseExists] = useState(false)

  const [awards, setAwards] = useState([])

  const monthsLabels = {
    '1': 'янв',
    '2': 'февр.',
    '3': 'мар.',
    '4': 'апр.',
    '5': 'мая',
    '6': 'июн.',
    '7': 'июл.',
    '8': 'авг.',
    '9': 'сен.',
    '10': 'окт.',
    '11': 'ноя.',
    '12': 'дек.'
  }

  const getAwardDate = (desc) => {
    const awardDateAndTime = desc.split(' ')
    const awardDate = awardDateAndTime[0]
    const awardTime = awardDateAndTime[1]
    const awardDateParts = awardDate.split('.')
    const rawAwardDateDay = awardDateParts[0]
    const rawAwardDateMonth = awardDateParts[1]
    const awardDateMonth = monthsLabels[rawAwardDateMonth]
    const representationAwardDate = `${rawAwardDateDay} ${awardDateMonth}`
    return representationAwardDate
  }

  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM awards;"
    transaction.executeSql(sqlStatement, [], (tx, receivedAwards) => {
      let tempReceivedAwards = []
      Array.from(receivedAwards.rows).forEach((awardRow, awardRowIdx) => {
        const award = Object.values(receivedAwards.rows.item(awardRowIdx))
        if (award[3] === 'Плавание' || award[3] === 'Велоспорт' || award[3] === 'Поход' || award[3] === 'Йога' || award[3] === 'Ходьба' || award[3] === 'Бег') {
          setIsAwardExerciseExists(true)
        }
        tempReceivedAwards = [
          ...tempReceivedAwards,
          {
            id: award[0],
            name: award[1],
            description: award[2],
            type: award[3]
          }
        ]
      })
      setAwards(tempReceivedAwards)
    })
  })
  
  return (
    <ScrollView style={styles.awardsActivityContainer}>
      <View style={styles.awardsActivityItem}>
        <Text style={styles.awardsActivityItemHeader}>
          Шаги
        </Text>
        <View style={styles.awardsActivityItemRow}>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="rgb(255, 255, 50)"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              Цель достигнута
            </Text>
          </View>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="rgb(255, 255, 50)"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              {
                'Наибольшее колич.\nшагов'
              }
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.awardsActivityItem}>
        <Text style={styles.awardsActivityItemHeader}>
          Пища
        </Text>
        <View style={styles.awardsActivityItemRow}>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="rgb(255, 255, 50)"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              Цель достигнута
            </Text>
          </View>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="transparent"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              {
                ''
              }
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.awardsActivityItem}>
        <Text style={styles.awardsActivityItemHeader}>
          Программы
        </Text>
        <View style={styles.awardsActivityItemRow}>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="rgb(255, 255, 50)"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              Идеально
            </Text>
          </View>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="rgb(255, 255, 50)"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              Отличная работа
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.awardsActivityItem}>
        <Text style={styles.awardsActivityItemHeader}>
          Упражнение
        </Text>
        <View style={styles.awardsActivityItemRow}>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="rgb(255, 255, 50)"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              Общее расстояние
            </Text>
          </View>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="rgb(255, 255, 50)"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              Общее расстояние
            </Text>
          </View>
        </View>
        <View style={styles.awardsActivityItemRow}>
          {
            isAwardExerciseExists ?
              <TouchableOpacity
                style={styles.awardsActivityItemRowElement}
                onPress={() => goToActivity(navigation, 'AwardsCategoryActivity', {
                  category: 'Упражнение'
                })}
              >
                <FontAwesome5
                  name="trophy"
                  size={96}
                  color="rgb(255, 255, 50)"
                />
                <Text style={styles.awardsActivityItemRowElementLabel}>
                  Записи
                </Text>
                <Text style={styles.awardsActivityItemRowElementLabel}>
                  6 значков
                </Text>
                <Text style={styles.awardsActivityItemRowElementLabel}>
                  сегодня
                </Text>
              </TouchableOpacity>
            :
            <View style={styles.awardsActivityItemRowElement}>
              <FontAwesome5
                name="trophy"
                size={96}
                color="rgb(255, 255, 50)"
              />
              <Text style={styles.awardsActivityItemRowElementLabel}>
                Записи
              </Text>
            </View>
          }
          <View style={styles.awardsActivityItemRowElement}>
              
          </View>
        </View>
      </View>
      <View style={styles.awardsActivityItem}>
        <Text style={styles.awardsActivityItemHeader}>
          Сон
        </Text>
        <View style={styles.awardsActivityItemRow}>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="rgb(255, 255, 50)"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              {
                'Хорошее соблюдение\nрежима'
              }
            </Text>
          </View>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="rgb(255, 255, 50)"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              Пробуждение: вовремя
            </Text>
          </View>
        </View>
        <View style={styles.awardsActivityItemRow}>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="rgb(255, 255, 50)"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              Отход ко сну: вовремя
            </Text>
          </View>
          <View style={styles.awardsActivityItemRowElement}>
            <FontAwesome5
              name="trophy"
              size={96}
              color="rgb(255, 255, 50)"
            />
            <Text style={styles.awardsActivityItemRowElementLabel}>
              {
                'Наибольшее колич.\nшагов'
              }
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export function AwardsCategoryActivity({ navigation, route }) {
  
  const { category } = route.params
  
  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const [awards, setAwards] = useState([])

  const monthsLabels = {
    '1': 'янв',
    '2': 'февр.',
    '3': 'мар.',
    '4': 'апр.',
    '5': 'мая',
    '6': 'июн.',
    '7': 'июл.',
    '8': 'авг.',
    '9': 'сен.',
    '10': 'окт.',
    '11': 'ноя.',
    '12': 'дек.'
  }

  const getAwardDate = (desc) => {
    const awardDateAndTime = desc.split(' ')
    const awardDate = awardDateAndTime[0]
    const awardTime = awardDateAndTime[1]
    const awardDateParts = awardDate.split('.')
    const rawAwardDateDay = awardDateParts[0]
    const rawAwardDateMonth = awardDateParts[1]
    const awardDateMonth = monthsLabels[rawAwardDateMonth]
    const representationAwardDate = `${rawAwardDateDay} ${awardDateMonth}`
    return representationAwardDate
  }

  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM awards;"
    transaction.executeSql(sqlStatement, [], (tx, receivedAwards) => {
      let tempReceivedAwards = []
      Array.from(receivedAwards.rows).forEach((awardRow, awardRowIdx) => {
        const award = Object.values(receivedAwards.rows.item(awardRowIdx))
        tempReceivedAwards = [
          ...tempReceivedAwards,
          {
            id: award[0],
            name: award[1],
            description: award[2],
            type: award[3]
          }
        ]
      })
      setAwards(tempReceivedAwards)
    })
  })

  return (
    <ScrollView style={styles.awardsActivityContainer}>
      <View style={styles.awardsActivityItem}>
        <Text style={styles.awardsActivityItemHeader}>
          {
            category
          }
        </Text>
        <View style={styles.awardsActivityItemRow}>
          {
            awards.map((award, awardIndex) => {
              if (category === 'Упражнение' && award.type === 'Велоспорт' || award.type === 'Ходьба' || award.type === 'Бег' || award.type === 'Йога' || award.type === 'Плавание' || award.type === 'Поход') {
                return (
                  <TouchableOpacity
                    style={
                      [
                        styles.awardsActivityItemRowElement,
                        styles.awardsCategoryActivityElement
                      ]
                    }
                    key={awardIndex}
                    onPress={() => goToActivity(navigation, 'AwardActivity', {
                      awardName: award.name,
                      awardDesc: award.description,
                      awardType: award.type
                    })}
                  >
                    <FontAwesome5
                      name="trophy"
                      size={96}
                      color="rgb(255, 255, 50)"
                    />
                    <Text style={styles.awardsActivityItemRowElementLabel}>
                      {
                        award.name
                      }
                    </Text>
                    <Text style={styles.awardsActivityItemRowElementLabel}>
                      {
                        award.description.split(' ')[1]
                      }
                    </Text>
                    <Text style={styles.awardsActivityItemRowElementLabel}>
                      {
                        award.description.split(' ')[0]
                      }
                    </Text>
                  </TouchableOpacity>
                )
              }
            })
          }
        </View>
      </View>
    </ScrollView>
  )
}

export function AwardActivity({ route }) {
  
  const { awardName, awardDesc, awardType } = route.params
  
  return (
    <View style={styles.awardActivityContainer}>
      <View style={styles.awardActivityCalendar}>
        <Entypo
          name="chevron-left"
          size={24}
          color="black"
          onPress={() => {

          }}
        />
        <Text>
          {
            awardDesc.split(' ')[0]
          }
        </Text>
        <Ionicons
          name="chevron-forward"
          size={24}
          color="black"
          onPress={() => {
            
          }}
        />
      </View>
      <Text style={styles.awardActivityType}>
        {
          awardType
        }
      </Text>
      <Text style={styles.awardActivityName}>
        {
          awardName
        }
      </Text>
      <FontAwesome5 name="trophy" size={96} color="rgb(255, 255, 50)" />
      <Text style={styles.awardActivityTime}>
        {
          awardDesc.split(' ')[1]
        }
      </Text>
      <Text style={styles.awardActivityLabel}>
        {
          'Невероятно вы установили новый рекорд,\nсбросив на 2953 ккал больше веса по\nсравнению с предыдущим рекордом.'
        }
      </Text>
      <View>

      </View>
    </View>
  )
}

export function SettingsActivity({ navigation }) {
  
  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }
  
  return (
    <ScrollView style={styles.settingsActivityContainer}>
      <View style={styles.settingsActivityItem}>
        <View style={styles.settingsActivityElementColumn}>
          <Text style={styles.settingsActivityElementHeader}>
            Softtrack аккаунт
          </Text>
          <Text style={styles.settingsActivityElementFooterLabel}>
            ************
          </Text>
        </View>
        <View style={styles.settingsActivityElementRow}>
          <View style={styles.seetingsActivityElementColumn}>
            <Text style={styles.settingsActivityElementHeader}>
              Синхронизация с Softtrack Здоровье
            </Text>
            <Text style={styles.seetingsActivityElementLabel}>
              Включите, чтобы завершить\nвосстановление данных.
            </Text>
          </View>
          <Switch
          
          />
        </View>
      </View>
      <Text style={styles.settingsActivityItemLabel}>
        Обшие
      </Text>
      <View style={styles.settingsActivityItem}>
        <TouchableOpacity
          style={styles.settingsActivityElement}
          onPress={() => goToActivity(navigation, 'SettingsGeneralMeasureActivity')}
        >
          <Text style={styles.settingsActivityElementHeader}>
            Единицы измерения
          </Text>
        </TouchableOpacity>
        <View style={styles.settingsActivityElement}>
          <Text style={styles.settingsActivityElementHeader}>
            Уведомления
          </Text>
        </View>
        <View style={styles.settingsActivityElementRow}>
          <View style={styles.seetingsActivityElementColumn}>
            <Text style={styles.settingsActivityElementHeader}>
              Синхронизация с Softtrack Здоровье
            </Text>
            <Text style={styles.seetingsActivityElementLabel}>
              Включите, чтобы завершить\nвосстановление данных.
            </Text>
          </View>
          <Switch
          
          />
        </View>
        <View style={styles.settingsActivityElement}>
          <Text style={styles.settingsActivityElementHeader}>
            Аксессуары
          </Text>
        </View>
        <View style={styles.settingsActivityElementRow}>
          <View style={styles.seetingsActivityElementColumn}>
            <Text style={styles.settingsActivityElementHeader}>
              Подключенные службы
            </Text>
            <Text style={styles.seetingsActivityElementLabel}>
              Синхронизация данных Softtrack Здоровье с учетными\nзаписямисторонних веб-сервисов
            </Text>
          </View>
          <View>

          </View>
        </View>
        <View style={styles.settingsActivityElementRow}>
          <View style={styles.seetingsActivityElementColumn}>
            <Text style={styles.settingsActivityElementHeader}>
              Служба персонализации
            </Text>
            <Text style={styles.seetingsActivityElementLabel}>
              Получайте персонализированное содержимое с\nучетом характера использования телефона'
            </Text>
            <Text style={styles.seetingsActivityElementLabel}>
              Включено
            </Text>
          </View>
          <View>
            
          </View>
        </View>
      </View>
      <Text style={styles.settingsActivityItemLabel}>
        Together
      </Text>
      <View style={styles.settingsActivityItem}>
      <View style={styles.settingsActivityElementRow}>
          <View style={styles.seetingsActivityElementColumn}>
            <Text style={styles.settingsActivityElementHeader}>
              Получать приглашения от
            </Text>
            <Text style={styles.seetingsActivityElementLabel}>
              Друзья
            </Text>
          </View>
          <View>
            
          </View>
        </View>
        <View style={styles.settingsActivityElement}>
          <Text style={styles.settingsActivityElementHeader}>
            Поиск друзей и управление
          </Text>
        </View>
      </View>
      <Text style={styles.settingsActivityItemLabel}>
        Дополнительно
      </Text>
      <View style={styles.settingsActivityItem}>
        <View style={styles.settingsActivityElementRow}>
          <Text style={styles.settingsActivityElementHeader}>
            Автопродление тренировок
          </Text>
          <Switch
          
          />
        </View>
      </View>
      <Text style={styles.settingsActivityItemLabel}>
        Конфиденциальность
      </Text>
      <View style={styles.settingsActivityItem}>
        <View style={styles.settingsActivityElement}>
          <Text style={styles.settingsActivityElementHeader}>
            Уведомление о конфиденциальности
          </Text>
        </View>
        <View style={styles.settingsActivityElement}>
          <Text style={styles.settingsActivityElementHeader}>
            Разрешения на доступ к данным
          </Text>
        </View>
        <TouchableOpacity
          style={styles.settingsActivityElement}
          onPress={() => goToActivity(navigation, 'SettingsPrivacyPhoneActivity')}
        >
          <Text style={styles.settingsActivityElementHeader}>
            Номер телефона
          </Text>
        </TouchableOpacity>
        <View style={styles.settingsActivityElement}>
          <Text style={styles.settingsActivityElementHeader}>
            Загрузка личных данных
          </Text>
        </View>
        <View style={styles.settingsActivityElement}>
          <Text style={styles.settingsActivityElementHeader}>
            Удаление личных данных
          </Text>
        </View>
      </View>
      <Text style={styles.settingsActivityItemLabel}>
        Информация
      </Text>
      <View style={styles.settingsActivityItem}>
        <View style={styles.settingsActivityElementRow}>
          <Text style={styles.settingsActivityElementHeader}>
            О Softtrack Здоровье
          </Text>
          
        </View>
        <View style={styles.settingsActivityElement}>
          <View style={styles.settingsActivityElementHeader}>
            Свяжитесь с нами
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export function SettingsGeneralMeasureActivity() {
  
  const [growthMeasure, setGrowthMeasure] = useState('см')
  const [weightMeasure, setWeightMeasure] = useState('кг')
  const [tempMeasure, setTempMeasure] = useState('°C')
  const [distanseMeasure, setDistanseMeasure] = useState('км')
  const [sugarMeasure, setSugarMeasure] = useState('ммоль/л')
  const [pressureMeasure, setPressureMeasure] = useState('мм рт. ст.')
  const [hba1cMeasure, setHba1cMeasure] = useState('%')
  const [waterMeasure, setWaterMeasure] = useState('мл')

  const [isGrowthContextMenuVisible, setIsGrowthContextMenuVisible] = useState(false)
  const [isWeightContextMenuVisible, setIsWeightContextMenuVisible] = useState(false)
  const [isTempContextMenuVisible, setIsTempContextMenuVisible] = useState(false)
  const [isDistanseContextMenuVisible, setIsDistanseContextMenuVisible] = useState(false)
  const [isSugarContextMenuVisible, setIsSugarContextMenuVisible] = useState(false)
  const [isPressureContextMenuVisible, setIsPressureContextMenuVisible] = useState(false)
  const [isHba1cContextMenuVisible, setIsHba1cContextMenuVisible] = useState(false)
  const [isWaterContextMenuVisible, setIsWaterContextMenuVisible] = useState(false)

  const [measures, setMeasures] = useState([

  ])

  const updateMeasureInDB = (name, value) => {
    db.transaction(transaction => {
      let sqlStatement = `UPDATE measures SET value=\"${value}\" WHERE name=\"${name}\";`
      transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
        
      })
    })
  }

  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM measures;"
    transaction.executeSql(sqlStatement, [], (tx, receivedMeasures) => {
      let tempReceivedMeasures = []
      Array.from(receivedMeasures.rows).forEach((measureRow, measureRowIdx) => {
        const measure = Object.values(receivedMeasures.rows.item(measureRowIdx))
        tempReceivedMeasures = [
          ...tempReceivedMeasures,
          {
            id: measure[0],
            value: measure[2]
          }
        ]
      })
      setMeasures(tempReceivedMeasures)
    })
  })

  useEffect(() => {
    measures.map(measure => {
      if (measure.name === 'Рост') {
        setGrowthMeasure(measure.value)
      } else if (measure.name === 'Вес') {
        setWeightMeasure(measure.value)
      } else if (measure.name === 'Температура') {
        setTemperatureMeasure(measure.value)
      } else if (measure.name === 'Расстояние') {
        setDistanseMeasure(measure.value)
      } else if (measure.name === 'Сахар в крови') {
        setSugarMeasure(measure.value)
      } else if (measure.name === 'Кровянное давление') {
        setPressureMeasure(measure.value)
      } else if (measure.name === 'HbA1c') {
        setHba1cMeasure(measure.value)
      } else if (measure.name === 'Вода') {
        setWaterMeasure(measure.value)
      }
    })
  }, [measures])

  return (
    <View style={styles.settingsGeneralMeasureActivityContainer}>
      <MaterialMenu.Menu
        visible={isGrowthContextMenuVisible}
        onRequestClose={() => setIsGrowthContextMenuVisible(false)}
      >
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsGrowthContextMenuVisible(false)
            setGrowthMeasure('см')
            updateMeasureInDB('Рост', 'см')
          }}
        >
          см
        </MaterialMenu.MenuItem>
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsGrowthContextMenuVisible(false)
            setGrowthMeasure('фт., дюйм')
            updateMeasureInDB('Рост', 'фт., дюйм')
          }}
        >
          фт., дюйм
        </MaterialMenu.MenuItem>
      </MaterialMenu.Menu>
      <TouchableOpacity
        style={styles.settingsGeneralMeasureActivityItem}
        onLongPress={() => setIsGrowthContextMenuVisible(true)}
      >
        <Text style={styles.settingsGeneralMeasureActivityItemName}>
          Рост
        </Text>
        <Text style={styles.settingsGeneralMeasureActivityItemValue}>
          {
            growthMeasure
          }
        </Text>
      </TouchableOpacity>
      <MaterialMenu.Menu
        visible={isWeightContextMenuVisible}
        onRequestClose={() => {
          setIsWeightContextMenuVisible(false)
        }}
      >
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsWeightContextMenuVisible(false)
            setWeightMeasure('кг')
            updateMeasureInDB('Вес', 'кг')
          }}
        >
          кг
        </MaterialMenu.MenuItem>
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsWeightContextMenuVisible(false)
            setWeightMeasure('фунт')
            updateMeasureInDB('Вес', 'фунт')
          }}
        >
          фунт
        </MaterialMenu.MenuItem>
      </MaterialMenu.Menu>
      <TouchableOpacity
        onLongPress={() => setIsWeightContextMenuVisible(true)}
        style={styles.settingsGeneralMeasureActivityItem}
      >
        <Text style={styles.settingsGeneralMeasureActivityItemName}>
          Вес
        </Text>
        <Text style={styles.settingsGeneralMeasureActivityItemValue}>
          {
            weightMeasure
          }
        </Text>
      </TouchableOpacity>
      <MaterialMenu.Menu
        visible={isTempContextMenuVisible}
        onRequestClose={() => setIsTempContextMenuVisible(false)}
      >
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsTempContextMenuVisible(false)
            setTempMeasure('°C')
            updateMeasureInDB('Температура', '°C')
          }}
        >
          °C
        </MaterialMenu.MenuItem>
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsTempContextMenuVisible(false)
            setTempMeasure('°F')
            updateMeasureInDB('Температура', '°F')
          }}
        >
          °F
        </MaterialMenu.MenuItem>
      </MaterialMenu.Menu>
      <TouchableOpacity
        style={styles.settingsGeneralMeasureActivityItem}
        onLongPress={() => setIsTempContextMenuVisible(true)}
      >
        <Text style={styles.settingsGeneralMeasureActivityItemName}>
          Температура
        </Text>
        <Text style={styles.settingsGeneralMeasureActivityItemValue}>
          {
            tempMeasure
          }
        </Text>
      </TouchableOpacity>
      <MaterialMenu.Menu
        visible={isDistanseContextMenuVisible}
        onRequestClose={() => {
          setIsDistanseContextMenuVisible(true)
        }}
      >
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsDistanseContextMenuVisible(false)
            setDistanseMeasure('км')
            updateMeasureInDB('Расстояние', 'км')
          }}
        >
          км
        </MaterialMenu.MenuItem>
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsDistanseContextMenuVisible(false)
            setDistanseMeasure('ми, фт')
            updateMeasureInDB('Расстояние', 'ми, фт')
          }}
        >
          ми, фт
        </MaterialMenu.MenuItem>
      </MaterialMenu.Menu>
      <TouchableOpacity
        style={styles.settingsGeneralMeasureActivityItem}
        onLongPress={() => setIsDistanseContextMenuVisible(true)}
      >
        <Text style={styles.settingsGeneralMeasureActivityItemName}>
          Расстояние
        </Text>
        <Text style={styles.settingsGeneralMeasureActivityItemValue}>
          {
            distanseMeasure
          }
        </Text>
      </TouchableOpacity>
      <MaterialMenu.Menu
        visible={isSugarContextMenuVisible}
        onRequestClose={() => {
          setIsSugarContextMenuVisible(false)
        }}
      >
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsSugarContextMenuVisible(false)
            setSugarMeasure('мг/дл')
            updateMeasureInDB('Сахар в крови', 'мг/дл')
          }}
        >
          мг/дл
        </MaterialMenu.MenuItem>
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsSugarContextMenuVisible(false)
            setSugarMeasure('ммоль/л')
            updateMeasureInDB('Сахар в крови', 'ммоль/л')
          }}
        >
          ммоль/л
        </MaterialMenu.MenuItem>
      </MaterialMenu.Menu>
      <TouchableOpacity
        style={styles.settingsGeneralMeasureActivityItem}
        onLongPress={() => setIsSugarContextMenuVisible(true)}
      >
        <Text style={styles.settingsGeneralMeasureActivityItemName}>
          Сахар крови
        </Text>
        <Text style={styles.settingsGeneralMeasureActivityItemValue}>
          {
            sugarMeasure
          }
        </Text>
      </TouchableOpacity>
      <MaterialMenu.Menu
        visible={isPressureContextMenuVisible}
        onRequestClose={() => {
          setIsPressureContextMenuVisible(false)
        }}
      >
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsPressureContextMenuVisible(false)
            setPressureMeasure('мм рт. ст.')
            updateMeasureInDB('Кровянное давление', 'мм рт. ст.')
          }}
        >
          мм рт. ст.
        </MaterialMenu.MenuItem>
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsPressureContextMenuVisible(false)
            setPressureMeasure('кПа')
            updateMeasureInDB('Кровянное давление', 'кПа')
          }}
        >
          кПа
        </MaterialMenu.MenuItem>
      </MaterialMenu.Menu>
      <TouchableOpacity
        style={styles.settingsGeneralMeasureActivityItem}
        onLongPress={() => setIsPressureContextMenuVisible(true)}
      >
        <Text style={styles.settingsGeneralMeasureActivityItemName}>
          Кровянное давление
        </Text>
        <Text style={styles.settingsGeneralMeasureActivityItemValue}>
          {
            pressureMeasure
          }
        </Text>
      </TouchableOpacity>
      <MaterialMenu.Menu
        visible={isHba1cContextMenuVisible}
        onRequestClose={() => {
          setIsHba1cContextMenuVisible(false)
        }}
      >
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsHba1cContextMenuVisible(false)
            setHba1cMeasure('%')
            updateMeasureInDB('HbA1c', '%')
          }}
        >
          %
        </MaterialMenu.MenuItem>
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsHba1cContextMenuVisible(false)
            setHba1cMeasure('ммоль/моль')
            updateMeasureInDB('HbA1c', 'ммоль/моль')
          }}
        >
          ммоль/моль
        </MaterialMenu.MenuItem>
      </MaterialMenu.Menu>
      <TouchableOpacity
        style={styles.settingsGeneralMeasureActivityItem}
        onLongPress={() => setIsHba1cContextMenuVisible(true)}
      >
        <Text style={styles.settingsGeneralMeasureActivityItemName}>
          HbA1c
        </Text>
        <Text style={styles.settingsGeneralMeasureActivityItemValue}>
          {
            hba1cMeasure
          }
        </Text>
      </TouchableOpacity>
      <MaterialMenu.Menu
        visible={isWaterContextMenuVisible}
        onRequestClose={() => {
          setIsWaterContextMenuVisible(false)
        }}
      >
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsWaterContextMenuVisible(false)
            setWaterMeasure('мл')
            updateMeasureInDB('Вода', 'мл')
          }}
        >
          мл
        </MaterialMenu.MenuItem>
        <MaterialMenu.MenuItem
          onPress={() => {
            setIsWaterContextMenuVisible(false)
            setWaterMeasure('жидк. унц.')
            updateMeasureInDB('Вода', 'жидк. унц.')
          }}
        >
          жидк. унц.
        </MaterialMenu.MenuItem>
      </MaterialMenu.Menu>
      <TouchableOpacity
        style={styles.settingsGeneralMeasureActivityItem}
        onLongPress={() => setIsWaterContextMenuVisible(true)}
      >
        <Text style={styles.settingsGeneralMeasureActivityItemName}>
          Объем выпиваемой воды
        </Text>
        <Text style={styles.settingsGeneralMeasureActivityItemValue}>
          {
            waterMeasure
          }
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export function SettingsPrivacyPhoneActivity() {
  return (
    <View>
      <Text>
        SettingsPrivacyPhoneActivity
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  myPageContainer: {
    backgroundColor: 'rgb(225, 225, 225)'
  },
  myPageContainerUserHeader: {
    // marginVertical: 'alignItems',
    marginHorizontal: 'auto',
    width: '95%',
    borderRadius: 8,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  myPageContainerUserHeaderPhotoAndEditBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginVertical: 'alignItems'
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
    fontWeight: '500',
    fontSize: 24
  },
  myPageContainerUserReportPerWeek: {
    borderRadius: 8,
    // marginVertical: 'alignItems',
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    marginHorizontal: 'auto',
    padding: 25
  },
  myPageContainerUserReportPerWeekHeader: {
    fontWeight: '500',
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
    fontWeight: '700',
    fontSize: 28
  },
  myPageContainerUserReportPerWeekRowMeasure: {
    fontWeight: '500',
    fontSize: 18
  },
  myPageContainerUserRecords: {
    padding: 25,
    // marginVertical: 'alignItems',
    borderRadius: 8,
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    marginHorizontal: 'auto'
  },
  myPageContainerUserRecordsHeader: {
    fontSize: 24,
    fontWeight: '700'
  },
  myPageContainerUserRecordsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginVertical: 'alignItems'
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
    fontWeight: '700'
  },
  myPageContainerUserRecordMeasure: {
    fontWeight: '700'
  },
  myPageContainerUserRecordLabel: {
    color: 'rgb(150, 150, 150)'
  },
  myPageContainerUserRecordsLabel: {
    color: 'rgb(150, 150, 150)'
  },
  myPageContainerUserAwards: {
    padding: 25,
    // marginVertical: 'alignItems',
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
    fontWeight: '700'
  },
  myPageContainerUserAwardsShortcuts: {
    // marginVertical: 'alignItems'
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
    // marginVertical: 'alignItems'
  },
  fitnessContainerInnovation: {
    width: 250
  },
  fitnessContainerInnovationsHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 'alignItems'
  },
  fitnessContainerInnovationsHeaderLabel: {
    fontWeight: '700',
    fontSize: 20
  },
  fitnessContainerInnovationsList: {

  },
  fitnessContainerInnovationImg: {
    width: 100,
    height: 100,
    // marginVertical: 'alignItems'
  },
  fitnessContainerInnovationName: {
    fontWeight: '700'
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
    // marginVertical: 'alignItems'
  },
  togetherContainerHeaderImg: {
    width: 50,
    height: 50,
  },
  togetherContainerHeaderColumn: {

  },
  togetherContainerHeaderColumnLabel: {
    fontWeight: '700'
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
    // marginVertical: 'alignItems'
  },
  togetherContainerFriendsAside: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  togetherContainerFriendsAsideLabel: {
    fontWeight: '700'
  },
  togetherContainerFriendsAsideCount: {
    color: 'rgb(0, 100, 0)',
    fontWeight: '700',
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
    // marginVertical: 'alignItems'
  },
  togetherContainerStrongerTogetherHeader: {
    fontWeight: '700'
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
    fontWeight: '700'
  },
  togetherContainerStrongerTogetherBodyAsideParticipantsCount: {
    fontWeight: '700',
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
    // marginVertical: 'alignItems',
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
    fontWeight: '700',
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
    // marginVertical: 'alignItems',
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerWalkBlockBody: {
    
  },
  mainPageContainerWalkBlockBodyLabel: {
    fontWeight: '700',
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
    fontWeight: '700',
    fontSize: 24,
    marginHorizontal: 10
  },
  mainPageContainerWalkBlockBodyRowMaxCountLabel: {

  },
  mainPageContainerExerciseBlock: {
    width: '95%',
    padding: 15,
    // marginVertical: 'alignItems',
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
    fontWeight: '700',
    fontSize: 20
  },
  mainPageContainerExerciseBlockBodyHeaderLog: {
    fontWeight: '700',
    fontSize: 20,
    color: 'rgb(150, 150, 150)'
  },
  mainPageContainerExerciseBlockBodyExercises: {
    // marginVertical: 'alignItems',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  mainPageContainerExerciseBlockBodyExercisesItem: {
    // borderRadius: '100%',
    borderRadius: 1000,
    borderColor: 'rgb(0, 0, 0)',
    borderWidth: 1,
    width: 75,
    height: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainPageContainerExerciseStartedBlock: {
    backgroundColor: 'rgb(0, 150, 0)',
    width: '95%',
    padding: 15,
    marginHorizontal: 'auto'
  },
  mainPageContainerExerciseStartedBlockHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainPageContainerExerciseStartedBlockHeaderName: {
    color: 'rgb(255, 255, 255)'
  },
  mainPageContainerExerciseStartedBlockHeaderStartTime: {
    color: 'rgb(255, 255, 255)'
  },
  mainPageContainerExerciseStartedBlockTitle: {
    fontSize: 36,
    fontWeight: '400',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center'
  },
  mainPageContainerFoodBlock: {
    width: '95%',
    padding: 15,
    // marginVertical: 'alignItems',
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerFoodBlockLabel: {
    fontSize: 24,
    fontWeight: '700'
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
    fontWeight: '700',
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
    // marginVertical: 'alignItems',
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerSleepBlockLabel: {
    fontSize: 24,
    fontWeight: '700'
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
    // marginVertical: 'alignItems',
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  mainPageContainerBodyBlockBodyHeader: {
    fontWeight: '700',
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
    fontWeight: '700',
    fontSize: 24
  },
  mainPageContainerBodyBlockBodyRowItemFooterMeasure: {
    
  },
  mainPageContainerWaterBlock: {
    width: '95%',
    padding: 15,
    // marginVertical: 'alignItems',
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
    fontWeight: '700'
  },
  mainPageContainerWaterBodyAsideRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  mainPageContainerWaterBodyAsideRowCount: {
    fontWeight: '700',
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
    borderRadius: 1000
    // borderRadius: '100%'
  },
  mainPageContainerWaterBodyRowRemoveBtn: {
    
  },
  mainPageContainerWaterBodyRowAddBtnWrap: {
    marginHorizontal: 10,
    width: 35,
    height: 35,
    borderRadius: 1000
    // borderRadius: '100%'
  },
  mainPageContainerWaterBodyRowAddBtn: {

  },
  waterActivityScroll: {
    
  },
  waterActivityBodyLabel: {
    fontSize: 20,
    fontWeight: '700'
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
    fontWeight: '700',
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
    // marginVertical: 'alignItems',
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 'auto'
  },
  activeActivityBodyHeader: {
    fontWeight: '700',
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
    fontWeight: '700',
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
    fontWeight: '700'
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
    fontWeight: '700'  
  },
  walkActivityScroll: {

  },
  walkActivityBody: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    marginHorizontal: 'auto',
    width: '95%',
    // marginVertical: 'alignItems'
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
    fontWeight: '700',
    fontSize: 24,
    marginRight: 5
  },
  walkActivityBodyDataMeasure: {
    fontWeight: '700',
    fontSize: 20
  },
  walkActivityBodyDistanseAndCallories: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  walkActivityBodyDistanseLabel: {
    fontWeight: '700',
    fontSize: 22,
    marginHorizontal: 5
  },
  walkActivityBodyDistanseMeasure: {
    fontWeight: '700',
    fontSize: 18,
    marginHorizontal: 5
  },
  walkActivityBodyCalloriesLabel: {
    fontWeight: '700',
    fontSize: 22,
    marginHorizontal: 5
  },
  walkActivityBodyCalloriesMeasure: {
    fontWeight: '700',
    fontSize: 18,
    marginHorizontal: 5
  },
  exerciseActivityBody: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    marginHorizontal: 'auto',
    width: '95%',
    // marginVertical: 'alignItems'
  },
  exerciseActivityBodyPeriod: {
    fontWeight: '700'
  },
  exerciseActivityBodyTime: {
    fontWeight: '700',
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
    fontWeight: '700',
    fontSize: 22,
    marginHorizontal: 5
  },
  exerciseActivityBodyCalloriesMeasure: {
    fontWeight: '700',
    fontSize: 18,
    marginHorizontal: 5
  },
  exerciseActivityBodySessionsLabel: {
    fontWeight: '700',
    fontSize: 22,
    marginHorizontal: 5
  },
  exerciseActivityBodySessionsMeasure: {
    fontWeight: '700',
    fontSize: 18,
    marginHorizontal: 5
  },
  exerciseActivityBodyRecord: {
    // marginVertical: 'alignItems'
  },
  exerciseActivityBodyRecordHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(0, 0, 0)',
    // marginVertical: 'alignItems'
  },
  exerciseActivityBodyRecordHeaderDate: {
    fontWeight: '700'
  },
  exerciseActivityBodyRecordHeaderTime: {
    
  },
  exerciseActivityBodyRecordContent: {
    display: 'flex',
    flexDirection: 'row',
    // marginVertical: 'alignItems'
  },
  exerciseActivityBodyRecordContentName: {
    marginLeft: 15
  },
  foodActivityData: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    // marginVertical: 'alignItems',
    marginHorizontal: 'auto',
    width: '95%'
  },
  foodActivityDataHeader: {
    fontWeight: '700'
  },
  foodActivityDataCallories: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  foodActivityDataCalloriesContent: {
    fontWeight: '700',
    fontSize: 48,
    marginHorizontal: 5
  },
  foodActivityDataCalloriesMeasure: {
    fontWeight: '700',
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
    fontWeight: '700',
    fontSize: 24
  },
  bodyActivityLastData: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    marginHorizontal: 'auto',
    // marginVertical: 'alignItems',
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
    fontWeight: '700',
    fontSize: 36
  },
  bodyActivityLastDataRowMeasure: {
    marginHorizontal: 5,
    fontWeight: '700',
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
    fontWeight: '700'
  },
  bodyActivityRecords: {
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    padding: 15,
    // marginVertical: 'alignItems',
    marginHorizontal: 'auto'
  },
  bodyActivityRecord: {
    // marginVertical: 'alignItems',
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
    // marginVertical: 'alignItems'
  },
  sleepActivityData: {
    padding: 15,
    marginHorizontal: 'auto',
    // marginVertical: 'alignItems',
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
    fontWeight: '700',
    fontSize: 20,
    marginHorizontal: 5
  },
  sleepActivityDataTimeMinutesLabel: {
    marginHorizontal: 5
  },
  sleepActivityDataTimeMinutesContent: {
    fontWeight: '700',
    fontSize: 20,
    marginHorizontal: 5
  },
  sleepActivityDataTimeEnd: {

  },
  sleepActivityTimeStartAndEnd: {

  },
  sleepActivityRecordLabel: {
    textAlign: 'center',
    // marginVertical: 'alignItems'
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
    // marginVertical: 'alignItems'
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
    // marginVertical: 'alignItems'
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
    // marginVertical: 'alignItems',
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
    borderRadius: 1000
    // borderRadius: '100%'
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
    // marginVertical: 'alignItems',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 25
  },
  recordFoodActivityProductsListAdd: {
    // marginVertical: 'alignItems'
  },
  recordFoodActivityProductsListItem: {
    // marginVertical: 'alignItems'
  },
  recordFoodActivityProductsListAddLabel: {
    textAlign: 'center',
    fontWeight: '700'
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
  recordExerciseActivityMapContainer: {
    height: 500
  },
  recordExerciseActivityMap: {
    width: Dimensions.get('window').width,
    // height: Dimeansions.get('window').height
    height: '100%'
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
    fontWeight: '700'
  },
  exercisesListActivityList: {
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    marginHorizontal: 'auto',
    padding: 15,
    // marginVertical: 'alignItems'
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
    fontWeight: '700',
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
    fontWeight: '700'
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
    // marginVertical: 'alignItems',
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recordStartedExerciseActivityFooterBtnsContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  recordStartedExerciseActivityFooterPauseBtnWrap: {
    width: 500,
    marginHorizontal: 10
  },
  recordStartedExerciseActivityFooterPauseBtn: {

  },
  recordStartedExerciseActivityFooterResumeBtnWrap: {
    width: 250,
    marginHorizontal: 10
  },
  recordStartedExerciseActivityFooterResumeBtn: {

  },
  recordStartedExerciseActivityFooterCompleteBtnWrap: {
    width: 250,
    marginHorizontal: 10
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
    // marginVertical: 'alignItems',
    marginHorizontal: 'auto'
  },
  recordExerciseResultsActivityDetailsHeader: {
    fontWeight: '700',
    fontSize: 24
  },
  recordExerciseResultsActivityDetailsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginVertical: 'alignItems'
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
    fontWeight: '700',
    fontSize: 24
  },
  recordExerciseResultsActivityImages: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    // marginVertical: 'alignItems',
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
    // marginVertical: 'alignItems',
    marginHorizontal: 'auto'
  },
  recordExerciseResultsActivityNotesLabel: {
    marginLeft: 25
  },
  recordStartedExerciseActivityContainer: {

  },
  recordStartedExerciseActivityHeader: {

  },
  recordStartedExerciseActivityBody: {
    
  },
  recordStartedExerciseActivityBodyDestination: {
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  recordStartedExerciseActivityBodyDestinationHeader: {
    fontWeight: '700',
    fontSize: 24
  },
  recordStartedExerciseActivityBodyDestinationRow: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordStartedExerciseActivityBodyDestinationRowContent: {
    marginHorizontal: 10,
    fontSize: 24,
    fontWeight: '700'
  },
  recordStartedExerciseActivityBodyDestinationRowMeasure: {
    marginHorizontal: 10
  },
  recordStartedExerciseActivityBodyRow: {
    display: 'flex',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 'alignItems'
  },
  recordStartedExerciseActivityBodyRowItem: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  recordStartedExerciseActivityBodyRowItemHeader: {
    color: 'rgb(175, 175, 175)'
  },
  recordStartedExerciseActivityBodyRowItemContent: {
    fontSize: 20,
    fontWeight: '700'
  },
  editMyPageActivityContainer: {

  },
  editMyPageActivityAvatar: {
    width: 250, 
    height: 250,
    marginHorizontal: 'auto'
  },
  editMyPageActivityAvatarShortcuts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  editMyPageActivityAvatarShortcut: {
    width: 75,
    height: 75
  },
  editMyPageActivityAvatarBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  editMyPageActivityAvatarGalleryBtnWrap: {
    width: '50%'
  },
  editMyPageActivityAvatarGalleryBtn: {

  },
  editMyPageActivityAvatarCameraBtnWrap: {
    width: '50%'
  },
  editMyPageActivityAvatarCameraBtn: {

  },
  editMyPageActivityNickName: {
    width: '95%',
    marginHorizontal: 'auto',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15
  },
  editMyPageActivityNickNameLabel: {
    fontWeight: '700',
    fontSize: 18
  },
  editMyPageActivityNickNameInput: {

  },
  editMyPageActivityData: {
    width: '95%',
    marginHorizontal: 'auto',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15
  },
  editMyPageActivityDataItem: {
    display: 'flex',
    flexDirection: 'row'
  },
  editMyPageActivityDataItemLabel: {
    marginLeft: 25
  },
  editMyPageActivityActive: {
    width: '95%',
    marginHorizontal: 'auto',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15
  },
  editMyPageActivityActiveHeader: {
    fontWeight: '700',
    fontSize: 20
  },
  editMyPageActivityActivities: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  editMyPageActivityActivitiesItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  editMyPageActivityActivitiesItemIcon: {
    borderRadius: 1000,
    backgroundColor: 'rgb(225, 225, 225)',
    width: 75,
    height: 75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editMyPageActivityActiveActivitiesItem: {
    width: '20%'
  },
  editMyPageActivityActiveName: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center'
  },
  editMyPageActivityActiveDesc: {
    color: 'rgb(150, 150, 150)',
    textAlign: 'center'
  },
  editMyPageActivityFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  editMyPageActivityFooterCancelBtnWrap: {
    width: '50%'
  },
  editMyPageActivityFooterCancelBtn: {

  },
  editMyPageActivityFooterSaveBtnWrap: {
    width: '50%'
  },
  editMyPageActivityFooterSaveBtn: {

  },
  settingsActivityContainer: {

  },
  settingsActivityItem: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    marginHorizontal: 'auto',
    width: '95%'
  },
  settingsActivityElement: {
    
  },
  settingsActivityElementRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  settingsActivityElementColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  settingsActivityElementHeader: {
    fontSize: 20
  },
  settingsActivityElementFooterLabel: {
    color: 'rgb(0, 200, 0)'
  },
  settingsActivityItemLabel: {
    fontWeight: '700',
    color: 'rgb(175, 175, 175)'
  },
  settingsGeneralMeasureActivityContainer: {

  },
  settingsGeneralMeasureActivityItem: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(255, 255, 255)',
    width: '95%',
    marginHorizontal: 'auto',
    padding: 15
  },
  settingsGeneralMeasureActivityItemName: {
    fontWeight: '700'
  },
  settingsGeneralMeasureActivityItemValue: {

  },
  awardsActivityContainer: {

  },
  awardsActivityItem: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    width: '95%',
    marginHorizontal: 'auto'
  },
  awardsActivityItemHeader: {
    fontWeight: '700',
    fontSize: 18
  },
  awardsActivityItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  awardsActivityItemRowElement: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    alignItems: 'center'
  },
  awardsActivityItemRowElementLabel: {
    color: 'rgb(165, 165, 165)',
    textAlign: 'center'
  },
  awardsCategoryActivityElement: {
    width: 'auto'
  },
  awardActivityContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  awardActivityCalendar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'  
  },
  awardActivityType: {
    color: 'rgb(0, 150, 0)'
  },
  awardActivityName: {
    fontSize: 24
  },
  awardActivityTime: {
    fontSize: 24,
    color: 'rgb(0, 150, 0)'
  },
  awardActivityLabel: {

  }
})