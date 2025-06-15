import { BudgetUseCase } from "@/application/usecases/budgets/BudgetUseCase";
import { ExpenseUseCase } from "@/application/usecases/expenses/ExpenseUseCase";
import { TrackerUseCase } from "@/application/usecases/trackers/TrackerUseCase";
import { BudgetInterface } from "@/domain/interfaces/budgets/BudgetInterface";
import { ExpenseInterface } from "@/domain/interfaces/expenses/ExpenseInterface";
import { TrackerInterface } from "@/domain/interfaces/trackers/TrackerInterface";
import { BudgetImpl } from "@/infrastructure/data/budgets/BudgetImpl";
import { ExpenseImpl } from "@/infrastructure/data/expenses/ExpenseImpl";
import { TrackerImpl } from "@/infrastructure/data/trackers/TrackerImpl";
import ErrorModal from "@/presentation/components/ErrorModal";
import ExpenseSuccessModal from "@/presentation/components/ExpenseSuccessModal";
import WaveformVisualizer from "@/presentation/components/WaveformVisualizer";
import { useTrackerData } from "@/presentation/viewmodels/hooks/useTrackerData";
import tokenManager from "@/utils/tokenManager";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const trackerInterface: TrackerInterface = new TrackerImpl();
const trackerUseCase = new TrackerUseCase(trackerInterface);
const expenseInterface: ExpenseInterface = new ExpenseImpl();
const expenseUseCase = new ExpenseUseCase(expenseInterface);
const budgetInterface: BudgetInterface = new BudgetImpl();
const budgetUseCase = new BudgetUseCase(budgetInterface);

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

  // Modal states
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successData, setSuccessData] = useState<{
    message: string;
    expenses: any[];
    total: number;
  } | null>(null);
  const [errorData, setErrorData] = useState<{
    message: string;
    hint?: string;
  } | null>(null);

  // Loading stages
  const [loadingStage, setLoadingStage] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [responseReceived, setResponseReceived] = useState(false);

  const loadingStages = [
    {
      title: "Transcribing Audio...",
      shortTitle: "Transcribe",
      description: "Converting speech to text",
      duration: 3000,
    },
    {
      title: "Processing Audio...",
      shortTitle: "Process",
      description: "Analyzing voice patterns and context",
      duration: 2000,
    },
    {
      title: "Auto Updating Budgeting...",
      shortTitle: "Budget",
      description: "Matching expenses to your budgets",
      duration: 5000,
    },
    {
      title: "Finalizing Expense Entries...",
      shortTitle: "Done",
      description: "Wrapping it up and organizing your expenses",
      duration: 10000,
    },
  ];

  const { tracker } = useTrackerData(
    trackerUseCase,
    expenseUseCase,
    budgetUseCase
  );

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
        // Alert.alert("Success", "Audio recorded and ready to send!");
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
    setLoadingStage(0);
    setLoadingProgress(0);
    setResponseReceived(false);

    // Start the staged loading simulation
    simulateProcessingStages();

    console.log("Preparing to send audio...");
    console.log("tracker", tracker);

    const formData = new FormData();
    formData.append("trackerId", tracker?._id || "");
    formData.append("data", {
      uri: audioToSend.uri,
      type: audioToSend.type,
      name: audioToSend.name,
    } as any);

    console.log("Form data prepared:", formData);

    const url = "https://axolotic.app.n8n.cloud/webhook/voice";

    try {
      const token = await tokenManager.getToken();
      console.log("Token retrieved:", token);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      console.log("Response received:", response);
      const responseData = await response.json();
      console.log(
        "Response from server:",
        JSON.stringify(responseData, null, 2)
      );

      // Handle response
      if (Array.isArray(responseData) && responseData[0]?.output?.success) {
        console.log("Success response:", responseData);
        setSuccessData({
          message: responseData[0].output.message,
          expenses: responseData[0].output.expenses,
          total: responseData[0].output.total,
        });
        setShowSuccessModal(true);
      } else {
        console.log("Error response:", responseData);
        setErrorData({
          message: responseData.message || "Failed to process audio",
          hint: responseData.hint,
        });
        setShowErrorModal(true);
      }
      completeLoadingQuickly();
    } catch (error) {
      console.error("Error sending audio:", error);
      setErrorData({
        message: "Network error occurred",
        hint: "Please check your connection and try again",
      });
      setShowErrorModal(true);
      completeLoadingQuickly();
    } finally {
      setIsSending(false);
    }
  };

  const simulateProcessingStages = () => {
    let currentStage = 0;
    let stageStartTime = Date.now();
    let intervalId: ReturnType<typeof setInterval>;

    const updateProgress = () => {
      if (currentStage >= loadingStages.length) {
        if (intervalId) clearInterval(intervalId);
        return; // All stages complete
      }

      const elapsed = Date.now() - stageStartTime;
      const stageDuration = loadingStages[currentStage].duration;
      let progress = Math.min(elapsed / stageDuration, 1);

      // If this is the last stage and we're approaching completion, cap at 95% until response
      if (
        currentStage === loadingStages.length - 1 &&
        progress > 0.95 &&
        !responseReceived
      ) {
        progress = 0.95;
      }

      setLoadingProgress(progress * 100);

      if (
        progress >= 1 ||
        (progress >= 0.95 &&
          currentStage === loadingStages.length - 1 &&
          !responseReceived)
      ) {
        if (progress >= 1) {
          // Move to next stage only if we actually completed (not stuck at 95%)
          currentStage++;
          if (currentStage < loadingStages.length) {
            setLoadingStage(currentStage);
            setLoadingProgress(0);
            stageStartTime = Date.now();
          } else {
            if (intervalId) clearInterval(intervalId);
          }
        }
        // If stuck at 95%, don't advance stage, just wait for response
      }
    };

    // Use setInterval instead of setTimeout for more consistent timing and less flickering
    intervalId = setInterval(updateProgress, 50); // Reduced frequency from 50ms to 100ms
  };

  const completeLoadingQuickly = () => {
    setResponseReceived(true);

    const quickComplete = () => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          // If already at 100%, proceed to show success/error
          setTimeout(() => {
            setIsSending(false);
            if (successData) {
              setSuccessData(null);
              setShowSuccessModal(false);
            } else if (errorData) {
              setErrorData(null);
              setShowErrorModal(false);
            }
          }, 200);
          return 100;
        }

        // Quickly animate to 100%
        const newProgress = Math.min(prev + 10, 100);
        if (newProgress < 100) {
          setTimeout(quickComplete, 50);
        } else {
          // Completed, show modal after brief delay
          setTimeout(() => {
            setIsSending(false);
            if (successData) {
              setSuccessData(null);
              setShowSuccessModal(false);
            } else if (errorData) {
              setErrorData(null);
              setShowErrorModal(false);
            }
          }, 200);
        }
        return newProgress;
      });
    };

    quickComplete();
  };

  const closeModals = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setSuccessData(null);
    setErrorData(null);
  };

  const retryRequest = () => {
    setShowErrorModal(false);
    setErrorData(null);
    sendAudio();
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
      setErrorData({
        message: "Failed to play recording",
        hint: "Please try recording again",
      });
      setShowErrorModal(true);
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
        className={`items-center justify-center w-24 h-24 rounded-full border border-1 ${
          isRecording ? "border-red-500" : "border-gray-300"
        } mb-4`}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Ionicons
          name={isRecording ? "stop-circle" : "mic"}
          size={42}
          color={isRecording ? "red" : "gray"}
        />
      </TouchableOpacity>

      {/* Waveform Visualizer - shows when recording */}
      {isRecording && (
        <View className="mb-6">
          <WaveformVisualizer isActive={isRecording} speed="slow" />
          <Text className="text-center text-gray-600 mt-2">
            Listening... Speak now
          </Text>
        </View>
      )}

      {audioUri && !isRecording && (
        <TouchableOpacity
          onPress={isPlaying ? stopPlayback : playRecording}
          className="flex-row items-center justify-center mb-20 border border-purple-200 bg-purple-50 p-4 rounded-lg"
        >
          <Ionicons
            name={isPlaying ? "stop" : "play"}
            size={22}
            color="oklch(94.6% 0.033 307.174)"
          />
          <Text className="ml-2 text-md">
            {isPlaying ? "Playing..." : "Tap to Preview"}
          </Text>
        </TouchableOpacity>
      )}

      {!audioUri || isSending || isRecording ? null : (
        <View className="flex-row items-center justify-center">
          {isSending ? (
            <ActivityIndicator color="white" />
          ) : (
            <View className="flex flex-col gap-3 w-full">
              <TouchableOpacity
                onPress={sendAudio}
                className="bg-purple-600 p-5 rounded-lg flex flex-col gap-1"
              >
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-white text-lg font-semibold">
                    Let AI auto-categorize it.
                  </Text>
                  <Image
                    source={require("@/assets/icons/ai-decide.png")}
                    className="w-6 h-6"
                    style={{ tintColor: "white" }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white border border-gray-300 p-5 rounded-lg flex flex-col gap-1">
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-gray-700 text-lg font-semibold">
                    Pick a budget to add this to.
                  </Text>
                  <Ionicons name="add" size={22} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Success Modal */}
      {successData && (
        <ExpenseSuccessModal
          isVisible={showSuccessModal}
          onClose={closeModals}
          message={successData.message}
          expenses={successData.expenses}
          total={successData.total}
        />
      )}

      {/* Error Modal */}
      {errorData && (
        <ErrorModal
          isVisible={showErrorModal}
          onClose={closeModals}
          onRetry={retryRequest}
          message={errorData.message}
          hint={errorData.hint}
        />
      )}

      {/* Loading Overlay - shows during API processing */}
      {isSending && (
        <View className="absolute inset-0 bg-black/50 items-center justify-center">
          <View className="bg-white rounded-2xl p-8 py-16 items-center shadow-lg mx-8 min-w-80">
            {/* Loading Animation */}
            <View className="mb-6">
              <ActivityIndicator size="large" color="#9333ea" />
            </View>

            {/* Current Stage Title */}
            <Text className="text-xl font-semibold text-gray-800 mb-2 text-center">
              {loadingStages[loadingStage]?.title || "Processing..."}
            </Text>

            {/* Stage Description */}
            <Text className="text-gray-600 text-center leading-5 mb-6">
              {loadingStages[loadingStage]?.description || "Please wait..."}
            </Text>

            {/* Progress Bar */}
            <View className="w-full mb-4">
              <View className="bg-gray-200 h-2 rounded-full mb-4">
                <View
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                />
              </View>
              <Text className="text-xs text-gray-500 text-center">
                Stage {loadingStage + 1} of {loadingStages.length} •{" "}
                {Math.round(loadingProgress)}%
              </Text>
            </View>

            {/* Stage Indicators */}
            <View className="flex-row items-center gap-2">
              {loadingStages.map((_, index) => (
                <View
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < loadingStage
                      ? "bg-green-500"
                      : index === loadingStage
                      ? "bg-purple-600"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </View>

            {/* Stage Labels */}
            <View className="flex-row justify-center items-center w-full mt-4 gap-0 px-5">
              {loadingStages.map((stage, index) => (
                <Text
                  key={index}
                  className={`text-xs text-center w-1/4 ${
                    index < loadingStage
                      ? "text-green-600 font-medium"
                      : index === loadingStage
                      ? "text-purple-600 font-medium"
                      : "text-gray-400"
                  }`}
                  numberOfLines={2}
                >
                  {stage.shortTitle}
                </Text>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Add;
