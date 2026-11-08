export const PRESET_RANKS: { value: string; label: string; icon: string }[] = [
  { value: 'Founder', label: 'Founder', icon: '👑' },
  { value: 'Co-Founder', label: 'Co-Founder', icon: '⭐' },
  { value: 'Principal Fellow', label: 'Principal Fellow', icon: '💎' },
  { value: 'Senior Fellow', label: 'Senior Fellow', icon: '🌿' },
  { value: 'Core Fellow', label: 'Core Fellow', icon: '⚡' },
  { value: 'Research Fellow', label: 'Research Fellow', icon: '🔬' },
  { value: 'Junior Fellow', label: 'Junior Fellow', icon: '🌱' },
  { value: 'Apprentice', label: 'Apprentice', icon: '🛠️' },
];

export const getRankBadgeInfo = (rank?: string, verifiedFounder?: boolean) => {
  const effectiveRank = rank || (verifiedFounder ? 'Co-Founder' : 'Core Fellow');
  switch (effectiveRank) {
    case 'Founder':
      return {
        label: 'Founder',
        icon: '👑',
        bg: 'bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] text-[#9a3412] border-[#fdba74]',
        pillBg: 'bg-[#9a3412] text-white',
        dot: 'bg-[#ea580c]',
        tier: 'Founder Tier'
      };
    case 'Co-Founder':
      return {
        label: 'Co-Founder',
        icon: '⭐',
        bg: 'bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]',
        pillBg: 'bg-[#c2410c] text-white',
        dot: 'bg-[#c2410c]',
        tier: 'Executive Tier'
      };
    case 'Principal Fellow':
      return {
        label: 'Principal Fellow',
        icon: '💎',
        bg: 'bg-[#f5f3ff] text-[#6d28d9] border-[#ddd6fe]',
        pillBg: 'bg-[#6d28d9] text-white',
        dot: 'bg-[#7c3aed]',
        tier: 'Principal Tier'
      };
    case 'Senior Fellow':
      return {
        label: 'Senior Fellow',
        icon: '🌿',
        bg: 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]',
        pillBg: 'bg-[#166534] text-white',
        dot: 'bg-[#16a34a]',
        tier: 'Senior Tier'
      };
    case 'Core Fellow':
      return {
        label: 'Core Fellow',
        icon: '⚡',
        bg: 'bg-[#f0f9ff] text-[#0369a1] border-[#bae6fd]',
        pillBg: 'bg-[#0369a1] text-white',
        dot: 'bg-[#0284c7]',
        tier: 'Core Tier'
      };
    case 'Research Fellow':
      return {
        label: 'Research Fellow',
        icon: '🔬',
        bg: 'bg-[#f0fdfa] text-[#0f766e] border-[#99f6e4]',
        pillBg: 'bg-[#0f766e] text-white',
        dot: 'bg-[#0d9488]',
        tier: 'Research Tier'
      };
    case 'Junior Fellow':
      return {
        label: 'Junior Fellow',
        icon: '🌱',
        bg: 'bg-[#f5f5f4] text-[#44403c] border-[#e7e5e4]',
        pillBg: 'bg-[#57534e] text-white',
        dot: 'bg-[#78716c]',
        tier: 'Junior Tier'
      };
    case 'Apprentice':
      return {
        label: 'Apprentice',
        icon: '🛠️',
        bg: 'bg-[#fefce8] text-[#854d0e] border-[#fef08a]',
        pillBg: 'bg-[#854d0e] text-white',
        dot: 'bg-[#ca8a04]',
        tier: 'Apprentice Tier'
      };
    default:
      return {
        label: effectiveRank,
        icon: '🏷️',
        bg: 'bg-[#fafaf9] text-[#292524] border-[#d6d3d1]',
        pillBg: 'bg-[#44403c] text-white',
        dot: 'bg-[#78716c]',
        tier: 'Specialist'
      };
  }
};
