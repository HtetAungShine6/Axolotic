import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "@/constants/colors";

const { width } = Dimensions.get("window");


// Still Maintaining :(
const CustomTabBarBackground = () => {
    return (
        <View
            style={{
                position: "absolute",
                bottom: 0,
                width,
                height: 70,
            }}
        >

            <Svg width={width} height={80} viewBox={`0 0 ${width} 80`}>
                <Path
                    d={`
                        M0 0
                        H${width / 2 - 50}
                        C${width / 2 - 50} 0 ${width / 2 - 40} 0 ${width / 2 - 30} 10
                        C${width / 2 - 20} 20 ${width / 2 - 10} 30 ${width / 2} 35
                        C${width / 2 + 10} 30 ${width / 2 + 20} 20 ${width / 2 + 30} 10
                        C${width / 2 + 40} 0 ${width / 2 + 50} 0 ${width / 2 + 50} 0
                        H${width}
                        V70
                        H0
                        Z
                    `}
                    fill="white"
                />
            </Svg>
        </View>
    );
};


// const CustomTabBarBackground = () => {
//     return (
//         <View
//             style={{
//                 position: "absolute",
//                 bottom: 0,
//                 width,
//                 height: 80,
//             }}
//         >
//             <Svg width={width} height={80} viewBox={`0 0 ${width} 80`}>
//                 <Path
//                     d={`
//                         M0 0
//                         H${width / 2 - 50}
//                         C${width / 2 - 25} 0, ${width / 2 - 25} 30, ${width / 2} 30
//                         C${width / 2 + 25} 30, ${width / 2 + 25} 0, ${width / 2 + 50} 0
//                         H${width}
//                         V70
//                         H0
//                         Z
//                     `}
//                     fill="white"
//                 />
//             </Svg>
//         </View>
//     );
// };

export default CustomTabBarBackground;