import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addProductToMyCart, removeMyCartItem } from "../redux/MyCartSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  decreaseQty,
  fetchDataFromApi,
  increaseQty,
} from "../redux/MyProductSlice";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const { width, height } = Dimensions.get("window");

const MyProducts = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataFromApi());
  }, [dispatch]);

  const myProducts = useSelector((state) => state.product.data);
  const myCartItems = useSelector((state) => state.cart);

  const isFetching = useSelector((state) => state.product.isFetching);

  console.log("my product items", JSON.stringify(myProducts, null, 2));

  const [search, setSearch] = useState("");

  const filteredItems = myProducts.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {/* <Text style={styles.headerText}>Shopify Nepal</Text> */}
          <Image source={require("../images/logonew.png")} />
          {myCartItems.length > 0 ? (
            <View style={styles.cartColumn}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MyCart");
                }}
              >
                <FontAwesome name="shopping-cart" size={30} color="#0a5b92" />
                <View style={styles.notificationContainer}>
                  <Text style={styles.notificationText}>
                    {myCartItems.length}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View style={styles.searchContainer}>
          <FontAwesome
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search in Shopify Nepal"
            style={styles.inputBox}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <Icon name="sliders" size={30} color="grey" style={styles.icon} />
        </View>

        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            isFetching ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <ActivityIndicator size="large" color="skyblue" />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  flexGrow: 1,
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: wp(100),
                    height: hp(40),
                    resizeMode: "contain",
                  }}
                  source={require("../images/sth.png")}
                />
              </View>
            )
          }
          renderItem={({ item }) => {
            return (
              <View style={styles.cart}>
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.productImage}
                />
                <View style={styles.detailText}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.productName}>{item.title}</Text>
                  </View>
                  <Text style={styles.productBrand}>{item.category}</Text>
                  <Text style={styles.productPrice}>{"रु " + item.price}</Text>
                  <View style={styles.buttonView}>
                    {item.qty === 0 ? (
                      <TouchableOpacity
                        style={styles.buttonCart}
                        onPress={() => {
                          dispatch(addProductToMyCart(item));
                          dispatch(increaseQty(item.id));
                        }}
                      >
                        <Text style={styles.buttonText}>Add To Cart</Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity
                          style={styles.buttonPlus}
                          onPress={() => {
                            dispatch(addProductToMyCart(item));
                            dispatch(increaseQty(item.id));
                          }}
                        >
                          <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{item.qty}</Text>
                        <TouchableOpacity
                          style={styles.buttonMinus}
                          onPress={() => {
                            dispatch(removeMyCartItem(item));
                            dispatch(decreaseQty(item.id));
                          }}
                        >
                          <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default MyProducts;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "#fff",
    elevation: 1,
    justifyContent: "space-between",
    paddingRight: 20,
    marginTop: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationContainer: {
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -5,
    right: -5,
  },
  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cart: {
    width: "94%",
    alignSelf: "center",
    height: "auto",
    backgroundColor: "#eceff7",
    marginTop: 10,

    borderRadius: 10,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  productImage: {
    width: 105,
    height: 115,
    borderRadius: 10,
    resizeMode: "cover",
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#134b5f",
    paddingTop: 10,
    flexWrap: "wrap",
    flexGrow: 1,
    flexShrink: 1,
    flex: 1,
  },
  productBrand: {
    fontSize: 16,
    fontWeight: "600",
    color: "#165a72",
    paddingVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
  },
  detailText: {
    padding: 10,
    flex: 1,
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 5,
    paddingVertical: 10,
  },
  buttonCart: {
    backgroundColor: "#66b6d2",
    borderRadius: 7,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonPlus: {
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    // marginLeft: 10,
  },
  buttonMinus: {
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "500",
  },
  quantity: {
    color: "#000",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  totalPrice: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "600",
    color: "#be4d25",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eceff7",
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  searchIcon: {
    paddingRight: 15,
  },
  inputBox: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "black",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});
