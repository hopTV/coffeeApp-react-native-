import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import ProfilePic from './ProfilePic';

interface HeaderBarType {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarType> = ({title}) => {
  return (
    <View className="px-4 py-2 flex flex-row items-center justify-between">
      <Icon name="bars" size={20} color={'white'} />
      <Text className="text-white text-xl font-semibold">{title}</Text>
      <ProfilePic />
    </View>
  );
};

export default HeaderBar;
