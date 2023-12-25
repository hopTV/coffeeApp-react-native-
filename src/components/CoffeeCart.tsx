import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const CoffeeCart = ({dataCoffee}: any) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      className="p-4 rounded-3xl justify-center flex flex-col gap-2"
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={require('../assets/coffee_assets/americano/portrait/americano_pic_1_portrait.png')}
        className="rounded-2xl overflow-hidden relative"
        style={{
          height: CARD_WIDTH,
          width: CARD_WIDTH,
        }}
        resizeMode="cover">
        <View className="flex flex-row bg-black/50 gap-1 items-center justify-center px-2 py-1 absolute top-0 right-0 rounded-bl-3xl rounded-tr-2xl">
          <Icon name="star" size={12} color={'#D17842'} />
          <Text className="text-white text-xs">4.5</Text>
        </View>
      </ImageBackground>
      <Text className="text-white text-base">Cappuccino</Text>
      <Text className="text-white text-xs">With sreamed Milk</Text>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-[#D17842] flex flex-row text-lg font-bold">
          $ <Text className="text-white font-medium">4.20</Text>
        </Text>
        <TouchableOpacity className="bg-[#D17842] p-2 rounded-lg">
          <Icon name="plus" size={15} color={'white'} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCart;
