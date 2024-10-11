import { StyleSheet } from 'react-native';
import {colors} from "../../components/global/colors"

export const loginStyles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    borderColor: colors.gray100,
    marginTop: 20,
    padding: 15,
    gap: 10
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray100,
    padding: 10,
    color: colors.black,
    fontSize: 12,
    borderRadius: 10,
    textAlignVertical: 'center',
    marginTop: 16,
    height: 50
  },
  buton: {
    paddingVertical: 10,
    gap: 10,
  },
  icon: {
    position: 'absolute',
    marginRight: 10,
    right: 10,
    top: '10%',
    transform: [{ translateY: -35 }]
  },
});