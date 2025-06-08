import AddButton from "@/components/AddButton";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabIcon = ({ focused, title, icon }: any) => {
  if (focused) {
    return (
      <View className="size-full justify-center items-center mt-2 rounded-full">
        <Image
          source={icon}
          className="size-5"
          style={{ tintColor: colors.primary }}
        />
      </View>
    );
  } else {
    return (
      <View className="size-full justify-center items-center mt-2 rounded-full">
        <Image
          source={icon}
          className="size-5"
          style={{ tintColor: colors.idle }}
        />
      </View>
    );
  }
};

const _Layout = () => {
  const insets = useSafeAreaInsets();

  const handleAddButtonPress = () => {
    console.log("Add button pressed");
    // Add your actual add functionality here
  };

  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.idle,
          tabBarStyle: {
            elevation: 0,
            backgroundColor: "white",
            height: 80 + insets.bottom,
            paddingBottom: insets.bottom,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Home" icon={icons.home} />
            ),
          }}
        />
        <Tabs.Screen
          name="budget"
          options={{
            title: "Budgets",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Budgets" icon={icons.budget} />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: "",
            tabBarButton: (props) => (
              <TouchableOpacity
                style={props.style}
                onPress={handleAddButtonPress}
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
              <TabIcon focused={focused} title="History" icon={icons.history} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Profile" icon={icons.profile} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};
export default _Layout;
