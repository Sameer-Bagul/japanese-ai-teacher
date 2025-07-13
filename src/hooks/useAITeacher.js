const { create } = require("zustand");

export const teachers = ["Nanami", "Naoki"];

// Helper function to get Japanese voices
const getJapaneseVoices = () => {
  if (!('speechSynthesis' in window)) return [];
  
  const voices = speechSynthesis.getVoices();
  return voices.filter(voice => 
    voice.lang.includes('ja') || voice.lang.includes('JP')
  );
};

// Helper function to get preferred voice for teacher
const getTeacherVoice = (teacherName) => {
  const voices = getJapaneseVoices();
  
  // Try to find a female voice for Nanami and male voice for Naoki
  if (teacherName === "Nanami") {
    return voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('nanami')
    ) || voices[0];
  } else if (teacherName === "Naoki") {
    return voices.find(voice => 
      voice.name.toLowerCase().includes('male') || 
      voice.name.toLowerCase().includes('man') ||
      voice.name.toLowerCase().includes('naoki')
    ) || voices[1] || voices[0];
  }
  
  return voices[0];
};

export const useAITeacher = create((set, get) => ({
  messages: [],
  currentMessage: null,
  teacher: teachers[0],
  setTeacher: (teacher) => {
    set(() => ({
      teacher,
      messages: get().messages.map((message) => {
        message.speechUtterance = null; // New teacher, reset speech utterance
        return message;
      }),
    }));
  },
  classroom: "default",
  setClassroom: (classroom) => {
    set(() => ({
      classroom,
    }));
  },
  loading: false,
  furigana: true,
  setFurigana: (furigana) => {
    set(() => ({
      furigana,
    }));
  },
  english: true,
  setEnglish: (english) => {
    set(() => ({
      english,
    }));
  },
  speech: "formal",
  setSpeech: (speech) => {
    set(() => ({
      speech,
    }));
  },
  askAI: async (question) => {
    if (!question) {
      return;
    }
    const message = {
      question,
      id: get().messages.length,
    };
    set(() => ({
      loading: true,
    }));

    const speech = get().speech;

    // Ask AI
    const res = await fetch(`/api/ai?question=${question}&speech=${speech}`);
    const data = await res.json();
    message.answer = data;
    message.speech = speech;

    set(() => ({
      currentMessage: message,
    }));

    set((state) => ({
      messages: [...state.messages, message],
      loading: false,
    }));
    get().playMessage(message);
  },
  playMessage: async (message) => {
    set(() => ({
      currentMessage: message,
    }));

    if (!message.speechUtterance) {
      set(() => ({
        loading: true,
      }));

      // Use Web Speech API for TTS (browser-based, free)
      const text = message.answer.japanese
        .map((word) => word.word)
        .join(" ");

      // Check if speech synthesis is supported
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set basic properties first
        utterance.lang = 'ja-JP';
        utterance.rate = 0.8; // Slightly slower for learning
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        utterance.onend = () => {
          set(() => ({
            currentMessage: null,
          }));
        };

        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          set(() => ({
            currentMessage: null,
            loading: false,
          }));
        };

        // Wait for voices to load if they haven't already
        const setVoiceAndPlay = () => {
          const preferredVoice = getTeacherVoice(get().teacher);
          
          if (preferredVoice) {
            utterance.voice = preferredVoice;
          }
          
          message.speechUtterance = utterance;
          
          set(() => ({
            loading: false,
            messages: get().messages.map((m) => {
              if (m.id === message.id) {
                return message;
              }
              return m;
            }),
          }));

          // Stop any currently playing speech
          speechSynthesis.cancel();
          
          // Play the speech
          speechSynthesis.speak(utterance);
        };

        // Voices might not be loaded yet
        if (speechSynthesis.getVoices().length === 0) {
          speechSynthesis.onvoiceschanged = setVoiceAndPlay;
        } else {
          setVoiceAndPlay();
        }
      } else {
        console.warn('Speech synthesis not supported in this browser');
        set(() => ({
          loading: false,
        }));
        return;
      }
    } else {
      // Stop any currently playing speech
      speechSynthesis.cancel();
      
      // Play the existing speech utterance
      speechSynthesis.speak(message.speechUtterance);
    }
  },
  stopMessage: (message) => {
    // Stop speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    set(() => ({
      currentMessage: null,
    }));
  },
}));
