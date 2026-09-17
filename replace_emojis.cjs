const fs = require('fs');

const path = 'src/pages/Onboarding.jsx';
let content = fs.readFileSync(path, 'utf8');

// Add imports
content = content.replace('import { useState, useEffect } from "react";', 'import { useState, useEffect } from "react";\nimport { Sprout, Leaf, Flower2, Droplets, Search, MapPin, Sparkles, Bug, Camera, Wheat, CheckCircle2, CloudSunRain } from "lucide-react";');

// Replaces
const replacements = [
  ['<span>??</span>', '<span className="text-[#3b7c53]"><Sprout size={32} /></span>'],
  ['<span>??</span>', '<span className="text-[#3b7c53]"><Leaf size={32} /></span>'],
  ['<span>??</span>', '<span className="text-[#d4ad64]"><Flower2 size={32} /></span>'],
  ['<span>??</span>', '<span className="text-red-500"><Sprout size={32} /></span>'],
  ['<span>??</span>', '<span className="text-[#d4ad64]"><Wheat size={32} /></span>'],
  ['<div className="text-4xl">??</div>', '<div className="text-[#3b7c53]"><Droplets size={36} /></div>'],
  ['<div className="text-4xl">??</div>', '<div className="text-[#3b7c53]"><Sprout size={36} /></div>'],
  ['<div className="text-4xl">??</div>', '<div className="text-[#3b7c53]"><Search size={36} /></div>'],
  ['?? {farm.location.name}', '<MapPin size={14} className="inline mr-1" /> {farm.location.name}'],
  ['emoji: "??"', 'icon: <Sprout size={48} className="text-red-500" />'],
  ['emoji: "??"', 'icon: <Wheat size={48} className="text-[#d4ad64]" />'],
  ['emoji: "??"', 'icon: <Sprout size={48} className="text-purple-400" />'],
  ['emoji: "???"', 'icon: <Sprout size={48} className="text-red-600" />'],
  ['emoji: "??"', 'icon: <Sprout size={48} className="text-amber-700" />'],
  ['emoji: "??"', 'icon: <Sprout size={48} className="text-yellow-500" />'],
  ['<span className="text-5xl">{c.emoji}</span>', '<span>{c.icon}</span>'],
  ['Great choice ??', 'Great choice <Sprout size={20} className="inline text-[#3b7c53]" />'],
  ['<div className="text-5xl mb-3">{currentStage.emoji}</div>', '<div className="mb-3 flex justify-center"><Sprout size={48} className="text-[#a5bca7]" /></div>'],
  ['<div className="absolute inset-0 flex items-center justify-center text-5xl">?</div>', '<div className="absolute inset-0 flex items-center justify-center text-[#d4ad64]"><Sparkles size={48} /></div>'],
  ['<span className="text-sm">{s.emoji}</span>', '<span className="text-[#c4cdc5] flex justify-center"><Sprout size={16} /></span>'],
  ['<div className="text-3xl mb-3">??</div>', '<div className="mb-3 text-[#3b7c53]"><Droplets size={32} /></div>'],
  ['<div className="text-3xl mb-3">??</div>', '<div className="mb-3 text-[#3b7c53]"><Sprout size={32} /></div>'],
  ['<div className="text-3xl mb-3">??</div>', '<div className="mb-3 text-[#3b7c53]"><CloudSunRain size={32} /></div>'],
  ['<div className="text-3xl mb-3">??</div>', '<div className="mb-3 text-[#3b7c53]"><Search size={32} /></div>'],
  ['<div className="font-bold text-[#173f2c]">?? Check soil moisture</div>', '<div className="font-bold text-[#173f2c] flex items-center gap-1.5"><Droplets size={16} /> Check soil moisture</div>'],
  ['<div className="font-bold text-[#173f2c]">?? Complete nutrition task</div>', '<div className="font-bold text-[#173f2c] flex items-center gap-1.5"><Sprout size={16} /> Complete nutrition task</div>'],
  ['<div className="font-bold text-[#173f2c]">?? Inspect flowers</div>', '<div className="font-bold text-[#173f2c] flex items-center gap-1.5"><Search size={16} /> Inspect flowers</div>'],
  ['<span className="text-xl">??</span>', '<span className="text-[#a5bca7]"><Droplets size={24} /></span>'],
  ['{ label: "Yellow leaves", icon: "??" }', '{ label: "Yellow leaves", icon: <Leaf size={20} /> }'],
  ['{ label: "Leaf spots", icon: "??" }', '{ label: "Leaf spots", icon: <Leaf size={20} className="text-amber-800" /> }'],
  ['{ label: "Insects", icon: "??" }', '{ label: "Insects", icon: <Bug size={20} /> }'],
  ['{ label: "Flower drop", icon: "??" }', '{ label: "Flower drop", icon: <Flower2 size={20} /> }'],
  ['{ label: "Fruit problem", icon: "??" }', '{ label: "Fruit problem", icon: <Sprout size={20} /> }'],
  ['{ label: "Looks normal", icon: "?" }', '{ label: "Looks normal", icon: <CheckCircle2 size={20} /> }'],
  ['<span className="text-xl">{opt.icon}</span>', '<span className="text-[#3b7c53]">{opt.icon}</span>'],
  ['<div className="text-6xl mb-4">??</div>', '<div className="flex justify-center mb-4 text-[#3b7c53]"><Camera size={64} /></div>'],
  ['<div className="text-xl mb-1">??</div>', '<div className="mb-1 text-[#3b7c53]"><CloudSunRain size={24} /></div>'],
  ['<div className="text-xl mb-1">??</div>', '<div className="mb-1 text-[#3b7c53]"><Sprout size={24} /></div>'],
  ['<div className="text-xl mb-1">??</div>', '<div className="mb-1 text-[#3b7c53]"><Search size={24} /></div>'],
  ['<div className="text-5xl mb-4">{crop.emoji}</div>', '<div className="flex justify-center mb-4 text-[#173f2c]"><Sprout size={64} /></div>'],
  ['?? {farm.farmName || "My Farm"}', '<MapPin size={14} className="inline mr-1" /> {farm.farmName || "My Farm"}'],
  ['?? {farm.area || 1}', '<CheckCircle2 size={14} className="inline mr-1" /> {farm.area || 1}'],
  ['?? {currentStage.name}', '<Flower2 size={14} className="inline mr-1" /> {currentStage.name}'],
  ['?? {farm.irrigationMethod || "Drip"}', '<Droplets size={14} className="inline mr-1" /> {farm.irrigationMethod || "Drip"}'],
  ['?? {farm.soilType || "Loamy"}', '<Leaf size={14} className="inline mr-1" /> {farm.soilType || "Loamy"}'],
  ['<div className="text-6xl mb-6">??</div>', '<div className="flex justify-center mb-6 text-[#173f2c]"><Sprout size={80} /></div>']
];

for (const [search, replace] of replacements) {
  content = content.split(search).join(replace); // Replace all occurrences using split.join
}

fs.writeFileSync(path, content, 'utf8');
console.log('Emojis replaced in Onboarding.jsx');
