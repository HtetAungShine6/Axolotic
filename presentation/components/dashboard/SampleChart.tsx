import React from 'react';
import { View } from 'react-native';
import { BarChart } from "react-native-gifted-charts";

const SampleChart: React.FC = () => {
    const data = [
        {value: 50},
        {value: 80},
        {value: 90},
        {value: 70},
        {value: 90},
        {value: 70},
        {value: 90},
        {value: 70}
    ];

    return (
        <View className="p-4 bg-white rounded-lg shadow-md">
            <BarChart 
                data={data}
                animationDuration={0}
            />
        </View>
    );
};

export default SampleChart; 