import {View, Image} from 'react-native';
import React from 'react';

const ProfilePic = () => {
  return (
    <View className="my-2 h-9 w-9 rounded-xl border-2 border-gray-400 items-center justify-center overflow-hidden">
      <Image
        source={require('../assets/app_images/avatar.png')}
        className="h-9 w-9"
      />
    </View>
  );
};

export default ProfilePic;
