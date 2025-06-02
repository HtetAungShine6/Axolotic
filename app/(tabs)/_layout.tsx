import {View, Image, TouchableOpacity} from "react-native";
import {Tabs} from "expo-router";
import {icons} from "@/constants/icons";
import {colors} from "@/constants/colors";
import AddButton from "@/components/AddButton";
import Add from "@/app/(tabs)/add";

const TabIcon = ({focused, title, icon}: any) => {
    if (focused) {
        return (
            <View className="size-full justify-center items-center mt-4 rounded-full">
                <Image
                    source={icon}
                    className="size-10"
                    style={{tintColor: colors.primary}}
                />
            </View>
        );
    } else {
        return (
            <View className="size-full justify-center items-center mt-4 rounded-full">
                <Image
                    source={icon}
                    className="size-10"
                    style={{tintColor: colors.idle}}
                />
            </View>
        );
    }
};

const _Layout = () => {
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
                        height: 80
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
                        tabBarIcon: ({focused}) => (
                            <TabIcon focused={focused} title="Home" icon={icons.home}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="budget"
                    options={{
                        title: "Budgets",
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <TabIcon focused={focused} title="Budgets" icon={icons.budget}/>
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
                                onPress={() => {
                                    console.log("Add button pressed!");
                                }}
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
                        tabBarIcon: ({focused}) => (
                            <TabIcon focused={focused} title="History" icon={icons.history}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <TabIcon focused={focused} title="Profile" icon={icons.profile}/>
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};
export default _Layout;
