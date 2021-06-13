import  React, { useEffect } from "react";
import DecksView from "./components/DecksView";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import DeckInfo from "./components/DeckInfo";
import Quiz from "./components/Quiz";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setLocalNotification } from './utils/helpers';


const Tab = createBottomTabNavigator();



const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="DecksView"
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
      options={{
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
    >
      <Stack.Screen
        name="DecksView"
        component={DecksView}
        options={{
          title: 'Decks',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen
        name="DeckDetails"
        component={DeckInfo}
        options={{
          title: 'Deck details',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{
          title: 'Quiz',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          title: 'Add question',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() =>{    
    setLocalNotification();
  })
  
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Decks" component={MyStack} />
          <Tab.Screen name="Add deck" component={AddDeck} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
