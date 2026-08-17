import React from 'react';
import { 
  Zap, 
  HardHat, 
  HeartPulse, 
  Trees, 
  Flame, 
  Stethoscope, 
  Leaf, 
  Shield, 
  Car, 
  Receipt, 
  Home, 
  Bus, 
  ShieldCheck, 
  GraduationCap, 
  HandHeart, 
  Building,
  HelpCircle
} from 'lucide-react';

export default function DepartmentIcon({ name, className = "w-5 h-5" }) {
  switch (name) {
    case 'Zap': return <Zap className={className} />;
    case 'HardHat': return <HardHat className={className} />;
    case 'HeartPulse': return <HeartPulse className={className} />;
    case 'Trees': return <Trees className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Stethoscope': return <Stethoscope className={className} />;
    case 'Leaf': return <Leaf className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Car': return <Car className={className} />;
    case 'Receipt': return <Receipt className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Bus': return <Bus className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'HandHeart': return <HandHeart className={className} />;
    case 'Building': return <Building className={className} />;
    default: return <HelpCircle className={className} />;
  }
}