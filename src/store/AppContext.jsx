import { createContext, useContext, useReducer, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext(null);

/* ===== SOCIETY RULEBOOK DATA ===== */
const SOCIETY_RULES = [
  {
    id: 'R001',
    number: 'Rule 1',
    category: 'General',
    title: 'Society Timings & Noise Policy',
    content: 'Quiet hours are strictly from 10:00 PM to 7:00 AM. No loud music, parties, or construction work during these hours. First violation results in a warning, subsequent violations may result in a fine of ₹500-₹2000.',
    keywords: ['noise', 'party', 'music', 'loud', 'timings', 'quiet', 'hours', 'sound', 'celebration', 'dj', 'shabad', 'shabd', 'gala', 'galaata']
  },
  {
    id: 'R002',
    number: 'Rule 2',
    category: 'Parking',
    title: 'Vehicle Parking Rules',
    content: 'Each flat is allotted one car parking and one two-wheeler parking space. Visitor parking is available on a first-come-first-served basis in the designated visitor area. Double parking is strictly prohibited and may result in a fine of ₹200 per incident.',
    keywords: ['parking', 'car', 'vehicle', 'bike', 'two-wheeler', 'visitor', 'double', 'gaadi', 'park', 'space', 'slot']
  },
  {
    id: 'R003',
    number: 'Rule 3',
    category: 'Pets',
    title: 'Pet Policy',
    content: 'Pets are allowed but must be on a leash in common areas. Pet owners are responsible for cleaning up after their pets. No pets allowed in the pool area, gym, or community hall. Aggressive breeds require additional registration.',
    keywords: ['pet', 'dog', 'cat', 'animal', 'leash', 'naayi', 'bekku', 'walking']
  },
  {
    id: 'R004',
    number: 'Rule 4',
    category: 'Maintenance',
    title: 'Monthly Maintenance Fee',
    content: 'Monthly maintenance fee of ₹3,500 is due by the 5th of every month. Late payment attracts an interest of 1.5% per month. Payment can be made via UPI, bank transfer, or cheque at the society office.',
    keywords: ['maintenance', 'fee', 'payment', 'due', 'monthly', 'hanavanu', 'money', 'charge', 'pay']
  },
  {
    id: 'R005',
    number: 'Rule 5',
    category: 'Amenities',
    title: 'Gym & Swimming Pool Usage',
    content: 'Gym timings: 5:30 AM - 10:00 AM and 4:00 PM - 9:00 PM. Swimming pool: 6:00 AM - 9:00 AM and 4:00 PM - 8:00 PM. Children under 12 must be accompanied by an adult in the pool area. Proper attire is mandatory.',
    keywords: ['gym', 'pool', 'swimming', 'exercise', 'fitness', 'workout', 'swim', 'timing', 'vyaayaama']
  },
  {
    id: 'R006',
    number: 'Rule 6',
    category: 'Amenities',
    title: 'Community Hall Booking',
    content: 'Community hall can be booked for events with a minimum 3-day advance booking. Deposit of ₹5,000 required. Maximum occupancy: 100 people. Events must end by 10:00 PM. Cleaning charges of ₹1,000 apply.',
    keywords: ['community', 'hall', 'booking', 'event', 'function', 'party', 'celebration', 'book', 'reserve', 'sabhaangana']
  },
  {
    id: 'R007',
    number: 'Rule 7',
    category: 'Security',
    title: 'Visitor & Guest Policy',
    content: 'All visitors must register at the security gate. Overnight guests must be pre-approved by the resident through the app or at the security office. Delivery personnel are not allowed beyond the lobby area without resident escort.',
    keywords: ['visitor', 'guest', 'security', 'gate', 'delivery', 'entry', 'register', 'bartanavar', 'visitor']
  },
  {
    id: 'R008',
    number: 'Rule 8',
    category: 'Waste Management',
    title: 'Waste Segregation & Disposal',
    content: 'Wet and dry waste must be segregated. Waste collection timings: 7:00 AM - 9:00 AM daily. No throwing waste from balconies. Bulk waste (furniture, electronics) must be coordinated with the housekeeping team.',
    keywords: ['waste', 'garbage', 'trash', 'segregation', 'disposal', 'kasa', 'kasada', 'collection', 'dustbin', 'clean']
  },
  {
    id: 'R009',
    number: 'Rule 9',
    category: 'Renovation',
    title: 'Interior Renovation Guidelines',
    content: 'All renovation work must be pre-approved by the management committee. Work permitted only between 9:00 AM - 5:00 PM on weekdays and 10:00 AM - 2:00 PM on Saturdays. No work on Sundays and public holidays. A refundable deposit of ₹10,000 is required.',
    keywords: ['renovation', 'construction', 'work', 'interior', 'remodel', 'repair', 'modify', 'change', 'kelasa']
  },
  {
    id: 'R010',
    number: 'Rule 10',
    category: 'General',
    title: 'Common Area Usage',
    content: 'Common areas including corridors, staircases, and lobbies must be kept clear. No personal belongings in common areas. Shoes/footwear racks are only allowed inside the flat entrance. Smoking is prohibited in all common areas.',
    keywords: ['common', 'area', 'corridor', 'lobby', 'staircase', 'smoking', 'shoes', 'belongings', 'public']
  }
];

/* ===== AMENITIES DATA ===== */
const AMENITIES = [
  { name: 'Gym / Fitness Center', timings: '5:30 AM - 10:00 AM, 4:00 PM - 9:00 PM', status: 'Open', icon: '🏋️' },
  { name: 'Swimming Pool', timings: '6:00 AM - 9:00 AM, 4:00 PM - 8:00 PM', status: 'Open', icon: '🏊' },
  { name: 'Community Hall', timings: '9:00 AM - 10:00 PM (Booking Required)', status: 'Available', icon: '🏛️' },
  { name: 'Indoor Badminton Court', timings: '6:00 AM - 10:00 PM', status: 'Open', icon: '🏸' },
  { name: 'Children\'s Play Area', timings: '7:00 AM - 8:00 PM', status: 'Open', icon: '🛝' },
  { name: 'Rooftop Garden', timings: '6:00 AM - 9:00 PM', status: 'Open', icon: '🌿' },
  { name: 'Library & Reading Room', timings: '8:00 AM - 9:00 PM', status: 'Open', icon: '📚' },
  { name: 'EV Charging Station', timings: '24/7', status: 'Available', icon: '⚡' },
];

/* ===== EVENTS DATA ===== */
const EVENTS = [
  {
    id: 'E001',
    title: 'Ugadi Celebration 2026',
    date: '2026-04-20',
    time: '5:00 PM - 9:00 PM',
    location: 'Community Hall',
    description: 'Join us for a grand Ugadi celebration with rangoli, cultural performances, and a potluck dinner.',
    type: 'Festival'
  },
  {
    id: 'E002',
    title: 'Monthly Society Meeting',
    date: '2026-04-25',
    time: '7:00 PM - 8:30 PM',
    location: 'Community Hall',
    description: 'Monthly general body meeting to discuss maintenance, security updates, and upcoming projects.',
    type: 'Meeting'
  },
  {
    id: 'E003',
    title: 'Kids Summer Camp Registration',
    date: '2026-05-01',
    time: '10:00 AM - 12:00 PM',
    location: 'Children\'s Play Area',
    description: 'Register your kids for the summer camp. Activities include art, dance, yoga, and swimming.',
    type: 'Activity'
  },
  {
    id: 'E004',
    title: 'Yoga & Meditation Workshop',
    date: '2026-04-22',
    time: '6:30 AM - 8:00 AM',
    location: 'Rooftop Garden',
    description: 'Free yoga and meditation session led by certified instructor. Open to all residents.',
    type: 'Wellness'
  },
];

/* ===== SERVICES DATA ===== */
const SERVICES = [
  {
    id: 'S001',
    name: 'Plumber',
    description: 'Pipe repairs, tap fixing, bathroom leaks, water heater installation and maintenance.',
    icon: '🔧',
    color: 'rgba(59, 130, 246, 0.12)',
    textColor: '#60a5fa',
    available: true,
    provider: 'Raju Kumar',
    phone: '+91 98450 XXXXX',
    rate: '₹300 - ₹1,500'
  },
  {
    id: 'S002',
    name: 'Electrician',
    description: 'Wiring fixes, MCB/switch board repair, fan installation, inverter setup and maintenance.',
    icon: '⚡',
    color: 'rgba(245, 158, 11, 0.12)',
    textColor: '#fbbf24',
    available: true,
    provider: 'Venkatesh M.',
    phone: '+91 97310 XXXXX',
    rate: '₹200 - ₹2,000'
  },
  {
    id: 'S003',
    name: 'Carpenter',
    description: 'Furniture repair, door/window fixing, custom woodwork, kitchen cabinet installation.',
    icon: '🪚',
    color: 'rgba(168, 85, 247, 0.12)',
    textColor: '#a78bfa',
    available: true,
    provider: 'Siddappa G.',
    phone: '+91 86600 XXXXX',
    rate: '₹500 - ₹3,000'
  },
  {
    id: 'S004',
    name: 'House Cleaning',
    description: 'Deep cleaning, regular cleaning, kitchen cleaning, bathroom sanitization.',
    icon: '🧹',
    color: 'rgba(16, 185, 129, 0.12)',
    textColor: '#34d399',
    available: true,
    provider: 'CleanPro Services',
    phone: '+91 80500 XXXXX',
    rate: '₹800 - ₹2,500'
  },
  {
    id: 'S005',
    name: 'Laundry / Ironing',
    description: 'Wash & fold, dry cleaning, ironing service. Pickup and delivery available.',
    icon: '👕',
    color: 'rgba(236, 72, 153, 0.12)',
    textColor: '#f472b6',
    available: true,
    provider: 'SparkWash',
    phone: '+91 77600 XXXXX',
    rate: '₹15 - ₹100 per piece'
  },
  {
    id: 'S006',
    name: 'AC Service & Repair',
    description: 'AC servicing, gas refill, installation, and annual maintenance contracts.',
    icon: '❄️',
    color: 'rgba(6, 182, 212, 0.12)',
    textColor: '#22d3ee',
    available: false,
    provider: 'CoolTech Solutions',
    phone: '+91 99020 XXXXX',
    rate: '₹400 - ₹3,000'
  },
];

/* ===== INITIAL STATE ===== */
const initialState = {
  user: null,
  isAuthenticated: false,
  currentPage: 'dashboard',
  tickets: [
    {
      id: 'TKT-001',
      title: 'Water supply interrupted in B-Block',
      category: 'Water Supply',
      priority: 'high',
      status: 'open',
      flat: 'B-204',
      resident: 'Ramesh Gowda',
      description: 'No water supply since morning 6 AM in B-Block, 2nd floor.',
      createdAt: '2026-04-15T08:30:00',
      language: 'English'
    },
    {
      id: 'TKT-002',
      title: 'Lift not working in Tower A',
      category: 'Electrical',
      priority: 'high',
      status: 'in-progress',
      flat: 'A-701',
      resident: 'Priya Hegde',
      description: 'Tower A lift stuck on 3rd floor since yesterday evening.',
      createdAt: '2026-04-14T18:45:00',
      language: 'English'
    },
    {
      id: 'TKT-003',
      title: 'Garden lights are broken',
      category: 'Electrical',
      priority: 'low',
      status: 'resolved',
      flat: 'C-102',
      resident: 'Suresh Shetty',
      description: 'Multiple garden lights near C-Block entrance are not working.',
      createdAt: '2026-04-13T10:15:00',
      language: 'English'
    },
  ],
  serviceBookings: [],
  chatMessages: [
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: 'ನಮಸ್ಕಾರ! 🙏 Welcome to Panchayat AI Assistant. I can help you with:\n\n• **Report issues** — Tell me your problem, I\'ll create a ticket\n• **Book services** — Plumber, Electrician, Cleaning, etc.\n• **Society rules** — Ask any question about society bylaws\n• **Events & Amenities** — Check timings, book halls\n\nHow can I help you today?',
      timestamp: new Date().toISOString()
    }
  ],
  rules: SOCIETY_RULES,
  amenities: AMENITIES,
  events: EVENTS,
  services: SERVICES,
  toasts: [],
  language: 'en',
  sidebarOpen: false,
};

/* ===== CATEGORIES ===== */
const TICKET_CATEGORIES = [
  'Electrical', 'Plumbing', 'Water Supply', 'Security',
  'Lift/Elevator', 'Parking', 'Cleanliness', 'Noise',
  'Pest Control', 'Internet/Cable', 'Other'
];

/* ===== REDUCER ===== */
function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };

    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, currentPage: 'dashboard' };

    case 'SET_PAGE':
      return { ...state, currentPage: action.payload, sidebarOpen: false };

    case 'ADD_TICKET': {
      const ticket = {
        id: `TKT-${String(state.tickets.length + 1).padStart(3, '0')}`,
        ...action.payload,
        status: 'open',
        createdAt: new Date().toISOString()
      };
      return { ...state, tickets: [ticket, ...state.tickets] };
    }

    case 'UPDATE_TICKET_STATUS': {
      const updated = state.tickets.map(t =>
        t.id === action.payload.id ? { ...t, status: action.payload.status } : t
      );
      return { ...state, tickets: updated };
    }

    case 'ADD_SERVICE_BOOKING': {
      const booking = {
        id: `BKG-${uuidv4().slice(0, 6).toUpperCase()}`,
        ...action.payload,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      return { ...state, serviceBookings: [booking, ...state.serviceBookings] };
    }

    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };

    case 'ADD_TOAST': {
      const toast = { id: uuidv4(), ...action.payload };
      return { ...state, toasts: [...state.toasts, toast] };
    }

    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };

    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    default:
      return state;
  }
}

/* ===== AI LOGIC ===== */
function detectCategory(text) {
  const lower = text.toLowerCase();
  const categoryMap = {
    'Electrical': ['light', 'switch', 'power', 'electricity', 'fan', 'mcb', 'wiring', 'current', 'diipa', 'batti', 'bijli', 'bijlee', 'lift stuck', 'short circuit', 'bulb', 'fuse'],
    'Plumbing': ['pipe', 'leak', 'tap', 'drain', 'clogged', 'toilet', 'flush', 'nala', 'leakage', 'overflow', 'bathroom', 'sink'],
    'Water Supply': ['water', 'neeru', 'paani', 'pani', 'supply', 'tank', 'pump', 'bore', 'nahi aa raha', 'nai ata'],
    'Security': ['security', 'guard', 'theft', 'gate', 'cctv', 'camera', 'suspicious', 'kaLLa', 'stranger', 'break in', 'entry'],
    'Lift/Elevator': ['lift', 'elevator', 'stuck', 'lift kharab', 'lift band', 'floor'],
    'Parking': ['parking', 'car', 'vehicle', 'bike', 'gaadi', 'park', 'double park', 'blocked'],
    'Cleanliness': ['clean', 'garbage', 'waste', 'dirty', 'smell', 'kasa', 'sweeping', 'trash', 'dustbin', 'ganda', 'gandagi'],
    'Noise': ['noise', 'loud', 'music', 'shouting', 'disturbance', 'galaata', 'shor', 'awaaz', 'party noise'],
    'Pest Control': ['pest', 'cockroach', 'rat', 'mosquito', 'insect', 'bug', 'jivra', 'chuha', 'kide'],
    'Internet/Cable': ['internet', 'wifi', 'cable', 'tv', 'broadband', 'network', 'connection', 'signal'],
  };
  for (const [category, keywords] of Object.entries(categoryMap)) {
    if (keywords.some(kw => lower.includes(kw))) return category;
  }
  return 'Other';
}

function detectPriority(text) {
  const lower = text.toLowerCase();
  const highWords = [
    'urgent', 'emergency', 'immediately', 'dangerous', 'stuck', 'fire', 'flood',
    'broken', 'not working', 'no water', 'no power', 'bega', 'jaldi', 'abhi',
    'turant', 'puri raat', 'since morning', 'since yesterday', 'kharab', 'band ho gaya'
  ];
  const mediumWords = [
    'issue', 'problem', 'complaint', 'fix', 'repair', 'samasyE', 'thoda', 'please',
    'karein', 'karo', 'chahiye', 'bhejna', 'bhejdo'
  ];
  if (highWords.some(w => lower.includes(w))) return 'high';
  if (mediumWords.some(w => lower.includes(w))) return 'medium';
  return 'low';
}

function searchRules(query) {
  const lower = query.toLowerCase();
  return SOCIETY_RULES.filter(rule => {
    const inKeywords = rule.keywords.some(kw => lower.includes(kw));
    const inTitle = rule.title.toLowerCase().includes(lower);
    const inContent = rule.content.toLowerCase().includes(lower);
    return inKeywords || inTitle || inContent;
  });
}

function detectIntent(text) {
  const lower = text.toLowerCase();

  // Maintenance / payment
  const maintenanceKeywords = [
    'maintenance', 'fee', 'payment', 'due', 'pay', 'paisa', 'paise', 'bill',
    'hanavanu', 'monthly charge', 'society fee', 'kitna dena hai', 'kab dena'
  ];
  if (maintenanceKeywords.some(w => lower.includes(w))) return { type: 'maintenance' };

  // Service request
  const serviceKeywords = [
    'book', 'need', 'send', 'call', 'plumber', 'electrician', 'carpenter',
    'cleaning', 'laundry', 'ac service', 'repair', 'kelasa', 'beku',
    'kalisbeeku', 'chahiye', 'bhejo', 'bulao', 'bhejna', 'karwa do'
  ];
  if (serviceKeywords.some(w => lower.includes(w))) {
    if (lower.includes('plumb') || lower.includes('pipe') || lower.includes('nala') || lower.includes('tap') || lower.includes('pani leak')) return { type: 'service', service: 'Plumber' };
    if (lower.includes('electric') || lower.includes('wiring') || lower.includes('switch') || lower.includes('fan') || lower.includes('bijli')) return { type: 'service', service: 'Electrician' };
    if (lower.includes('carpenter') || lower.includes('wood') || lower.includes('door') || lower.includes('furniture') || lower.includes('darwaza')) return { type: 'service', service: 'Carpenter' };
    if (lower.includes('clean') || lower.includes('sweeping') || lower.includes('jhadu') || lower.includes('safai')) return { type: 'service', service: 'House Cleaning' };
    if (lower.includes('laundry') || lower.includes('iron') || lower.includes('wash') || lower.includes('dhulai')) return { type: 'service', service: 'Laundry / Ironing' };
    if (lower.includes('ac') || lower.includes('air condition') || lower.includes('cooler')) return { type: 'service', service: 'AC Service & Repair' };
    return { type: 'service', service: null };
  }

  // Rule / policy question
  const ruleKeywords = [
    'rule', 'policy', 'allowed', 'can i', 'is it', 'timing', 'time', 'when',
    'what time', 'permit', 'niyama', 'allow', 'kab tak', 'kitne baje',
    'kar sakte', 'milega', 'allowed hai', 'band hota hai'
  ];
  if (ruleKeywords.some(w => lower.includes(w))) return { type: 'rule', query: text };

  // Event / amenity question
  const eventKeywords = [
    'event', 'happening', 'celebration', 'festival', 'meeting', 'yoga',
    'camp', 'program', 'kaaryakrama', 'kya chal raha', 'kya ho raha'
  ];
  if (eventKeywords.some(w => lower.includes(w))) return { type: 'event' };

  const amenityKeywords = [
    'gym', 'pool', 'swimming', 'hall', 'court', 'library', 'garden',
    'charging', 'play area', 'amenity', 'facility', 'badminton', 'rooftop'
  ];
  if (amenityKeywords.some(w => lower.includes(w))) return { type: 'amenity' };

  // Greeting
  const greetings = [
    'hello', 'hi', 'hey', 'namaskara', 'namaste', 'good morning', 'good evening',
    'helo', 'namaskaara', 'hii', 'haai', 'sups', 'wassup', 'kya haal', 'kaise ho'
  ];
  if (greetings.some(w => lower.includes(w))) return { type: 'greeting' };

  // Thank you / done
  const thanksKeywords = ['thank', 'thanks', 'shukriya', 'dhanyavaad', 'ok', 'noted', 'great', 'perfect', 'got it'];
  if (thanksKeywords.some(w => lower.includes(w))) return { type: 'thanks' };

  // Default: treat as complaint
  return { type: 'complaint' };
}

function generateAIResponse(text, state, dispatch) {
  const intent = detectIntent(text);

  switch (intent.type) {
    case 'greeting':
      return `ನಮಸ್ಕಾರ! 🙏 Welcome, ${state.user?.name || 'Resident'}!\n\nI'm your **Panchayat AI Assistant**. Here's what I can do:\n\n• 🎫 **Report issues** — Pani nahi? Bijli gayi? Tell me!\n• 🔧 **Book services** — Plumber, Electrician, Cleaning\n• 📜 **Society rules** — Ask anything about bylaws\n• 📅 **Events & timings** — Gym, pool, community hall\n• 💳 **Maintenance** — Check dues and payment info\n\nKaisi madad chahiye aapko? ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`;

    case 'thanks':
      return `You're welcome! 😊 Is there anything else I can help you with?\n\nनिसंकोच पूछिए — feel free to ask anytime. 🙏`;

    case 'maintenance':
      return `💳 **Maintenance Fee Details:**\n\n• **Monthly Fee:** ₹3,500 per flat\n• **Due Date:** 5th of every month\n• **Late Fee:** ₹52/day after due date\n\n**Payment Methods:**\n• 📱 UPI: srinivasa.residency@icici\n• 🏦 NEFT/Bank transfer (details in Payments section)\n• 🧾 Cheque at Admin Office (9AM–6PM)\n\n**April 2026 status:** ⚠️ Pending\n\nGo to the **Payments** section to pay instantly. ₹3,500 abhi baaki hai! 💡`;

    case 'complaint': {
      const category = detectCategory(text);
      const priority = detectPriority(text);
      const ticketId = `TKT-${String(state.tickets.length + 1).padStart(3, '0')}`;
      const priorityEmoji = priority === 'high' ? '🔴' : priority === 'medium' ? '🟡' : '🟢';

      dispatch({
        type: 'ADD_TICKET',
        payload: {
          title: text.length > 60 ? text.substring(0, 60) + '...' : text,
          category,
          priority,
          flat: state.user?.flat || 'Unknown',
          resident: state.user?.name || 'Resident',
          description: text,
          language: 'Auto-detected'
        }
      });

      return `✅ **Complaint Registered Successfully!**\n\n📋 **Ticket Details:**\n• **ID:** ${ticketId}\n• **Category:** ${category}\n• **Priority:** ${priorityEmoji} ${priority.charAt(0).toUpperCase() + priority.slice(1)}\n• **Status:** 🔵 Open\n• **Flat:** ${state.user?.flat || 'N/A'}\n• **Resident:** ${state.user?.name}\n\nOur **${category}** team has been notified${priority === 'high' ? ' and will respond **immediately**' : ' and will address this shortly'}.\n\nTrack your complaint in the **Complaints** section. ನಿಮ್ಮ ದೂರನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ! 🙏`;
    }

    case 'service': {
      if (intent.service) {
        const service = state.services.find(s => s.name === intent.service);
        if (service) {
          return `${service.icon} **${service.name} Service**\n\n• **Provider:** ${service.provider}\n• **Rate:** ${service.rate}\n• **Status:** ${service.available ? '✅ Available now' : '❌ Currently Unavailable'}\n\n${service.available
            ? `To book, go to the **Services** section and select your preferred time slot.\n\nChahiye toh abhi book karo! ಸೇವೆ ಲಭ್ಯವಿದೆ! 🔧`
            : `This service is temporarily unavailable. Please check back tomorrow or contact the admin. ಸೇವೆ ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ.`
          }`;
        }
      }
      return `🔧 **Available Services:**\n\n• 🪠 Plumber — Raju Kumar\n• ⚡ Electrician — Venkatesh M.\n• 🪚 Carpenter — Siddappa G.\n• 🧹 House Cleaning — CleanPro Services\n• 👕 Laundry/Ironing — SparkWash\n• ❄️ AC Service — CoolTech Solutions\n\nKaunsi service chahiye? Visit the **Services** section to book. ಯಾವ ಸೇವೆ ಬೇಕು?`;
    }

    case 'rule': {
      const matchedRules = searchRules(text);
      if (matchedRules.length > 0) {
        const ruleTexts = matchedRules.slice(0, 2).map(r =>
          `📜 **${r.number}: ${r.title}**\n${r.content}`
        ).join('\n\n');
        return `Society Rule Book ke anusar:\n\n${ruleTexts}\n\n*For complete rules, visit the **Rules** section.* ನಿಯಮ ಪುಸ್ತಕದ ಪ್ರಕಾರ ಮೇಲಿನ ಮಾಹಿತಿ.`;
      }
      return `Sorry, I couldn't find a specific rule for your query. 🙏\n\nTry searching with keywords like:\n• "parking", "gym timing", "pet policy", "noise", "party"\n\nYa phir **Rules** section mein browse karein. ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಸಂಬಂಧಿತ ನಿಯಮ ಸಿಗಲಿಲ್ಲ.`;
    }

    case 'event': {
      const eventList = state.events.map(e =>
        `• 🗓 **${e.title}**\n   ${new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} at ${e.time} — ${e.location}`
      ).join('\n');
      return `📅 **Upcoming Society Events:**\n\n${eventList}\n\n_For full details and RSVP, visit the **Events** section._ ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು ಮೇಲಿನಂತಿವೆ! 🎉`;
    }

    case 'amenity': {
      const amenityList = state.amenities.map(a =>
        `• ${a.icon} **${a.name}** — ${a.timings}`
      ).join('\n');
      return `🏢 **Society Amenity Timings:**\n\n${amenityList}\n\n_Proper attire required. Children under 12 must be accompanied by adults in pool area._ ಸೌಲಭ್ಯಗಳ ಸಮಯ ಮೇಲಿನಂತಿವೆ!`;
    }

    default:
      return `Hmm, I'm not sure I understood that. 🤔\n\nYou can try:\n• **Reporting a problem:** "Lift kharab ho gayi"\n• **Booking a service:** "Mujhe plumber chahiye"\n• **Asking a rule:** "Can I have parties till midnight?"\n• **Checking events:** "Koi event hai kya?"\n\nDayavittu matthe heliree — please rephrase and try again. 🙏`;
  }
}

/* ===== PROVIDER ===== */
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addToast = useCallback((message, type = 'success') => {
    const id = uuidv4();
    dispatch({ type: 'ADD_TOAST', payload: { message, type } });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), 4000);
  }, []);

  const processMessage = useCallback((text) => {
    // Add user message
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: {
        id: uuidv4(),
        role: 'user',
        content: text,
        timestamp: new Date().toISOString()
      }
    });

    // Generate AI response with slight delay for realism
    setTimeout(() => {
      const response = generateAIResponse(text, state, dispatch);
      dispatch({
        type: 'ADD_CHAT_MESSAGE',
        payload: {
          id: uuidv4(),
          role: 'assistant',
          content: response,
          timestamp: new Date().toISOString()
        }
      });
    }, 800);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch, addToast, processMessage, searchRules, TICKET_CATEGORIES }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export default AppContext;
