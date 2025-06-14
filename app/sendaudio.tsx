// import { Ionicons } from "@expo/vector-icons";
// import { Audio } from "expo-av";
// import * as FileSystem from "expo-file-system";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const Add = () => {
//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioUri, setAudioUri] = useState<string | null>(null);
//   const [sound, setSound] = useState<Audio.Sound | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audioData, setAudioData] = useState<{
//     uri: string;
//     type: string;
//     name: string;
//   } | null>(null);
//   const [isSending, setIsSending] = useState(false);

//   useEffect(() => {
//     return () => {
//       if (recording) {
//         recording.stopAndUnloadAsync();
//       }
//     };
//   }, [recording]);

//   useEffect(() => {
//     return sound
//       ? () => {
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   async function startRecording() {
//     try {
//       await Audio.requestPermissionsAsync();
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       if (audioData?.uri) {
//         await FileSystem.deleteAsync(audioData.uri, { idempotent: true });
//       }

//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );

//       setRecording(recording);
//       setIsRecording(true);
//       setAudioUri(null);
//       setAudioData(null);
//       if (sound) {
//         await sound.unloadAsync();
//         setSound(null);
//       }
//     } catch (err) {
//       console.error("Failed to start recording", err);
//       Alert.alert("Error", "Failed to start recording");
//     }
//   }

//   async function stopRecording() {
//     if (!recording) return;

//     try {
//       await recording.stopAndUnloadAsync();
//       const uri = recording.getURI();
//       setRecording(null);
//       setIsRecording(false);

//       if (uri) {
//         const tempUri = uri;

//         setAudioData({
//           uri: tempUri,
//           type: "audio/m4a",
//           name: `audio_${Date.now()}.m4a`,
//         });

//         setAudioUri(tempUri);
//         console.log("Audio ready for sending:", tempUri);
//         Alert.alert("Success", "Audio recorded and ready to send!");
//       }
//     } catch (err) {
//       console.error("Failed to stop recording", err);
//       Alert.alert("Error", "Failed to stop recording");
//     }
//   }

//   // Function to prepare audio for sending
//   const prepareAudioForSending = async () => {
//     if (!audioData) return null;

//     try {
//       const fileInfo = await FileSystem.getInfoAsync(audioData.uri);
//       if (!fileInfo.exists) {
//         throw new Error("Audio file not found");
//       }

//       // Read the file as base64
//       const base64 = await FileSystem.readAsStringAsync(audioData.uri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       return {
//         uri: audioData.uri,
//         type: audioData.type,
//         name: audioData.name,
//         data: base64,
//       };
//     } catch (error) {
//       console.error("Error preparing audio:", error);
//       Alert.alert("Error", "Failed to prepare audio for sending");
//       return null;
//     }
//   };

//   // Example of how to use the audio data in a fetch request
//   const sendAudio = async () => {
//     const audioToSend = await prepareAudioForSending();
//     if (!audioToSend) return;

//     setIsSending(true);

//     const formData = new FormData();
//     formData.append("trackerId", "682890686afc6f316dc4a0cf");
//     formData.append("data", {
//       uri: audioToSend.uri,
//       type: audioToSend.type,
//       name: audioToSend.name,
//     } as any);
//     formData.append("budgetId", "682890696afc6f316dc4a0dc");

//     const url = "https://axolotic.app.n8n.cloud/webhook-test/voice";
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx5bm4gVGhpdCIsInN1YiI6IjY4MjcxYmY3M2IzOWQwNjlhOGQ3ZmVjNyIsImlhdCI6MTc0OTgyMjkxNSwiZXhwIjoxNzQ5OTA5MzE1fQ.oIx1DIjvlffQLKhpIglTrmB_1oHNCIp_epJL1UVKojc";

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const responseData = await response.json();
//       console.log(
//         "Response from server:",
//         JSON.stringify(responseData, null, 2)
//       );
//       Alert.alert("Success", "Audio sent successfully!");
//     } catch (error) {
//       console.error("Error sending audio:", error);
//       Alert.alert("Error", "Failed to send audio.");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   async function playRecording() {
//     if (!audioUri) return;

//     try {
//       if (sound) {
//         await sound.unloadAsync();
//       }
//       const { sound: newSound } = await Audio.Sound.createAsync(
//         { uri: audioUri },
//         { shouldPlay: true }
//       );
//       setSound(newSound);
//       setIsPlaying(true);

//       newSound.setOnPlaybackStatusUpdate((status) => {
//         if (status.isLoaded && status.didJustFinish) {
//           setIsPlaying(false);
//         }
//       });
//     } catch (err) {
//       console.error("Failed to play recording", err);
//       Alert.alert("Error", "Failed to play recording");
//     }
//   }

//   async function stopPlayback() {
//     if (sound) {
//       await sound.stopAsync();
//       setIsPlaying(false);
//     }
//   }

//   return (
//     <View className="flex-1 items-center justify-center bg-white p-4">
//       <TouchableOpacity
//         className={`items-center justify-center w-24 h-24 rounded-full border-4 ${
//           isRecording ? "border-red-500" : "border-purple-600"
//         } mb-8`}
//         onPress={isRecording ? stopRecording : startRecording}
//       >
//         <Ionicons
//           name={isRecording ? "stop-circle" : "mic"}
//           size={60}
//           color={isRecording ? "red" : "purple"}
//         />
//       </TouchableOpacity>

//       {audioUri && (
//         <View className="flex-row items-center justify-center mb-8">
//           <TouchableOpacity
//             onPress={isPlaying ? stopPlayback : playRecording}
//             className="p-4 rounded-full bg-gray-200"
//           >
//             <Ionicons
//               name={isPlaying ? "pause" : "play"}
//               size={32}
//               color="black"
//             />
//           </TouchableOpacity>
//           <Text className="ml-4 text-lg">
//             {isPlaying ? "Playing..." : "Tap to Play"}
//           </Text>
//         </View>
//       )}

//       <TouchableOpacity
//         onPress={sendAudio}
//         className="bg-purple-600 py-4 px-8 rounded-full flex-row items-center justify-center"
//         disabled={!audioUri || isSending}
//         style={{ opacity: !audioUri || isSending ? 0.5 : 1 }}
//       >
//         {isSending ? (
//           <ActivityIndicator color="white" />
//         ) : (
//           <Text className="text-white text-lg font-bold">Send Audio</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Add;

import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Add = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      if (audioData?.uri) {
        await FileSystem.deleteAsync(audioData.uri, { idempotent: true });
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      setAudioUri(null);
      setAudioData(null);
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
    } catch (err) {
      console.error("Failed to start recording", err);
      Alert.alert("Error", "Failed to start recording");
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);

      if (uri) {
        const tempUri = uri;

        setAudioData({
          uri: tempUri,
          type: "audio/m4a",
          name: `audio_${Date.now()}.m4a`,
        });

        setAudioUri(tempUri);
        console.log("Audio ready for sending:", tempUri);
        Alert.alert("Success", "Audio recorded and ready to send!");
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
      Alert.alert("Error", "Failed to stop recording");
    }
  }

  // Function to prepare audio for sending
  const prepareAudioForSending = async () => {
    if (!audioData) return null;

    try {
      const fileInfo = await FileSystem.getInfoAsync(audioData.uri);
      if (!fileInfo.exists) {
        throw new Error("Audio file not found");
      }

      // Read the file as base64
      const base64 = await FileSystem.readAsStringAsync(audioData.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return {
        uri: audioData.uri,
        type: audioData.type,
        name: audioData.name,
        data: base64,
      };
    } catch (error) {
      console.error("Error preparing audio:", error);
      Alert.alert("Error", "Failed to prepare audio for sending");
      return null;
    }
  };

  // Example of how to use the audio data in a fetch request
  const sendAudio = async () => {
    const audioToSend = await prepareAudioForSending();
    if (!audioToSend) return;

    setIsSending(true);

    const formData = new FormData();
    formData.append("trackerId", "682890686afc6f316dc4a0cf");
    formData.append("data", {
      uri: audioToSend.uri,
      type: audioToSend.type,
      name: audioToSend.name,
    } as any);
    formData.append("budgetId", "682890696afc6f316dc4a0dc");

    const url = "https://axolotic.app.n8n.cloud/webhook-test/voice";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx5bm4gVGhpdCIsInN1YiI6IjY4MjcxYmY3M2IzOWQwNjlhOGQ3ZmVjNyIsImlhdCI6MTc0OTgyMjkxNSwiZXhwIjoxNzQ5OTA5MzE1fQ.oIx1DIjvlffQLKhpIglTrmB_1oHNCIp_epJL1UVKojc";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log(
        "Response from server:",
        JSON.stringify(responseData, null, 2)
      );
      Alert.alert("Success", "Audio sent successfully!");
    } catch (error) {
      console.error("Error sending audio:", error);
      Alert.alert("Error", "Failed to send audio.");
    } finally {
      setIsSending(false);
    }
  };

  async function playRecording() {
    if (!audioUri) return;

    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (err) {
      console.error("Failed to play recording", err);
      Alert.alert("Error", "Failed to play recording");
    }
  }

  async function stopPlayback() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <TouchableOpacity
        className={`items-center justify-center w-24 h-24 rounded-full border-4 ${
          isRecording ? "border-red-500" : "border-purple-600"
        } mb-8`}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Ionicons
          name={isRecording ? "stop-circle" : "mic"}
          size={60}
          color={isRecording ? "red" : "purple"}
        />
      </TouchableOpacity>

      {audioUri && (
        <View className="flex-row items-center justify-center mb-8">
          <TouchableOpacity
            onPress={isPlaying ? stopPlayback : playRecording}
            className="p-4 rounded-full bg-gray-200"
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={32}
              color="black"
            />
          </TouchableOpacity>
          <Text className="ml-4 text-lg">
            {isPlaying ? "Playing..." : "Tap to Play"}
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={sendAudio}
        className="bg-purple-600 py-4 px-8 rounded-full flex-row items-center justify-center"
        disabled={!audioUri || isSending}
        style={{ opacity: !audioUri || isSending ? 0.5 : 1 }}
      >
        {isSending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-lg font-bold">Send Audio</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Add;
