import 'react-native-gesture-handler';
import React from 'react';
import Navigator from "./src/Navigators/Navigator";
import { Provider } from 'react-redux'
import store from "./src/Stores/RecipeItems";

export default function App() {
  return (
     <Provider store={store}>
        <Navigator/>
     </Provider>
  )
}


