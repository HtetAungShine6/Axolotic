import React from "react";
import { useAuth } from "@/contexts/authContext";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
    const { logout } = useAuth();
    const { user } = useAuth();

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", style: "destructive", onPress: logout },
        ]);
    };

    return (
        <View className="flex-1 justify-center items-center px-8 bg-white">
            <View className="mb-8">
                <Text className="text-2xl font-bold text-center mb-4">Profile</Text>

                {user && (
                    <View className="mb-6">
                        <Text className="text-gray-600 text-center mb-2">
                            Welcome back!
                        </Text>
                        <Text className="text-lg font-semibold text-center">
                            {user.username}
                        </Text>
                        <Text className="text-gray-500 text-center">{user.email}</Text>
                        <View className="flex-row justify-center items-center mt-2">
                            <Text className="text-purple-600 text-center capitalize mr-2">
                                {user.subscription}
                            </Text>
                            {/*{isPremium && (*/}
                            {/*    <Text className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">*/}
                            {/*        ⭐ Premium*/}
                            {/*    </Text>*/}
                            {/*)}*/}
                        </View>
                    </View>
                )}
            </View>

            <TouchableOpacity
                className="bg-red-500 rounded-lg py-4 px-8 w-full"
                onPress={handleLogout}
            >
                <Text className="text-white text-center font-semibold text-lg">
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;



// import React from "react";
// import { View, Text, TouchableOpacity, Alert } from "react-native";
// import { useAuth } from "@/contexts/authContext";
//
// export default function Profile() {
//     const { logout } = useAuth();
//
//     const handleLogout = () => {
//         Alert.alert("Logout", "Are you sure you want to logout?", [
//             { text: "Cancel", style: "cancel" },
//             { text: "Logout", style: "destructive", onPress: logout },
//         ]);
//     };
//
//     return (
//         <View
//             style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 paddingHorizontal: 32,
//                 backgroundColor: "white",
//             }}
//         >
//             <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
//                 Profile
//             </Text>
//
//             <TouchableOpacity
//                 style={{
//                     backgroundColor: "#ef4444", // red-500
//                     paddingVertical: 12,
//                     paddingHorizontal: 24,
//                     borderRadius: 8,
//                 }}
//                 onPress={handleLogout}
//             >
//                 <Text
//                     style={{
//                         color: "white",
//                         fontSize: 18,
//                         fontWeight: "600",
//                         textAlign: "center",
//                     }}
//                 >
//                     Logout
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// }
// // export default Profile;