import { NavigationContainer } from "@react-navigation/native";
import AppStack from "../navigation/AppStack";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addMyProducts } from "../redux/MyProductSlice";

const Main = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default Main;
