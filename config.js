// ==========================================
// 💖 Girlfriend Proposal Website Configuration
// Easily customize names, messages, memories, and photos!
// ==========================================

const PROPOSAL_CONFIG = {
  // Names
  herName: "My Love",        // Change to her name (e.g. "Emma", "Sophia", "Maya")
  yourName: "Yours Forever", // Change to your name (e.g. "Alex", "David", "Ryan")
  herNickname: "Sweetheart", // Optional cute nickname

  // The Big Question
  questionTitle: "Will you be my girlfriend?",
  questionSubtitle: "Every moment with you feels like pure magic. I want to make it official!",

  // Reasons Why I Love You
  reasons: [
    {
      emoji: "✨",
      title: "Your Contagious Smile",
      desc: "The way your eyes light up whenever you laugh makes my whole day brighter."
    },
    {
      emoji: "🧁",
      title: "Your Sweet Heart",
      desc: "How deeply you care for people and the little gentle things you do every day."
    },
    {
      emoji: "🎶",
      title: "Our Silly Conversations",
      desc: "How we can talk for hours about everything and nothing and never get bored."
    },
    {
      emoji: "🌟",
      title: "You Feel Like Home",
      desc: "Wherever I am, being with you is where I feel most happy, peaceful, and true."
    },
    {
      emoji: "☕",
      title: "Every Little Adventure",
      desc: "Even a simple coffee run or a quiet walk turns into the best memory with you."
    },
    {
      emoji: "💫",
      title: "Simply You",
      desc: "You are wonderfully, effortlessly you, and that's the best thing in the world."
    }
  ],

  // Romantic Memories / Photo Cards (Updated with your photos!)
  memories: [
    {
      caption: "The day we first met",
      date: "Where It All Began",
      image: "images/photo1.jpg",
      fallbackEmoji: "🌸"
    },
    {
      caption: "Our silly, sweet moments",
      date: "Pure Happiness",
      image: "images/photo2.jpg",
      fallbackEmoji: "💄"
    },
    {
      caption: "Every kiss with you",
      date: "Golden Moments",
      image: "images/photo3.jpg",
      fallbackEmoji: "💋"
    },
    {
      caption: "Just you and me",
      date: "My Favorite Place",
      image: "images/photo4.jpg",
      fallbackEmoji: "💖"
    }
  ],

  // Playful phrases when she tries to click "NO"
  noButtonPhrases: [
    "No? Wait, think again! 🥺",
    "Are you really sure? 💔",
    "Wrong button, cutie! 😉",
    "I'll buy you your favorite treats! 🍫",
    "Don't do this to me! 😭",
    "You can't escape my love! 🏃‍♂️💨",
    "Look at the other button! 👉",
    "100% guarantee of cuddles & laughs! 🧸",
    "Please say yes! 🥹❤️",
    "Nice try, it won't let you! 😜"
  ],

  // Celebration Message (Shown when she clicks YES)
  celebration: {
    title: "SHE SAID YES! 🎉💖",
    subtitle: "You just made me the happiest person in the entire universe!",
    message: "I promise to always make you laugh, cherish your smile, hold your hand through everything, and love you more and more every single day.",
    whatsappMessage: "I said YES! ❤️ Officially yours! 💑💍",
    certificateDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  },

  // Audio / Music Settings
  music: {
    autoStartOnOpen: true,
    volume: 0.35,
    customAudioUrl: ""
  }
};
