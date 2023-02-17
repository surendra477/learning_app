import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Easing} from 'react-native-reanimated';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import themeReducer from './stores/themeReducer';
import {MainLayout, CourseListing, CourseDetails} from './screens';

const Stack = createNativeStackNavigator();

const options = {
  gestureEnabled: false,
  TransformSpec: {
    open: {
      animation: 'timing',
      config: {duration: 400, easing: Easing.inOut(Easing.ease)},
    },
    close: {
      animation: 'timing',
      config: {duration: 400, easing: Easing.inOut(Easing.ease)},
    },
  },
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};
const store = createStore(themeReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            useNativeDriver: true,
          }}
          initialRouteName={'Dashboard'}
          detachInactiveScreens={false}>
          <Stack.Screen name="Dashboard" component={MainLayout} />
          <Stack.Screen
            name="CourseListing"
            component={CourseListing}
            options={() => options}
          />
          <Stack.Screen name="CourseDetails" component={CourseDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
