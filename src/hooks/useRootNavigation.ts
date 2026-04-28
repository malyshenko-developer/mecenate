import {useNavigation} from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useRootNavigation = () => {
    return useNavigation<RootNavigationProp>();
};