/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import {COLORS} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import Icon from 'react-native-vector-icons/AntDesign';
import {useStore} from '../store/store';
import CoffeeCart from '../components/CoffeeCart';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};
const HomeScreen = ({navigation}: any) => {
  const coffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeansData);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [serchText, setSearchText] = useState('');
  const categories = getCategoriesFromData(coffeeList);
  const [activeCategory, setActiveCategory] = useState('All');
  const [dataList, setDataList] = useState(coffeeList);

  const ListRef = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  const handleSearchCoffee = (text: string) => {
    if (text.trim() !== '') {
      ListRef.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setActiveCategory('All');
      setDataList([
        ...coffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(text.toLowerCase()),
        ),
      ]);
    } else {
      setDataList(coffeeList);
    }
  };

  const handeleSortCategory = (value: any) => {
    if (value === 'All') {
      setDataList(coffeeList);
    } else {
      setDataList(coffeeList.filter((item: any) => item.name === value));
    }
    setActiveCategory(value);
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  };

  const handleAddTocart = useCallback((data: any) => {
    addToCart(data);
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${data.name} iss Added to cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }, []);

  return (
    <View className="flex-1 bg-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex flex-grow">
        <HeaderBar />
        <Text className="text-2xl font-semibold text-white pl-4">
          Find the best{'\n'}coffee for you
        </Text>
        <View className="flex flex-row m-7 items-center rounded-3xl bg-[#141921]">
          <TouchableOpacity
            className="mx-5"
            onPress={() => handleSearchCoffee(serchText)}>
            <Icon
              name="search1"
              size={18}
              color={
                serchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="find your Coffee..."
            value={serchText}
            onChangeText={text => {
              setSearchText(text);
              handleSearchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            className="flex-1 h-[40px] text-sm text-white"
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            marginBottom: 20,
          }}>
          {categories?.map((data, index) => (
            <View key={index.toString()} className="px-4">
              <TouchableOpacity
                className="flex items-center"
                onPress={() => handeleSortCategory(data)}>
                <Text
                  className={`${
                    activeCategory === data
                      ? 'text-orange-500'
                      : ' text-gray-500'
                  } font-bold text-base mb-1`}>
                  {data}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <SafeAreaView>
          <FlatList
            // ref={ListRef}
            data={dataList}
            horizontal
            keyExtractor={item => item.id}
            contentContainerStyle={{
              gap: 20,
              paddingVertical: 20,
              paddingHorizontal: 30,
            }}
            ListEmptyComponent={
              <View
                className=""
                style={{width: Dimensions.get('window').width - 60}}>
                <Text className="text-white ">No coffee Available</Text>
              </View>
            }
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Detail', {
                    data: item,
                  });
                }}>
                <CoffeeCart dataCoffee={item} onAddToCart={handleAddTocart} />
              </TouchableOpacity>
            )}></FlatList>
        </SafeAreaView>
        <Text className="text-white text-base px-6">Coffee Beans</Text>
        <SafeAreaView>
          <FlatList
            horizontal
            data={BeanList}
            contentContainerStyle={{
              gap: 20,
              paddingVertical: 20,
              paddingHorizontal: 30,
              marginBottom: tabBarHeight,
            }}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Detail', {
                    data: item,
                  });
                }}>
                <CoffeeCart dataCoffee={item} onAddToCart={handleAddTocart} />
              </TouchableOpacity>
            )}></FlatList>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

// const style = StyleSheet

export default HomeScreen;
