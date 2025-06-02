import { colors } from "@/constants/colors"
import { View, Image } from "react-native"
import {icons} from "@/constants/icons";

const AddButton = () => {
    return (
        <View
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
            }}
        >
            <View
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image source={icons.plus} style={{ width: 30, height: 30, tintColor: 'white' }} />
            </View>
        </View>
    )
}

export default AddButton