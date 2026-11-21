import React from 'react';
import {P} from './theme';

type IP = {size?: number; color?: string};

const Svg: React.FC<{size: number; children: React.ReactNode}> = ({size, children}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    {children}
  </svg>
);

/** A little person, used for the "1 in 3" crowds. */
export const PersonIcon: React.FC<IP & {q?: boolean}> = ({size = 90, color = P.teal, q = false}) => (
  <Svg size={size}>
    <circle cx={50} cy={26} r={17} fill={color} />
    <path d="M22 96 L22 66 Q22 48 50 48 Q78 48 78 66 L78 96 Z" fill={color} />
    {q ? (
      <text x={50} y={34} textAnchor="middle" fontSize={26} fontWeight={900} fill="#fff" fontFamily="Lato, sans-serif">
        ?
      </text>
    ) : null}
  </Svg>
);

export const DropIcon: React.FC<IP> = ({size = 90, color = P.coral}) => (
  <Svg size={size}>
    <path d="M50 6 C50 6 18 44 18 64 a32 32 0 0 0 64 0 C82 44 50 6 50 6 Z" fill={color} />
    <ellipse cx={38} cy={64} rx={7} ry={12} fill="#fff" opacity={0.45} transform="rotate(20 38 64)" />
  </Svg>
);

export const CalendarIcon: React.FC<IP & {label?: string}> = ({size = 90, color = P.purple, label}) => (
  <Svg size={size}>
    <rect x={12} y={20} width={76} height={68} rx={12} fill="#fff" stroke={color} strokeWidth={6} />
    <rect x={12} y={20} width={76} height={24} rx={12} fill={color} />
    <rect x={30} y={10} width={8} height={18} rx={4} fill={color} />
    <rect x={62} y={10} width={8} height={18} rx={4} fill={color} />
    {label ? (
      <text x={50} y={78} textAnchor="middle" fontSize={34} fontWeight={900} fill={color} fontFamily="Lato, sans-serif">
        {label}
      </text>
    ) : (
      <>
        <rect x={26} y={54} width={12} height={10} rx={3} fill={color} />
        <rect x={44} y={54} width={12} height={10} rx={3} fill={color} />
        <rect x={62} y={54} width={12} height={10} rx={3} fill={color} />
        <rect x={26} y={70} width={12} height={10} rx={3} fill={color} />
      </>
    )}
  </Svg>
);

export const FamilyIcon: React.FC<IP> = ({size = 90, color = P.teal}) => (
  <Svg size={size}>
    <circle cx={34} cy={28} r={14} fill={color} />
    <path d="M10 88 L10 64 Q10 46 34 46 Q58 46 58 64 L58 88 Z" fill={color} />
    <circle cx={70} cy={46} r={11} fill={P.sun} />
    <path d="M52 88 L52 72 Q52 58 70 58 Q88 58 88 72 L88 88 Z" fill={P.sun} />
  </Svg>
);

export const ScaleIcon: React.FC<IP> = ({size = 90, color = P.sun}) => (
  <Svg size={size}>
    <rect x={12} y={14} width={76} height={74} rx={16} fill={color} />
    <path d="M28 50 A22 22 0 0 1 72 50" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" />
    <line x1={50} y1={50} x2={60} y2={34} stroke="#fff" strokeWidth={6} strokeLinecap="round" />
    <rect x={26} y={66} width={48} height={8} rx={4} fill="#fff" opacity={0.7} />
  </Svg>
);

export const SofaIcon: React.FC<IP> = ({size = 90, color = P.coral}) => (
  <Svg size={size}>
    <rect x={20} y={26} width={60} height={34} rx={14} fill={color} opacity={0.8} />
    <rect x={8} y={46} width={84} height={28} rx={14} fill={color} />
    <rect x={18} y={74} width={8} height={12} rx={3} fill={color} />
    <rect x={74} y={74} width={8} height={12} rx={3} fill={color} />
  </Svg>
);

export const HeartIcon: React.FC<IP> = ({size = 90, color = P.coral}) => (
  <Svg size={size}>
    <path d="M50 88 C8 58 12 20 34 20 C44 20 50 28 50 32 C50 28 56 20 66 20 C88 20 92 58 50 88 Z" fill={color} />
    <polyline points="20,52 36,52 42,38 54,66 60,52 80,52" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PregnantIcon: React.FC<IP> = ({size = 90, color = P.purple}) => (
  <Svg size={size}>
    <circle cx={42} cy={20} r={12} fill={color} />
    <path d="M30 34 Q42 28 52 36 L56 60 Q70 62 70 76 Q70 90 54 90 L34 90 L34 62 Q26 48 30 34 Z" fill={color} />
    <circle cx={58} cy={64} r={20} fill={color} />
    <circle cx={62} cy={66} r={7} fill="#fff" opacity={0.55} />
  </Svg>
);

export const CholesterolIcon: React.FC<IP> = ({size = 90, color = P.sun}) => (
  <Svg size={size}>
    <path d="M50 8 C50 8 20 42 20 62 a30 30 0 0 0 60 0 C80 42 50 8 50 8 Z" fill={color} />
    <circle cx={42} cy={56} r={6} fill="#fff" opacity={0.8} />
    <circle cx={60} cy={66} r={8} fill="#fff" opacity={0.8} />
    <circle cx={46} cy={74} r={5} fill="#fff" opacity={0.8} />
  </Svg>
);

export const PcosIcon: React.FC<IP> = ({size = 90, color = P.teal}) => (
  <Svg size={size}>
    <circle cx={50} cy={50} r={40} fill={color} />
    <text x={50} y={58} textAnchor="middle" fontSize={26} fontWeight={900} fill="#fff" fontFamily="Lato, sans-serif">
      PCOS
    </text>
  </Svg>
);

export const PlateIcon: React.FC<IP> = ({size = 90, color = P.teal}) => (
  <Svg size={size}>
    <circle cx={50} cy={50} r={32} fill="#fff" stroke={color} strokeWidth={7} />
    <circle cx={50} cy={50} r={18} fill="none" stroke={color} strokeWidth={4} opacity={0.5} />
    <line x1={10} y1={14} x2={10} y2={86} stroke={color} strokeWidth={6} strokeLinecap="round" />
    <line x1={90} y1={14} x2={90} y2={86} stroke={color} strokeWidth={6} strokeLinecap="round" />
  </Svg>
);

export const CupIcon: React.FC<IP> = ({size = 90, color = P.sky}) => (
  <Svg size={size}>
    <path d="M24 22 L76 22 L68 90 L32 90 Z" fill="#fff" stroke={color} strokeWidth={6} strokeLinejoin="round" />
    <path d="M28 46 L72 46 L68 90 L32 90 Z" fill={color} opacity={0.75} />
    <line x1={58} y1={22} x2={68} y2={4} stroke={color} strokeWidth={6} strokeLinecap="round" />
  </Svg>
);

export const WalkerIcon: React.FC<IP> = ({size = 90, color = P.green}) => (
  <Svg size={size}>
    <circle cx={54} cy={16} r={10} fill={color} />
    <g stroke={color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <polyline points="52,32 48,58 34,90" />
      <polyline points="48,58 62,72 66,92" />
      <polyline points="52,34 34,48 24,44" />
      <polyline points="52,34 70,44 80,58" />
    </g>
  </Svg>
);

export const AppleIcon: React.FC<IP> = ({size = 90, color = P.coral}) => (
  <Svg size={size}>
    <path d="M50 30 C34 18 12 28 12 54 C12 76 28 92 40 92 C46 92 48 89 50 89 C52 89 54 92 60 92 C72 92 88 76 88 54 C88 28 66 18 50 30 Z" fill={color} />
    <path d="M50 30 C50 20 54 12 62 8" stroke={P.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <ellipse cx={68} cy={16} rx={12} ry={6} fill={P.green} transform="rotate(-25 68 16)" />
  </Svg>
);

export const StethoscopeIcon: React.FC<IP> = ({size = 90, color = P.purple}) => (
  <Svg size={size}>
    <path d="M26 10 V40 a22 22 0 0 0 44 0 V10" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" />
    <path d="M48 62 V72 a16 16 0 0 0 32 0 V64" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" />
    <circle cx={80} cy={58} r={9} fill={color} />
    <circle cx={26} cy={10} r={5} fill={color} />
    <circle cx={70} cy={10} r={5} fill={color} />
  </Svg>
);

export const PadlockIcon: React.FC<IP & {open?: boolean}> = ({size = 60, color = P.coral, open = false}) => (
  <Svg size={size}>
    <path
      d={open ? 'M34 46 V30 a16 16 0 0 1 32 0 V36' : 'M34 46 V34 a16 16 0 0 1 32 0 V46'}
      fill="none"
      stroke={color}
      strokeWidth={9}
      strokeLinecap="round"
    />
    <rect x={22} y={44} width={56} height={44} rx={10} fill={color} />
    <circle cx={50} cy={64} r={6} fill="#fff" />
  </Svg>
);

export const KeyIcon: React.FC<IP> = ({size = 60, color = P.teal}) => (
  <Svg size={size}>
    <circle cx={28} cy={50} r={20} fill={color} />
    <circle cx={28} cy={50} r={8} fill="#fff" />
    <rect x={44} y={45} width={46} height={10} rx={5} fill={color} />
    <rect x={70} y={53} width={8} height={16} rx={3} fill={color} />
    <rect x={82} y={53} width={8} height={11} rx={3} fill={color} />
  </Svg>
);

export const SugarIcon: React.FC<IP> = ({size = 40, color = P.sun}) => (
  <Svg size={size}>
    <rect x={14} y={14} width={72} height={72} rx={18} fill={color} />
    <rect x={24} y={24} width={26} height={12} rx={6} fill="#fff" opacity={0.6} />
  </Svg>
);

export const BookIcon: React.FC<IP> = ({size = 90, color = P.purple}) => (
  <Svg size={size}>
    <path d="M10 20 Q30 12 50 24 Q70 12 90 20 V80 Q70 72 50 84 Q30 72 10 80 Z" fill={color} />
    <line x1={50} y1={24} x2={50} y2={84} stroke="#fff" strokeWidth={4} />
  </Svg>
);
