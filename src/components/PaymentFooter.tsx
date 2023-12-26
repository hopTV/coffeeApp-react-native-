import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface Props {
  price: string;
  title: string;
  onAddToCart: () => void;
}

const PaymentFooter = ({price, title, onAddToCart}: Props) => {
  return (
    <View className="my-7 flex-row items-end justify-between">
      <View className="flex-col items-center min-w-[80px]">
        <Text className="text-gray-400">Price</Text>
        <Text className="text-[#D17842] text-xl">
          $ <Text className="text-white text-xl">{price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        className="bg-[#D17842] w-[60%] rounded-2xl min-w-[150px] items-center px-5 py-4"
        onPress={onAddToCart}>
        <Text className="text-white">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFooter;
