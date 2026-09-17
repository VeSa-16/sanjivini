const fs = require('fs');
const path = 'src/pages/Onboarding.jsx';
let content = fs.readFileSync(path, 'utf8');

// Main Background
content = content.replace(
  '<main className="min-h-screen bg-[#f4f3ea] text-[#20352a] font-sans flex flex-col">',
  '<main className="min-h-screen bg-gradient-to-br from-[#f8f9f6] via-[#f1f4ef] to-[#e4ebe4] text-[#20352a] font-sans flex flex-col relative overflow-hidden">\n      {/* Premium Ambient Background Orbs */}\n      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4ad64]/10 rounded-full blur-[120px] pointer-events-none" />\n      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#173f2c]/5 rounded-full blur-[140px] pointer-events-none" />\n      <div className="relative z-10 flex flex-col flex-1">'
);

// Close the z-10 wrapper at the end
content = content.replace(
  '    </main>',
  '      </div>\n    </main>'
);

// Progress Bar Updates
content = content.replace(
  'bg-[#f4f3ea] px-2',
  'bg-transparent px-2 backdrop-blur-sm'
);

// Screen 1 Button
content = content.replace(
  'bg-[#173f2c] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#173f2c]/20 hover:bg-[#123021] transition',
  'bg-[#173f2c] text-white rounded-[20px] font-bold text-lg shadow-[0_8px_30px_rgba(23,63,44,0.3)] hover:shadow-[0_12px_40px_rgba(23,63,44,0.4)] hover:-translate-y-1 hover:bg-[#123021] transition-all duration-300'
);

// Basic Card to Premium Glass Card (Screens 2, 7, 11, 12, 14, 16, 17)
const oldCard = 'bg-white p-5 rounded-[24px] shadow-sm flex items-center gap-4 border border-[#e8ece9]';
const newCard = 'bg-white/70 backdrop-blur-xl p-5 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center gap-4 border border-white hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300';
content = content.split(oldCard).join(newCard);

const oldCard2 = 'bg-white p-5 rounded-[24px] text-left border border-[#e8ece9]';
const newCard2 = 'bg-white/70 backdrop-blur-xl p-5 rounded-[24px] text-left border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300';
content = content.split(oldCard2).join(newCard2);

const oldCard3 = 'bg-white p-4 rounded-2xl border border-[#e8ece9] w-[45%] text-left';
const newCard3 = 'bg-white/70 backdrop-blur-xl p-4 rounded-[20px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-[45%] text-left';
content = content.split(oldCard3).join(newCard3);

// Screen 3 text input
content = content.replace(
  'bg-transparent border-b-2 border-[#173f2c]/20 pb-4 outline-none focus:border-[#173f2c] placeholder:text-[#173f2c]/20',
  'bg-white/50 backdrop-blur-md rounded-2xl px-6 py-6 border border-white/50 outline-none focus:border-[#173f2c]/50 focus:bg-white shadow-inner transition-all placeholder:text-[#173f2c]/20'
);

// Screen 4 inputs
const oldInput1 = 'bg-white border border-[#e8ece9] rounded-2xl p-4 text-lg font-bold text-[#173f2c] outline-none focus:border-[#173f2c]';
const newInput1 = 'bg-white/70 backdrop-blur-xl border border-white shadow-sm rounded-2xl p-4 text-lg font-bold text-[#173f2c] outline-none focus:border-[#173f2c]/50 focus:bg-white transition-all';
content = content.split(oldInput1).join(newInput1);

const oldSelect1 = 'bg-[#eef3e9] border-none rounded-2xl p-4 text-lg font-bold text-[#173f2c] outline-none cursor-pointer';
const newSelect1 = 'bg-white/70 backdrop-blur-xl border border-white shadow-sm rounded-2xl p-4 text-lg font-bold text-[#173f2c] outline-none cursor-pointer hover:bg-white transition-all';
content = content.split(oldSelect1).join(newSelect1);

// Screen 5 buttons
content = content.split('className={p-6 rounded-[24px] border-2 transition-all flex flex-col items-center gap-3 }').join('className={p-6 rounded-[24px] transition-all flex flex-col items-center gap-3 border }')

// Screen 6 buttons
content = content.split('className={w-full p-5 rounded-2xl border-2 text-left font-bold text-lg transition }').join('className={w-full p-6 rounded-[24px] border text-left font-bold text-lg transition-all duration-300 }')

// Screen 7 wow moment
content = content.replace(
  'bg-white p-6 rounded-[24px] border border-[#e8ece9] shadow-sm mb-8 inline-block',
  'bg-white/80 backdrop-blur-2xl p-6 rounded-[24px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] mb-8 inline-block'
);
content = content.replace(
  'bg-[#f4f3ea] text-[#173f2c] font-bold text-xl px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-[#173f2c]',
  'bg-white/50 shadow-inner text-[#173f2c] font-bold text-xl px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-[#173f2c]/30 transition-all'
);
content = content.replace(
  'bg-[#173f2c] text-white p-8 rounded-[32px] inline-block shadow-xl shadow-[#173f2c]/20',
  'bg-gradient-to-b from-[#1c4b35] to-[#113122] text-white p-10 rounded-[32px] inline-block shadow-[0_20px_50px_rgba(23,63,44,0.4)] transform hover:scale-105 transition-all duration-500'
);

// Screen 12 Today concept
content = content.replace(
  'bg-white p-6 rounded-[28px] shadow-xl shadow-black/5 text-left border border-[#e8ece9] relative overflow-hidden',
  'bg-white/80 backdrop-blur-2xl p-6 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] text-left border border-white relative overflow-hidden'
);
content = content.replace(
  'bg-[#eef3e9] flex items-center px-6',
  'bg-gradient-to-r from-[#edf4e9] to-[#e4eee0] flex items-center px-6 border-b border-white/50'
);

// Screen 13
content = content.replace(
  'bg-[#173f2c] text-white p-6 rounded-[28px] text-left shadow-lg',
  'bg-gradient-to-br from-[#1c4b35] to-[#113122] text-white p-8 rounded-[32px] text-left shadow-[0_20px_50px_rgba(23,63,44,0.4)] border border-[#265e44]'
);

// Screen 17
content = content.replace(
  'bg-white rounded-[32px] p-8 border border-[#e8ece9] shadow-xl shadow-black/5 mb-8',
  'bg-white/80 backdrop-blur-2xl rounded-[32px] p-10 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] mb-8 transform hover:-translate-y-1 transition-all duration-500'
);

// Screen 18 First today screen
content = content.replace(
  'bg-[#173f2c] text-white rounded-2xl font-bold text-xl shadow-2xl shadow-[#173f2c]/30 hover:bg-[#123021] transition transform hover:-translate-y-1',
  'bg-[#173f2c] text-white rounded-[24px] font-bold text-xl shadow-[0_20px_50px_rgba(23,63,44,0.4)] hover:bg-[#123021] transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]'
);

// Footer navigation
content = content.replace(
  'flex items-center justify-between border-t border-[#173f2c]/5',
  'flex items-center justify-between border-t border-[#173f2c]/5 backdrop-blur-md'
);
content = content.replace(
  'className={px-8 py-3 rounded-xl font-bold text-white shadow-lg transition',
  'className={px-8 py-4 rounded-[16px] font-bold text-white shadow-[0_8px_30px_rgba(23,63,44,0.25)] hover:shadow-[0_12px_40px_rgba(23,63,44,0.35)] hover:-translate-y-0.5 transition-all duration-300'
);

fs.writeFileSync(path, content, 'utf8');
console.log('UI updated for Onboarding.jsx');
