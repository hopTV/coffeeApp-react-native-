/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
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
} from 'react-native';
import {COLORS} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import Icon from 'react-native-vector-icons/AntDesign';
import {useStore} from '../store/store';
import CoffeeCart from '../components/CoffeeCart';

const getCateoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
    let categories = Object.keys(temp);
    categories.unshift('All');
    return categories;
  }
};

const HomeScreen = ({navigation}: any) => {
  const coffeeList = useStore((state: any) => state.CoffeeList);

  const [serchText, setSearchText] = useState('');
  const [categories, setCategories] = useState(
    getCateoriesFromData(coffeeList),
  );
  const [dataList, setDataList] = useState(coffeeList);

  const ListRef = useRef<FlatList>();

  const handleSearchCoffee = (value: string) => {
    console.log(value);
  };

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
                onPress={() => {
                  ListRef.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                }}>
                <Text className={'font-bold text-base text-gray-500 mb-1'}>
                  {data}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <SafeAreaView className="flex flex-col w-full justify-center py-4 px-7">
          <FlatList
            // ref={ListRef}
            data={dataList}
            horizontal
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <View
                className=""
                style={{width: Dimensions.get('window').width - 60}}>
                <Text className="text-white ">No coffee Available</Text>
              </View>
            }
            renderItem={item => (
              <TouchableOpacity className="ml-10 mt-2">
                <CoffeeCart dataCoffee={item} />
              </TouchableOpacity>
            )}></FlatList>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

// const style = StyleSheet

export default HomeScreen;
