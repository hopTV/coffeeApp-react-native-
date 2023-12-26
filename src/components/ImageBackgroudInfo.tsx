import {View, ImageBackground, TouchableOpacity, Text} from 'react-native';
import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IconLocation from 'react-native-vector-icons/Octicons';

interface Props {
  dataBg: any;
  onBack: () => void;
  onToggleFavourite: (value: any) => void;
}

const ImageBackgroudInfo = ({dataBg, onBack, onToggleFavourite}: Props) => {
  return (
    <View>
      <ImageBackground
        source={dataBg.imagelink_portrait}
        className="w-full aspect-[20/25] flex-col justify-between">
        <View className="my-4 px-4 flex-row w-full justify-between">
          <TouchableOpacity
            className="p-2 bg-slate-800 rounded-xl"
            onPress={onBack}>
            <Icon name="left" size={15} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 bg-slate-800 rounded-xl"
            onPress={() => onToggleFavourite(dataBg)}>
            <Icon
              name="heart"
              size={15}
              color={`${dataBg.favourite ? 'red' : 'gray'}`}
            />
          </TouchableOpacity>
        </View>
        <View className="bg-black/50 fleex-col rounded-t-2xl px-4 py-5">
          <View className="flex-row justify-between w-full">
            <View className="flex-col gap-y-4">
              <View className="flex-col">
                <Text className="text-white text-xl font-medium">
                  {dataBg.name}
                </Text>
                <Text className="text-gray-400 text-xs">
                  {dataBg.special_ingredient}
                </Text>
              </View>
              <View className="flex-row gap-x-1 items-center">
                <Icon name="star" size={20} color="#D17842" />
                <Text className="flex-row items-center text-white font-bold text-base">
                  {dataBg.average_rating}
                </Text>
                <Text className="text-xs text-gray-400">
                  ({dataBg.ratings_count})
                </Text>
              </View>
            </View>
            <View className="flex-col gap-y-4">
              <View className="flex-row gap-x-5">
                <View className="bg-[#141921] min-w-[50px] flex-col items-center rounded-lg py-1 px-2">
                  <View>
                    {dataBg.type === 'Coffee' ? (
                      <AwesomeIcon name="coffee" size={20} color={'#D17842'} />
                    ) : (
                      <MaterialIcon name="seed" size={20} color={'#D17842'} />
                    )}
                  </View>
                  <Text className="text-xs text-gray-400">{dataBg.type}</Text>
                </View>
                <View className="bg-[#141921] min-w-[50px] flex-col items-center justify-between rounded-lg py-1 px-2">
                  {dataBg.type === 'Coffee' ? (
                    <MaterialIcon name="water" size={20} color={'#D17842'} />
                  ) : (
                    <IconLocation name="location" size={20} color={'#D17842'} />
                  )}
                  <Text className="text-xs text-gray-400">
                    {dataBg.ingredients}
                  </Text>
                </View>
              </View>
              <View className="py-3 rounded-lg items-center px-4 bg-[#141921]">
                <Text className="text-gray-400 text-xs">{dataBg.roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default memo(ImageBackgroudInfo);
