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
