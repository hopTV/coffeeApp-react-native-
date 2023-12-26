import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';

const CARD_WIDTH = Dimensions.get('window').width * 0.3;

interface Props {
  dataCoffee: any;
  onAddToCart: (value: any) => void;
}

const CoffeeCart = ({dataCoffee, onAddToCart}: Props) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      className="p-4 rounded-3xl justify-center flex flex-col"
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={dataCoffee.imagelink_square}
        className="rounded-2xl overflow-hidden relative bg-center bg-[length:100%_100%]"
        style={{
          height: CARD_WIDTH,
          width: CARD_WIDTH,
        }}
        resizeMode="cover">
        <View className="flex flex-row bg-black/50 gap-1 items-center justify-center px-2 py-1 absolute top-0 right-0 rounded-bl-3xl rounded-tr-2xl">
          <Icon name="star" size={12} color={'#D17842'} />
          <Text className="text-white text-xs">
            {dataCoffee.average_rating}
          </Text>
        </View>
      </ImageBackground>
      <Text className="text-white text-base mt-1">{dataCoffee.name}</Text>
      <Text className="text-white text-xs mt-1">
        {dataCoffee.special_ingredient}
      </Text>
      <View className="flex flex-row items-center justify-between mt-2">
        <Text className="text-[#D17842] flex flex-row text-lg font-bold">
          ${' '}
          <Text className="text-white font-medium">
            {dataCoffee?.prices[1].price}
          </Text>
        </Text>
        <TouchableOpacity
          className="bg-[#D17842] p-2 rounded-lg"
          onPress={() => onAddToCart(dataCoffee)}>
          <Icon name="plus" size={15} color={'white'} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default memo(CoffeeCart);
