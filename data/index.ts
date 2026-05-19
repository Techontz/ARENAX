import { ChatMessage, Plan } from '../types';

export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    user: 'Alex',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    message: 'What a goal! 😍',
    time: '12:45',
  },
  {
    id: '2',
    user: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    message: "Let's go Real! 👏",
    time: '12:45',
  },
  {
    id: '3',
    user: 'Sara',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
    message: 'Man City is playing well 💪',
    time: '12:45',
  },
  {
    id: '4',
    user: 'Mike',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    message: 'This match is crazy!',
    time: '12:45',
  },
  {
    id: '5',
    user: 'FootballFan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fan',
    message: 'Who will win this? 🤔',
    time: '12:45',
  },
];

export const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Premium Monthly',
    price: '1.99',
    features: [
      'Unlimited live streaming',
      '4K UHD HDR Quality',
      'Ad-free experience',
      'Exclusive match replays',
      'Cast to all devices',
    ],
  },
  {
    id: 'yearly',
    name: 'Premium Yearly',
    price: '19.99',
    features: [
      'All monthly features',
      'Save 20% compared to monthly',
      'Early access to documentaries',
      'VIP arena wallpapers',
      'Digital member card',
    ],
  },
];