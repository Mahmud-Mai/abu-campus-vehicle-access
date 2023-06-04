import { AiOutlineScan } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { BiCheckShield } from 'react-icons/bi';
import { BiReceipt } from 'react-icons/bi';
import { VscAccount } from 'react-icons/vsc';

export const navItems = [
  {
    text: 'Dashboard',
    icon: <MdDashboard />,
    link: 'dashboard',
  },
  {
    text: 'Vehicle Check-In',
    icon: <AiOutlineScan />,
    link: 'check-in',
  },
  {
    text: 'Vehicle Check-out',
    icon: <BiCheckShield />,
    link: 'check-out',
  },
  {
    text: 'Tickets',
    icon: <BiReceipt />,
    link: 'tickets',
  },
  {
    text: 'User Profile',
    icon: <VscAccount />,
    link: 'account',
  },
];

export const randomPlateNos = [
  'ABC-123AA',
  'ABD-456AB',
  'ACE-789AC',
  'ADE-012AD',
  'AEF-345AE',
  'BCG-678BA',
  'BCH-901BB',
  'BCD-234BC',
  'BCE-567BD',
  'BCF-890BE',
  'CDG-012CA',
  'CDH-345CB',
  'CDC-678CC',
  'CDE-901CD',
  'CDF-234CE',
  'DEG-567DA',
  'DEH-890DB',
  'DEC-123DC',
  'DEE-456DE',
  'DEF-789DF',
];
