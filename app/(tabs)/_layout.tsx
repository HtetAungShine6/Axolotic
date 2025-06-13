import { LoginUseCase } from "@/application/usecases/auth/LoginUseCase";
import { colors } from "@/constants/colors";
import { AuthInterface } from "@/domain/interfaces/auth/AuthInterface";
import { AuthRepositoryImpl } from "@/infrastructure/data/auth/AuthRepositoryImpl";
import AddButton from "@/presentation/components/AddButton";
import useLogin from "@/presentation/viewmodels/hooks/useLogin";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

// We will use this when we have our own tab bar icons
// const TabIcon = ({focused, title, icon}: any) => {
//     if (focused) {
//         return (
//             <View className="size-full justify-center items-center mt-4 rounded-full">
//                 <Image
//                     source={icon}
//                     className="w-6 h-6 mb-1"
//                     style={{tintColor: colors.primary}}
//                 />
//             </View>
//         );
//     } else {
//         return (
//             <View className="size-full justify-center items-center mt-4 rounded-full">
//                 <Image
//                     source={icon}
//                     className="w-6 h-6 mb-1"
//                     style={{tintColor: colors.idle}}
//                 />
//             </View>
//         );
//     }
// };

const TabIcon = ({ focused, icon }: { focused: boolean; icon: string }) => {
  return (
    <View className="items-center justify-center mt-1">
      <Ionicons
        // @ts-ignore
        name={icon}
        size={24}
        color={focused ? colors.primary : colors.idle}
      />
    </View>
  );
};

const Layout = () => {
  const authRepo: AuthInterface = new AuthRepositoryImpl();
  // const authRepoMock: AuthInterface = new MockAuthRepository()
  const loginUseCase = new LoginUseCase(authRepo);
  const { login, loading, error } = useLogin(loginUseCase);

  const handleAddButtonPress = () => {
    router.push("/(tabs)/add");
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.idle,
          tabBarStyle: {
            position: "absolute",
            elevation: 0,
            backgroundColor: "white",
            height: 80,
          },
          // Let me close this since this is maintaining
          // tabBarBackground: () => <CustomTabBarBackground/>
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="home-outline" />
            ),
          }}
        />
        <Tabs.Screen
          name="budget"
          options={{
            title: "Budgets",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="wallet-outline" />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: "Add",
            headerShown: false,
            tabBarButton: (props) => (
              <TouchableOpacity
                style={props.style}
                onPress={handleAddButtonPress}
                disabled={loading}
              >
                <AddButton />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="time-outline" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="person-circle-outline" />
            ),
          }}
        />
      </Tabs>
    </>
  );
};
export default Layout;
