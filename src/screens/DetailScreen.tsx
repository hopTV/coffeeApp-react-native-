/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS} from '../theme/theme';
import ImageBackgroudInfo from '../components/ImageBackgroudInfo';
import PaymentFooter from '../components/PaymentFooter';
import {useStore} from '../store/store';

const DetailScreen = ({navigation, route}: any) => {
  const [dataDetail, setDataDetail] = useState(route.params.data);
  const [activePrice, setActivePrice] = useState(dataDetail.prices[0].price);

  const toggleFavorite = useStore((state: any) => state.toggleFavorite);
  const addToCart = useStore((state: any) => state.addToCart);

  const handleBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const handleTonggleFavourite = useCallback((value: any) => {
    toggleFavorite(value);
    setDataDetail({...dataDetail, favourite: !value.favourite});
    // console.log(value);
  }, []);

  const handleAddToCart = () => {
    addToCart({...dataDetail, price: activePrice, quantity: 1});
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackgroudInfo
          dataBg={dataDetail}
          onBack={handleBack}
          onToggleFavourite={handleTonggleFavourite}
        />
        <View className="mt-5 px-4 flex-col">
          <Text className="text-gray-300 mb-4 text-base">Description</Text>
          <Text className="text-gray-300">{dataDetail.description}</Text>
          <View className="mt-2">
            <Text className="text-gray-300 mb-4 text-base">Size</Text>
          </View>
          <View className="flex-row justify-between">
            {dataDetail.prices.map(
              (item: any, index: React.Key | null | undefined) => (
                <TouchableOpacity
                  key={index}
                  className={`${
                    activePrice === item.price && 'border-[#D17842] border-2'
                  } bg-[#141921] text-center min-w-[100px] items-center py-2 rounded-lg`}
                  onPress={() => setActivePrice(item.price)}>
                  <Text className="text-white">{item.size}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
          <PaymentFooter
            price={activePrice}
            title="Add to cart"
            onAddToCart={handleAddToCart}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;
