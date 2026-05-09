'use client'
import { useState, useRef, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Link from 'next/link'
import { projects, Project } from './data/projects'
import { Phone, Mail, MessageCircle, Search, Shield, ArrowRight, FileText, BookOpen, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSidebar } from './context/sidebar'
import Fuse from 'fuse.js'

const divisionColors: Record<string, { bg: string; text: string; border: string }> = {
  FS:  { bg: '#FFEFF4', text: '#A50064', border: '#A50064' },
  UTI: { bg: '#E0F2FE', text: '#0284C7', border: '#0284C7' },
  OTA: { bg: '#DCFCE7', text: '#16A34A', border: '#16A34A' },
  GPD: { bg: '#F9AFB5', text: '#E5303F', border: '#E5303F' },
}

// Klaus DS tokens — strictly no other colors
// clay=#202940 oat=#E3DACC gray300=#D1CFC5 gray100=#F0EEE6 info=#5C7CA3
function ThumbIllustration({ id }: { id: string }) {
  const BG = '#F0EEE6'
  const C  = '#202940' // clay
  const O  = '#E3DACC' // oat
  const G  = '#D1CFC5' // gray-300
  const I  = '#5C7CA3' // info

  const map: Record<string, React.ReactNode> = {

    // ── LOAN: bar chart growing + trend line ──────────────────────────────
    'vay-nhanh': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <line x1="18" y1="104" x2="170" y2="104" stroke={G} strokeWidth="1"/>
        <line x1="18" y1="104" x2="18" y2="14" stroke={G} strokeWidth="1"/>
        <rect x="26" y="82" width="20" height="22" rx="2" fill={O}/>
        <rect x="54" y="64" width="20" height="40" rx="2" fill={G}/>
        <rect x="82" y="48" width="20" height="56" rx="2" fill={C} fillOpacity=".4"/>
        <rect x="110" y="30" width="20" height="74" rx="2" fill={C} fillOpacity=".7"/>
        <rect x="138" y="14" width="20" height="90" rx="2" fill={C}/>
        <polyline points="36,78 64,60 92,44 120,26 148,10" fill="none" stroke={I} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="36" cy="78" r="2.5" fill={I}/>
        <circle cx="64" cy="60" r="2.5" fill={I}/>
        <circle cx="92" cy="44" r="2.5" fill={I}/>
        <circle cx="120" cy="26" r="2.5" fill={I}/>
        <circle cx="148" cy="10" r="2.5" fill={I}/>
        <circle cx="196" cy="60" r="22" fill="none" stroke={O} strokeWidth="1.5"/>
        <circle cx="196" cy="60" r="13" fill="none" stroke={G} strokeWidth="1.5"/>
        <circle cx="196" cy="60" r="6" fill={C} fillOpacity=".15"/>
        <circle cx="196" cy="60" r="3" fill={C}/>
      </svg>
    ),

    // ── BNPL: 3-step payment flow ─────────────────────────────────────────
    'vi-tra-sau': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <rect x="12" y="30" width="54" height="48" rx="5" fill={C}/>
        <line x1="12" y1="45" x2="66" y2="45" stroke="white" strokeWidth="1" strokeOpacity=".25"/>
        <rect x="20" y="52" width="32" height="5" rx="2" fill="white" fillOpacity=".4"/>
        <rect x="20" y="62" width="22" height="4" rx="2" fill="white" fillOpacity=".2"/>
        <line x1="70" y1="54" x2="84" y2="54" stroke={C} strokeWidth="1.5" strokeDasharray="3 2"/>
        <polygon points="82,50 88,54 82,58" fill={C}/>
        <rect x="90" y="30" width="54" height="48" rx="5" fill="none" stroke={C} strokeWidth="1.5"/>
        <rect x="98" y="46" width="32" height="5" rx="2" fill={C} fillOpacity=".3"/>
        <rect x="98" y="56" width="22" height="4" rx="2" fill={C} fillOpacity=".2"/>
        <line x1="148" y1="54" x2="162" y2="54" stroke={G} strokeWidth="1.5" strokeDasharray="3 2"/>
        <polygon points="160,50 166,54 160,58" fill={G}/>
        <rect x="168" y="30" width="54" height="48" rx="5" fill={O}/>
        <rect x="176" y="46" width="32" height="5" rx="2" fill={C} fillOpacity=".2"/>
        <rect x="176" y="56" width="22" height="4" rx="2" fill={C} fillOpacity=".12"/>
        <circle cx="39" cy="96" r="5" fill={C}/>
        <circle cx="39" cy="96" r="2" fill="white"/>
        <line x1="44" y1="96" x2="108" y2="96" stroke={G} strokeWidth="1"/>
        <circle cx="117" cy="96" r="5" fill="none" stroke={C} strokeWidth="1.5"/>
        <line x1="122" y1="96" x2="186" y2="96" stroke={G} strokeWidth="1" strokeDasharray="3 2"/>
        <circle cx="195" cy="96" r="5" fill={O} stroke={G} strokeWidth="1"/>
      </svg>
    ),

    // ── MOTOR INSURANCE: shield + wheel ──────────────────────────────────
    'bao-hiem-xe-may': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <circle cx="68" cy="60" r="50" fill="none" stroke={O} strokeWidth="1.5"/>
        <circle cx="68" cy="60" r="36" fill="none" stroke={G} strokeWidth="1.5"/>
        <circle cx="68" cy="60" r="22" fill="none" stroke={C} strokeWidth="1.5" strokeDasharray="4 3"/>
        <circle cx="68" cy="60" r="8" fill={C} fillOpacity=".2"/>
        <circle cx="68" cy="60" r="4" fill={C}/>
        {[0,60,120,180,240,300].map((deg,i)=>{
          const r=36; const x=68+r*Math.cos(deg*Math.PI/180); const y=60+r*Math.sin(deg*Math.PI/180)
          const x2=68+(22)*Math.cos(deg*Math.PI/180); const y2=60+(22)*Math.sin(deg*Math.PI/180)
          return <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke={C} strokeWidth="1" strokeOpacity=".5"/>
        })}
        <path d="M148 20 L168 20 Q178 20 178 30 L178 72 Q178 85 160 95 Q142 85 142 72 L142 30 Q142 20 148 20Z" fill="none" stroke={C} strokeWidth="1.5"/>
        <path d="M148 26 L165 26 Q173 26 173 33 L173 70 Q173 81 160 90 Q147 81 147 70 L147 33 Q147 26 148 26Z" fill={C} fillOpacity=".08"/>
        <polyline points="153,55 158,62 170,44" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),

    // ── INSURANCE HUB: 5-layer foundation pyramid ─────────────────────────
    'bao-hiem': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <rect x="10" y="90" width="140" height="14" rx="3" fill={O}/>
        <rect x="22" y="72" width="116" height="14" rx="3" fill={G}/>
        <rect x="34" y="54" width="92" height="14" rx="3" fill={C} fillOpacity=".3"/>
        <rect x="46" y="36" width="68" height="14" rx="3" fill={C} fillOpacity=".6"/>
        <rect x="58" y="18" width="44" height="14" rx="3" fill={C}/>
        <rect x="10" y="106" width="140" height="4" rx="2" fill={C} fillOpacity=".08"/>
        <rect x="170" y="20" width="42" height="90" rx="5" fill="none" stroke={G} strokeWidth="1"/>
        {[0,1,2,3,4].map(i=>(
          <rect key={i} x="178" y={28+i*16} width="26" height="10" rx="2" fill={i===0?C:i===1?C:O} fillOpacity={i===0?1:i===1?.6:.4}/>
        ))}
      </svg>
    ),

    // ── AUTO INSURANCE: template grid (43+ pages) ─────────────────────────
    'bao-hiem-o-to': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        {[0,1,2,3].map(col=>[0,1,2].map(row=>{
          const x=12+col*50; const y=12+row*36
          const filled=(col===1&&row===0)||(col===2&&row===1)||(col===0&&row===2)
          return (
            <rect key={`${col}${row}`} x={x} y={y} width="42" height="28" rx="3"
              fill={filled?C:O} fillOpacity={filled?1:.6} stroke={filled?C:G} strokeWidth="1"/>
          )
        }))}
        <rect x="218" y="0" width="0" height="0"/>
        <circle cx="188" cy="38" r="18" fill="none" stroke={G} strokeWidth="1.5"/>
        <circle cx="188" cy="38" r="10" fill={C} fillOpacity=".1"/>
        <circle cx="188" cy="38" r="4" fill={C}/>
        <line x1="188" y1="20" x2="188" y2="26" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="188" y1="50" x2="188" y2="56" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="170" y1="38" x2="176" y2="38" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="200" y1="38" x2="206" y2="38" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="170" y="70" width="48" height="10" rx="2" fill={O}/>
        <rect x="170" y="84" width="36" height="10" rx="2" fill={G}/>
        <rect x="170" y="98" width="42" height="10" rx="2" fill={O}/>
      </svg>
    ),

    // ── PARTNERS: network grid (merchant directory) ───────────────────────
    'doi-tac': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        {[[30,30],[90,20],[150,30],[180,60],[150,90],[90,100],[30,90],[10,60]].map(([cx,cy],i)=>(
          <circle key={i} cx={cx} cy={cy} r={i===0?8:6}
            fill={i===0?C:i%3===1?O:G} stroke={i===0?'none':G} strokeWidth="1"/>
        ))}
        {[[30,30,90,20],[90,20,150,30],[150,30,180,60],[180,60,150,90],[150,90,90,100],[90,100,30,90],[30,90,10,60],[10,60,30,30]].map(([x1,y1,x2,y2],i)=>(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={G} strokeWidth="1" strokeDasharray="3 2"/>
        ))}
        <line x1="30" y1="30" x2="90" y2="60" stroke={C} strokeWidth="1" strokeOpacity=".3"/>
        <line x1="30" y1="30" x2="150" y2="90" stroke={C} strokeWidth="1" strokeOpacity=".2"/>
        <circle cx="90" cy="60" r="5" fill={C} fillOpacity=".15"/>
        <circle cx="90" cy="60" r="2.5" fill={C}/>
      </svg>
    ),

    // ── CREDIT ECOSYSTEM: circular loop ───────────────────────────────────
    'tin-dung': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <circle cx="80" cy="60" r="48" fill="none" stroke={O} strokeWidth="1.5"/>
        <circle cx="80" cy="60" r="32" fill="none" stroke={G} strokeWidth="1.5" strokeDasharray="5 3"/>
        <path d="M80 12 A48 48 0 1 1 32 60" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round"/>
        <polygon points="28,52 32,62 38,54" fill={C}/>
        <circle cx="80" cy="60" r="14" fill={C} fillOpacity=".08"/>
        <circle cx="80" cy="60" r="6" fill={C}/>
        <circle cx="80" cy="12" r="5" fill={C}/>
        <circle cx="128" cy="60" r="5" fill={O} stroke={C} strokeWidth="1"/>
        <circle cx="80" cy="108" r="5" fill={O} stroke={C} strokeWidth="1"/>
        <rect x="150" y="20" width="62" height="80" rx="5" fill="none" stroke={G} strokeWidth="1"/>
        {[0,1,2,3,4].map(i=>(
          <rect key={i} x="158" y={30+i*14} width={20+i*4} height="8" rx="2" fill={i<2?C:O} fillOpacity={i<2?.7:.5}/>
        ))}
      </svg>
    ),

    // ── TELECOM: signal arcs radiating ────────────────────────────────────
    'vien-thong': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <path d="M60 100 A80 80 0 0 1 140 100" fill="none" stroke={O} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M72 88 A56 56 0 0 1 128 88" fill="none" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M84 76 A36 36 0 0 1 116 76" fill="none" stroke={C} strokeWidth="1.5" strokeLinecap="round" strokeOpacity=".5"/>
        <path d="M94 66 A20 20 0 0 1 106 66" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="100" cy="104" r="5" fill={C}/>
        <circle cx="100" cy="98" r="2" fill={C} fillOpacity=".3"/>
        <rect x="14" y="28" width="54" height="10" rx="2" fill={O}/>
        <rect x="14" y="44" width="40" height="10" rx="2" fill={G}/>
        <rect x="14" y="60" width="48" height="10" rx="2" fill={O}/>
        <rect x="14" y="76" width="34" height="10" rx="2" fill={G}/>
        <rect x="14" y="92" width="42" height="10" rx="2" fill={O}/>
        <rect x="154" y="28" width="54" height="10" rx="2" fill={O}/>
        <rect x="168" y="44" width="40" height="10" rx="2" fill={G}/>
        <rect x="160" y="60" width="48" height="10" rx="2" fill={O}/>
        <rect x="172" y="76" width="34" height="10" rx="2" fill={G}/>
        <rect x="164" y="92" width="42" height="10" rx="2" fill={O}/>
      </svg>
    ),

    // ── TRAVEL: destination dots + route path ─────────────────────────────
    'du-lich': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <line x1="10" y1="100" x2="210" y2="100" stroke={G} strokeWidth="1"/>
        {[0,1,2,3,4,5].map(i=>(
          <line key={i} x1={10+i*40} y1={96} x2={10+i*40} y2={100} stroke={G} strokeWidth="1"/>
        ))}
        <path d="M20 85 C50 40 70 70 100 45 C130 20 150 55 180 30 C195 22 205 38 210 55" fill="none" stroke={G} strokeWidth="1" strokeDasharray="4 3"/>
        <circle cx="20"  cy="85" r="5" fill={O} stroke={G} strokeWidth="1"/>
        <circle cx="100" cy="45" r="7" fill={C}/>
        <circle cx="100" cy="45" r="3" fill="white"/>
        <circle cx="180" cy="30" r="7" fill={C} fillOpacity=".5"/>
        <circle cx="180" cy="30" r="3" fill={C}/>
        <line x1="100" y1="52" x2="100" y2="100" stroke={C} strokeWidth="1" strokeDasharray="2 3"/>
        <line x1="180" y1="37" x2="180" y2="100" stroke={C} strokeWidth="1" strokeDasharray="2 3" strokeOpacity=".4"/>
        <path d="M150 72 A16 16 0 0 1 166 60" fill="none" stroke={I} strokeWidth="1.5" strokeLinecap="round"/>
        <polyline points="164,56 168,62 162,64" fill="none" stroke={I} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),

    // ── PUBLIC SERVICES: document stack + check ───────────────────────────
    'dich-vu-cong': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <rect x="50" y="24" width="100" height="80" rx="5" fill={O} stroke={G} strokeWidth="1"/>
        <rect x="38" y="18" width="100" height="80" rx="5" fill={O} stroke={G} strokeWidth="1"/>
        <rect x="26" y="12" width="100" height="80" rx="5" fill="white" stroke={G} strokeWidth="1.5"/>
        <rect x="38" y="26" width="64" height="6" rx="2" fill={G}/>
        <rect x="38" y="38" width="48" height="5" rx="2" fill={O}/>
        <rect x="38" y="50" width="56" height="5" rx="2" fill={O}/>
        <rect x="38" y="62" width="40" height="5" rx="2" fill={O}/>
        <circle cx="148" cy="68" r="22" fill={C}/>
        <polyline points="137,68 144,76 160,58" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),

    // ── eSIM: globe grid (200+ countries) ────────────────────────────────
    'esim-du-lich': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <circle cx="72" cy="60" r="52" fill="none" stroke={O} strokeWidth="1.5"/>
        <circle cx="72" cy="60" r="52" fill="none" stroke={G} strokeWidth="1"/>
        <line x1="20" y1="60" x2="124" y2="60" stroke={G} strokeWidth="1"/>
        <line x1="72" y1="8" x2="72" y2="112" stroke={G} strokeWidth="1"/>
        <ellipse cx="72" cy="60" rx="24" ry="52" fill="none" stroke={G} strokeWidth="1"/>
        <ellipse cx="72" cy="60" rx="44" ry="52" fill="none" stroke={G} strokeWidth="1" strokeDasharray="3 3"/>
        <circle cx="72" cy="60" r="5" fill={C}/>
        <circle cx="72" cy="8"  r="3" fill={G}/>
        <circle cx="72" cy="112" r="3" fill={G}/>
        <rect x="142" y="12" width="66" height="96" rx="5" fill="none" stroke={G} strokeWidth="1"/>
        {[0,1,2,3].map(row=>[0,1].map(col=>(
          <rect key={`${row}${col}`} x={150+col*30} y={20+row*22} width="22" height="14" rx="2"
            fill={(row+col)%2===0?C:O} fillOpacity={(row+col)%2===0?.8:.6}/>
        )))}
      </svg>
    ),

    // ── TRAFFIC FINES: search target + plate ─────────────────────────────
    'phat-nguoi': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <circle cx="72" cy="60" r="50" fill="none" stroke={O} strokeWidth="1.5"/>
        <circle cx="72" cy="60" r="34" fill="none" stroke={G} strokeWidth="1.5"/>
        <circle cx="72" cy="60" r="20" fill="none" stroke={C} strokeWidth="1.5" strokeDasharray="4 3"/>
        <circle cx="72" cy="60" r="8" fill={C} fillOpacity=".15"/>
        <circle cx="72" cy="60" r="4" fill={C}/>
        <line x1="72" y1="10" x2="72" y2="22" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="72" y1="98" x2="72" y2="110" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="22" y1="60" x2="34" y2="60" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="110" y1="60" x2="122" y2="60" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="134" y="36" width="78" height="48" rx="6" fill="white" stroke={C} strokeWidth="1.5"/>
        <rect x="140" y="42" width="66" height="36" rx="3" fill={O}/>
        <rect x="146" y="48" width="54" height="8" rx="2" fill={C} fillOpacity=".15"/>
        <rect x="148" y="48" width="50" height="8" rx="2" fill={C} fillOpacity=".1"/>
        <rect x="152" y="49" width="42" height="6" rx="1" fill={C} fillOpacity=".5"/>
        <rect x="146" y="62" width="30" height="5" rx="1.5" fill={G}/>
        <rect x="182" y="62" width="18" height="5" rx="1.5" fill={G}/>
      </svg>
    ),

    // ── BILL PAYMENT: 4 bill types with checks ────────────────────────────
    'thanh-toan-hoa-don': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        {[0,1,2,3].map(i=>(
          <g key={i}>
            <rect x="12" y={12+i*26} width="140" height="20" rx="4" fill={i<2?'white':O} stroke={G} strokeWidth="1"/>
            <rect x="20" y={17+i*26} width={40+i*8} height="5" rx="2" fill={G}/>
            <rect x="20" y={23+i*26} width={20+i*4} height="4" rx="2" fill={O}/>
            <circle cx="138" cy={22+i*26} r="8" fill={i<2?C:G} fillOpacity={i<2?1:.5}/>
            {i<2&&<polyline points={`132,${22+i*26} 136,${26+i*26} 144,${18+i*26}`} fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}
          </g>
        ))}
        <rect x="168" y="12" width="44" height="96" rx="5" fill="none" stroke={G} strokeWidth="1"/>
        <rect x="176" y="20" width="28" height="20" rx="3" fill={C}/>
        <rect x="178" y="48" width="24" height="5" rx="2" fill={O}/>
        <rect x="178" y="58" width="18" height="5" rx="2" fill={O}/>
        <rect x="178" y="68" width="22" height="5" rx="2" fill={G}/>
        <rect x="176" y="80" width="28" height="20" rx="3" fill={O} stroke={G} strokeWidth="1"/>
      </svg>
    ),

    // ── EXPENSE MANAGEMENT: donut chart + legend ──────────────────────────
    'quan-ly-chi-tieu': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <circle cx="72" cy="60" r="48" fill="none" stroke={O} strokeWidth="16"/>
        <circle cx="72" cy="60" r="48" fill="none" stroke={C} strokeWidth="16"
          strokeDasharray="75 226" strokeDashoffset="0" strokeLinecap="butt"/>
        <circle cx="72" cy="60" r="48" fill="none" stroke={G} strokeWidth="16"
          strokeDasharray="50 226" strokeDashoffset="-75" strokeLinecap="butt"/>
        <circle cx="72" cy="60" r="48" fill="none" stroke={I} strokeWidth="16"
          strokeDasharray="30 226" strokeDashoffset="-125" strokeLinecap="butt"/>
        <circle cx="72" cy="60" r="34" fill={BG}/>
        <circle cx="72" cy="60" r="4" fill={C}/>
        <rect x="140" y="18" width="72" height="84" rx="5" fill="none" stroke={G} strokeWidth="1"/>
        {[[C,'Ăn uống','33%'],[G,'Mua sắm','22%'],[I,'Di chuyển','13%'],[O,'Khác','32%']].map(([col,label,pct],i)=>(
          <g key={i}>
            <rect x="148" y={28+i*18} width="8" height="8" rx="2" fill={col as string}/>
            <rect x="162" y={30+i*18} width="24" height="4" rx="2" fill={G}/>
            <rect x="194" y={30+i*18} width="12" height="4" rx="2" fill={i<2?C:G} fillOpacity=".5"/>
          </g>
        ))}
      </svg>
    ),

    // ── CINEMA: film strip grid + screen ─────────────────────────────────
    'cinema': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <rect x="10" y="10" width="130" height="100" rx="5" fill={C} fillOpacity=".06" stroke={G} strokeWidth="1"/>
        {[0,1,2,3,4,5].map(i=>(
          <g key={i}>
            <rect x="14" y={14+i*16} width="12" height="10" rx="2" fill={i%2===0?C:O} fillOpacity={i%2===0?.7:.5}/>
            <rect x="124" y={14+i*16} width="12" height="10" rx="2" fill={i%2===0?C:O} fillOpacity={i%2===0?.7:.5}/>
          </g>
        ))}
        {[0,1,2].map(col=>[0,1,2].map(row=>(
          <rect key={`${col}${row}`} x={30+col*32} y={18+row*32} width="26" height="22" rx="2"
            fill={(col+row)%2===0?O:G} stroke="none"/>
        )))}
        <rect x="30" y="18" width="26" height="22" rx="2" fill={C}/>
        <polygon points="36,22 36,36 50,29" fill="white" fillOpacity=".8"/>
        <rect x="150" y="16" width="60" height="88" rx="5" fill="none" stroke={G} strokeWidth="1.5"/>
        <rect x="158" y="24" width="44" height="34" rx="3" fill={C} fillOpacity=".08"/>
        <circle cx="180" cy="41" r="10" fill={C} fillOpacity=".12"/>
        <polygon points="175,36 175,46 185,41" fill={C} fillOpacity=".5"/>
        <rect x="158" y="66" width="44" height="5" rx="2" fill={G}/>
        <rect x="158" y="76" width="32" height="5" rx="2" fill={O}/>
        <rect x="158" y="86" width="38" height="5" rx="2" fill={O}/>
      </svg>
    ),

    // ── KNOWLEDGE: OUT-APP TRAFFIC — foundation pyramid ───────────────────
    'out-app-traffic': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <rect x="10" y="88" width="160" height="14" rx="3" fill={O}/>
        <rect x="24" y="70" width="132" height="14" rx="3" fill={G}/>
        <rect x="38" y="52" width="104" height="14" rx="3" fill={C} fillOpacity=".25"/>
        <rect x="52" y="34" width="76" height="14" rx="3" fill={C} fillOpacity=".55"/>
        <rect x="66" y="16" width="48" height="14" rx="3" fill={C}/>
        <rect x="10" y="104" width="160" height="4" rx="2" fill={C} fillOpacity=".08"/>
        {[0,1,2,3,4].map(i=>(
          <circle key={i} cx={190+0} cy={18+i*22} r="4" fill={i<2?C:i<4?O:G}/>
        ))}
        <line x1="190" y1="18" x2="190" y2="106" stroke={G} strokeWidth="1"/>
        {[0,1,2,3,4].map(i=>(
          <circle key={i} cx={190} cy={18+i*22} r="4" fill={i===0?C:i===1?C:O} fillOpacity={i===0?1:i===1?.6:.4}/>
        ))}
      </svg>
    ),

    // ── KNOWLEDGE: GEO FRAMEWORK — target/focus ───────────────────────────
    'geo-framework': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <circle cx="80" cy="60" r="55" fill="none" stroke={O} strokeWidth="1.5"/>
        <circle cx="80" cy="60" r="38" fill="none" stroke={G} strokeWidth="1.5"/>
        <circle cx="80" cy="60" r="22" fill="none" stroke={C} strokeWidth="1.5" strokeDasharray="4 3"/>
        <circle cx="80" cy="60" r="8" fill={C} fillOpacity=".15"/>
        <circle cx="80" cy="60" r="4" fill={C}/>
        <line x1="80" y1="5" x2="80" y2="18" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="80" y1="102" x2="80" y2="115" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="25" y1="60" x2="38" y2="60" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="122" y1="60" x2="135" y2="60" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="148" y="18" width="66" height="84" rx="5" fill="none" stroke={G} strokeWidth="1"/>
        {[0,1,2,3].map(i=>(
          <rect key={i} x="156" y={26+i*20} width={i===0?50:i===1?38:i===2?46:32} height="10" rx="2"
            fill={i===0?C:O} fillOpacity={i===0?1:.6}/>
        ))}
        <circle cx="202" cy="88" r="6" fill={I}/>
      </svg>
    ),

    // ── KNOWLEDGE: JTBD — flow nodes (job mapping) ────────────────────────
    'jtbd': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <circle cx="30" cy="60" r="16" fill={C}/>
        <circle cx="30" cy="60" r="6" fill="white" fillOpacity=".5"/>
        <line x1="46" y1="60" x2="72" y2="60" stroke={C} strokeWidth="1.5" strokeDasharray="3 2"/>
        <polygon points="70,56 76,60 70,64" fill={C}/>
        <circle cx="90" cy="60" r="14" fill="none" stroke={C} strokeWidth="1.5"/>
        <circle cx="90" cy="44" r="5" fill={O} stroke={G} strokeWidth="1"/>
        <circle cx="90" cy="76" r="5" fill={O} stroke={G} strokeWidth="1"/>
        <line x1="90" y1="49" x2="90" y2="55" stroke={G} strokeWidth="1"/>
        <line x1="90" y1="65" x2="90" y2="71" stroke={G} strokeWidth="1"/>
        <line x1="104" y1="60" x2="124" y2="60" stroke={C} strokeWidth="1.5" strokeDasharray="3 2"/>
        <polygon points="122,56 128,60 122,64" fill={C} fillOpacity=".5"/>
        <rect x="130" y="20" width="82" height="80" rx="6" fill="none" stroke={G} strokeWidth="1"/>
        {[0,1,2].map(i=>(
          <g key={i}>
            <rect x="138" y={30+i*24} width="16" height="14" rx="3" fill={i===0?C:O} fillOpacity={i===0?1:.7}/>
            <rect x="162" y={34+i*24} width="40" height="5" rx="2" fill={G}/>
            <rect x="162" y={40+i*24} width="28" height="4" rx="2" fill={O}/>
          </g>
        ))}
      </svg>
    ),

    // ── KNOWLEDGE: WEB-TO-APP — funnel flow ───────────────────────────────
    'web-to-app': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <rect x="10" y="14" width="180" height="16" rx="3" fill={O}/>
        <rect x="22" y="38" width="156" height="16" rx="3" fill={G}/>
        <rect x="34" y="62" width="132" height="16" rx="3" fill={C} fillOpacity=".3"/>
        <rect x="46" y="86" width="108" height="16" rx="3" fill={C} fillOpacity=".7"/>
        <polygon points="100,108 110,120 90,120" fill={C}/>
        <circle cx="200" cy="22" r="7" fill={I}/>
        <circle cx="200" cy="46" r="7" fill={I} fillOpacity=".7"/>
        <circle cx="200" cy="70" r="7" fill={I} fillOpacity=".4"/>
        <circle cx="200" cy="94" r="7" fill={I} fillOpacity=".2"/>
        <line x1="200" y1="29" x2="200" y2="39" stroke={I} strokeWidth="1" strokeOpacity=".5"/>
        <line x1="200" y1="53" x2="200" y2="63" stroke={I} strokeWidth="1" strokeOpacity=".5"/>
        <line x1="200" y1="77" x2="200" y2="87" stroke={I} strokeWidth="1" strokeOpacity=".5"/>
      </svg>
    ),

    // ── KNOWLEDGE: TRACKING FRAMEWORK — analytics ──────────────────────
    'tracking-framework': (
      <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="120" fill={BG}/>
        <line x1="18" y1="100" x2="200" y2="100" stroke={G} strokeWidth="1"/>
        <line x1="18" y1="100" x2="18" y2="10" stroke={G} strokeWidth="1"/>
        <rect x="26" y="74" width="18" height="26" rx="2" fill={O}/>
        <rect x="52" y="56" width="18" height="44" rx="2" fill={G}/>
        <rect x="78" y="40" width="18" height="60" rx="2" fill={C} fillOpacity=".4"/>
        <rect x="104" y="22" width="18" height="78" rx="2" fill={C} fillOpacity=".7"/>
        <rect x="130" y="10" width="18" height="90" rx="2" fill={C}/>
        <polyline points="35,70 61,52 87,36 113,18 139,6" fill="none" stroke={I} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="35" cy="70" r="2.5" fill={I}/>
        <circle cx="61" cy="52" r="2.5" fill={I}/>
        <circle cx="87" cy="36" r="2.5" fill={I}/>
        <circle cx="113" cy="18" r="2.5" fill={I}/>
        <circle cx="139" cy="6" r="2.5" fill={I}/>
        <rect x="158" y="14" width="56" height="86" rx="5" fill="none" stroke={G} strokeWidth="1"/>
        {[0,1,2,3].map(i=>(
          <rect key={i} x="166" y={24+i*20} width={i===0?40:i===1?28:i===2?36:20} height="10" rx="2"
            fill={i===0?C:O} fillOpacity={i===0?.7:.5}/>
        ))}
      </svg>
    ),
  }

  const fallback = (
    <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="220" height="120" fill={BG}/>
      <rect x="20" y="20" width="80" height="80" rx="8" fill={O}/>
      <rect x="32" y="46" width="56" height="6" rx="3" fill={G}/>
      <rect x="32" y="58" width="40" height="6" rx="3" fill={G}/>
      <rect x="32" y="70" width="48" height="6" rx="3" fill={G}/>
      <circle cx="156" cy="60" r="44" fill="none" stroke={O} strokeWidth="1.5"/>
      <circle cx="156" cy="60" r="28" fill="none" stroke={G} strokeWidth="1.5"/>
      <circle cx="156" cy="60" r="12" fill={C} fillOpacity=".15"/>
      <circle cx="156" cy="60" r="5" fill={C}/>
    </svg>
  )

  return <>{map[id] ?? fallback}</>
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* Background grid */}
      {[0,1,2,3,4,5,6].map(i=>[0,1,2,3,4,5].map(j=>(
        <circle key={`${i}${j}`} cx={20+i*48} cy={20+j*44} r="1.5" fill="white" fillOpacity=".12"/>
      )))}
      {/* Main geometric shape — stacked rects */}
      <rect x="180" y="40" width="130" height="160" rx="8" fill="white" fillOpacity=".04"/>
      <rect x="192" y="56" width="106" height="128" rx="6" fill="white" fillOpacity=".05"/>
      <rect x="204" y="72" width="82" height="96" rx="4" fill="white" fillOpacity=".07"/>
      <rect x="216" y="88" width="58" height="64" rx="3" fill="white" fillOpacity=".1"/>
      <rect x="228" y="104" width="34" height="32" rx="2" fill="white" fillOpacity=".15"/>
      {/* Horizontal accent lines */}
      <line x1="20" y1="200" x2="160" y2="200" stroke="white" strokeWidth="1" strokeOpacity=".1"/>
      <line x1="20" y1="216" x2="120" y2="216" stroke="white" strokeWidth="1" strokeOpacity=".07"/>
      <line x1="20" y1="232" x2="140" y2="232" stroke="white" strokeWidth="1" strokeOpacity=".05"/>
      {/* Top-right accent circle */}
      <circle cx="310" cy="30" r="50" fill="white" fillOpacity=".03"/>
      <circle cx="310" cy="30" r="32" fill="white" fillOpacity=".04"/>
      <circle cx="310" cy="30" r="16" fill="white" fillOpacity=".06"/>
      {/* Small dot accents */}
      <circle cx="170" cy="50" r="3" fill="white" fillOpacity=".2"/>
      <circle cx="185" cy="50" r="3" fill="white" fillOpacity=".12"/>
      <circle cx="200" cy="50" r="3" fill="white" fillOpacity=".07"/>
    </svg>
  )
}

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div style={{ width: 28, height: 2, background: 'var(--clay)', flexShrink: 0 }} />
      <span style={{
        fontFamily: "'Roboto Mono', monospace",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--clay)',
      }}>
        {label}
      </span>
    </div>
  )
}

function SectionHeader({ num, title, subtitle }: { num: string; title: string; subtitle?: string }) {
  return (
    <div className="flex items-baseline gap-5 mb-2">
      <span style={{
        fontFamily: "'Roboto Mono', monospace",
        fontSize: 11,
        fontWeight: 400,
        color: 'var(--clay)',
        opacity: 0.45,
        minWidth: 20,
        flexShrink: 0,
      }}>
        {num}
      </span>
      <div>
        <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: 'var(--ink)' }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: 'var(--ink-3)' }}>{subtitle}</p>
        )}
      </div>
    </div>
  )
}

function HoverPreview({ project, anchorRect }: { project: Project; anchorRect: DOMRect }) {
  const dc = project.division ? divisionColors[project.division] : null
  const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1440
  const spaceRight = viewportW - anchorRect.right
  const showLeft = spaceRight < 320

  const style: React.CSSProperties = {
    position: 'fixed',
    top: Math.min(anchorRect.top, window.innerHeight - 280),
    ...(showLeft
      ? { right: viewportW - anchorRect.left + 8 }
      : { left: anchorRect.right + 8 }),
    width: 280,
    zIndex: 999,
    pointerEvents: 'none',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      style={style}
    >
      <div className="rounded-2xl overflow-hidden" style={{
        background: '#fff',
        border: '1.5px solid var(--gray-300)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
      }}>
        <div className="h-1" style={{ background: dc ? dc.border : 'var(--clay)' }} />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            {dc && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: dc.bg, color: dc.text }}>
                {project.division}
              </span>
            )}
            <span className="text-[10px]" style={{ color: 'var(--ink-ghost)' }}>
              {new Date(project.updatedAt).toLocaleDateString('vi-VN', { month: 'short', year: 'numeric' })}
            </span>
          </div>
          <p className="font-bold text-[14px] leading-snug mb-0.5" style={{ color: 'var(--ink)' }}>{project.title}</p>
          <p className="text-[10px] mb-2 truncate" style={{ color: 'var(--ink-ghost)', fontFamily: "'Roboto Mono', monospace" }}>{project.subtitle}</p>
          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{project.description}</p>
          {project.metrics && (
            <div className="flex gap-3 mt-3 pt-2.5" style={{ borderTop: '1px solid var(--border)' }}>
              {project.metrics.map(m => (
                <div key={m.label}>
                  <div className="text-xs font-black" style={{ color: 'var(--clay)' }}>{m.value}</div>
                  <div className="text-[9px]" style={{ color: 'var(--ink-ghost)' }}>{m.label}</div>
                </div>
              ))}
            </div>
          )}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {project.tags.map(t => (
                <span key={t} className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: '#F1F5F9', color: 'var(--ink-3)' }}>
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className="mt-3 pt-2.5 flex items-center gap-1" style={{ borderTop: '1px solid var(--border)' }}>
            <span className="text-[10px] font-semibold" style={{ color: 'var(--clay)' }}>Click để xem tài liệu →</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

export default function HomePage() {
  const { open: sidebarOpen, setOpen: setSidebarOpen } = useSidebar()
  const [activeDivision, setActiveDivision] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredProject, setHoveredProject] = useState<{ project: Project; rect: DOMRect } | null>(null)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => { if (hoverTimeout.current) clearTimeout(hoverTimeout.current) }
  }, [])

  const useCaseProjects = projects.filter(p => p.category === 'use-case')
  const knowledgeProjects = projects.filter(p => p.category === 'knowledge')

  const fuse = new Fuse(useCaseProjects, {
    keys: ['title', 'description', 'tags', 'subtitle'],
    threshold: 0.3,
    includeScore: true,
  })

  const filteredUseCases = useCaseProjects.filter(p => {
    const matchesDivision = activeDivision ? p.division === activeDivision : true
    if (!searchQuery.trim()) return matchesDivision
    const result = fuse.search(searchQuery)
    return matchesDivision && result.some(r => r.item.id === p.id)
  })

  const knowledgeFuse = new Fuse(knowledgeProjects, {
    keys: ['title', 'description', 'tags', 'subtitle'],
    threshold: 0.3,
    includeScore: true,
  })

  const filteredKnowledge = knowledgeProjects.filter(p => {
    if (!searchQuery.trim()) return true
    return knowledgeFuse.search(searchQuery).some(r => r.item.id === p.id)
  })

  const allDivisions = Array.from(new Set(useCaseProjects.map(p => p.division).filter(Boolean))) as string[]
  const filterTabs = [
    { id: null, label: 'All', count: useCaseProjects.length },
    ...allDivisions.map(d => ({
      id: d,
      label: d,
      count: useCaseProjects.filter(p => p.division === d).length,
    })),
  ]

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <AnimatePresence>
        {hoveredProject && (
          <HoverPreview project={hoveredProject.project} anchorRect={hoveredProject.rect} />
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-y-auto w-full">

        {/* ── HERO ── */}
        <div className="relative overflow-hidden" style={{ background: 'var(--clay)', minHeight: 260 }}>
          {/* Dot grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
          {/* Radial glow */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(92,124,163,.18) 0%, transparent 65%)',
          }} />

          {/* MoMo logo */}
          <div className="absolute top-5 right-6 sm:right-12 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/momo-logo-white.png" alt="MoMo" className="h-9 sm:h-11 w-auto opacity-30" />
          </div>

          <div className="relative z-10 px-6 sm:px-12 pt-10 pb-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">

            {/* Left: profile */}
            <div className="flex-1 min-w-0">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <div style={{ width: 24, height: 2, background: 'rgba(255,255,255,.35)', flexShrink: 0 }} />
                <span style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(250,249,245,.5)',
                }}>
                  Growth Portfolio · 2026
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Avatar + name row */}
              <div className="flex items-center gap-4 mb-3">
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 120 }}
                  className="flex-shrink-0 rounded-full overflow-hidden"
                  style={{ width: 64, height: 64, border: '2.5px solid rgba(255,255,255,.2)', boxShadow: '0 6px 24px rgba(0,0,0,0.35)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatar.jpg" alt="Klaus" className="w-full h-full object-cover" />
                </motion.div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none" style={{ color: 'var(--ivory)' }}>
                    Van Hien (Klaus)
                  </h1>
                  <p className="text-sm mt-1" style={{ color: 'rgba(250,249,245,.5)' }}>
                    SEO & GEO Lead ·{' '}
                    <span style={{ color: 'rgba(250,249,245,.8)', fontWeight: 600 }}>momo.vn</span>
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed max-w-md mb-5" style={{ color: 'rgba(250,249,245,.4)' }}>
                Web Growth Traffic & Web-to-App Optimization · Out-App Traffic / GPD
              </p>

              {/* Contact row */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(250,249,245,.38)' }}>
                  <Phone size={11} strokeWidth={1.8} /> 090 6973942
                </span>
                <span className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(250,249,245,.38)' }}>
                  <Mail size={11} strokeWidth={1.8} /> hien.ho@momo.vn
                </span>
                <a
                  href="https://chat.google.com/dm/hien.ho@mservice.com.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-80"
                  style={{ background: 'rgba(250,249,245,.1)', color: 'var(--ivory)', border: '1px solid rgba(255,255,255,.18)' }}
                >
                  <MessageCircle size={11} strokeWidth={1.8} /> Chat
                </a>
              </div>
            </div>

            {/* Right: stats + illustration */}
            <div className="hidden lg:flex flex-col gap-4" style={{ width: 320 }}>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 160, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>
                <HeroIllustration />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: `${useCaseProjects.length}`, label: 'Use Cases', icon: FileText },
                  { value: `${knowledgeProjects.length}`, label: 'Frameworks', icon: BookOpen },
                  { value: '7yr', label: 'Experience', icon: Clock },
                ].map(s => {
                  const Icon = s.icon
                  return (
                  <div key={s.label} className="rounded-xl px-3 py-2.5 text-center" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)' }}>
                    <div className="flex justify-center mb-1">
                      <Icon size={13} strokeWidth={1.8} style={{ color: 'rgba(250,249,245,.3)' }} />
                    </div>
                    <div className="text-lg font-black leading-tight" style={{ color: 'var(--ivory)' }}>{s.value}</div>
                    <div className="text-[10px]" style={{ color: 'rgba(250,249,245,.4)', fontFamily: "'Roboto Mono', monospace" }}>{s.label}</div>
                  </div>
                )})}
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="px-6 sm:px-12 py-10 sm:py-14">

          {/* ── SECTION 01: Use Case Document ── */}
          <div className="mb-16">
            <Eyebrow label="Use Case Document" />
            <SectionHeader
              num="01"
              title="Use Case Document"
              subtitle="Chiến lược và tài liệu thực thi cho từng Use Case"
            />

            {/* Search + filter row */}
            <div className="mt-6 mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border rounded-xl text-xs outline-none transition-all"
                  style={{ borderColor: 'var(--border)', width: 200 }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--clay)'; e.target.style.boxShadow = '0 0 0 3px rgba(32,41,64,.08)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
                <Search size={13} strokeWidth={1.8} className="absolute left-3 top-2.5" style={{ color: 'var(--ink-ghost)' }} />
              </div>

              {/* Division filter pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {filterTabs.map(tab => {
                  const isActive = activeDivision === tab.id
                  const dc = tab.id ? divisionColors[tab.id] : null
                  return (
                    <button
                      key={tab.label}
                      onClick={() => setActiveDivision(tab.id as string | null)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200"
                      style={{
                        background: isActive ? (dc ? dc.text : 'var(--clay)') : 'var(--bg-panel)',
                        color: isActive ? '#fff' : 'var(--ink-3)',
                        border: `1.5px solid ${isActive ? (dc ? dc.text : 'var(--clay)') : 'var(--border)'}`,
                        boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                      }}
                    >
                      {tab.label}
                      <span className="text-[10px] font-black opacity-60">{tab.count}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Empty state */}
            {filteredUseCases.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'var(--gray-100)' }}>
                  <Search size={20} strokeWidth={1.8} style={{ color: 'var(--clay)' }} />
                </div>
                <p className="text-sm font-bold" style={{ color: 'var(--ink-2)' }}>Không tìm thấy kết quả</p>
                <p className="text-xs mt-1" style={{ color: 'var(--ink-ghost)' }}>
                  Thử từ khoá khác hoặc{' '}
                  <button onClick={() => { setSearchQuery(''); setActiveDivision(null) }} className="underline font-semibold" style={{ color: 'var(--clay)' }}>
                    xoá bộ lọc
                  </button>
                </p>
              </motion.div>
            )}

            {/* Use Case cards */}
            <motion.div
              variants={containerVariants}
              initial={false}
              animate="visible"
              key={activeDivision || 'all'}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredUseCases.map(p => {
                  const dc = p.division ? divisionColors[p.division] : null
                  return (
                    <motion.div key={p.id} layout variants={cardVariants} exit={{ opacity: 0, scale: 0.95 }}>
                      <Link href={`/projects/${p.id}`} className="block group h-full">
                        <div
                          className="rounded-xl overflow-hidden border transition-all duration-300 group-hover:-translate-y-0.5 h-full flex flex-col"
                          style={{
                            background: 'var(--bg-panel)',
                            borderColor: 'var(--border)',
                            boxShadow: 'var(--shadow-sm)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                            e.currentTarget.style.borderColor = dc ? dc.border + '40' : 'rgba(32,41,64,0.15)'
                            const rect = e.currentTarget.getBoundingClientRect()
                            hoverTimeout.current = setTimeout(() => setHoveredProject({ project: p, rect }), 400)
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                            e.currentTarget.style.borderColor = 'var(--border)'
                            if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
                            setHoveredProject(null)
                          }}
                        >
                          {/* Thumb zone */}
                          <div className="w-full overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/7', borderBottom: '1px solid var(--border)' }}>
                            <ThumbIllustration id={p.id} />
                          </div>

                          {/* Body */}
                          <div className="p-3 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-1.5">
                              {dc && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: dc.bg, color: dc.text }}>
                                  {p.division}
                                </span>
                              )}
                              <span className="text-[9px] ml-auto" style={{ color: 'var(--ink-ghost)', fontFamily: "'Roboto Mono', monospace" }}>
                                {new Date(p.updatedAt).toLocaleDateString('vi-VN', { month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                            <h3 className="font-bold text-[13px] leading-snug mb-0.5" style={{ color: 'var(--ink)' }}>
                              {p.title}
                            </h3>
                            <p className="text-[9px] mb-1.5 truncate" style={{ color: 'var(--ink-ghost)', fontFamily: "'Roboto Mono', monospace" }}>
                              {p.subtitle}
                            </p>
                            <p className="text-[11px] leading-relaxed line-clamp-2 flex-1" style={{ color: 'var(--ink-2)' }}>
                              {p.description}
                            </p>

                            {p.metrics && (
                              <div className="flex gap-3 mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                                {p.metrics.slice(0, 3).map(m => (
                                  <div key={m.label}>
                                    <div className="text-[11px] font-black" style={{ color: 'var(--clay)' }}>{m.value}</div>
                                    <div className="text-[9px]" style={{ color: 'var(--ink-ghost)' }}>{m.label}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Footer */}
                          <div
                            className="px-3 py-2 flex items-center justify-between flex-shrink-0"
                            style={{ borderTop: '1px solid var(--border)', background: 'var(--gray-100)' }}
                          >
                            <span style={{
                              fontFamily: "'Roboto Mono', monospace",
                              fontSize: 8,
                              fontWeight: 500,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              color: 'var(--ink-ghost)',
                            }}>
                              {p.id}
                            </span>
                            <ArrowRight size={11} strokeWidth={1.8} style={{ color: 'var(--clay)', opacity: 0.5 }} className="transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── SECTION 02: Knowledge & Guideline ── */}
          <div
            className="rounded-3xl px-6 sm:px-10 py-10"
            style={{ background: 'var(--oat)' }}
          >
            <Eyebrow label="Knowledge & Guideline" />
            <SectionHeader
              num="02"
              title="Knowledge & Guideline"
              subtitle="Framework và Playbook áp dụng cross-product"
            />

            <motion.div
              variants={containerVariants}
              initial={false}
              whileInView="visible"
              viewport={{ once: true }}
              key={`knowledge-${searchQuery}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6"
            >
              {filteredKnowledge.map(p => (
                <motion.div key={p.id} variants={cardVariants}>
                  <Link href={`/projects/${p.id}`} className="block group">
                    <div
                      className="rounded-xl overflow-hidden border transition-all duration-300 group-hover:-translate-y-0.5 h-full flex flex-col"
                      style={{
                        background: 'var(--white)',
                        borderColor: 'var(--gray-300)',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                        e.currentTarget.style.borderColor = 'rgba(124,58,237,.3)'
                        const rect = e.currentTarget.getBoundingClientRect()
                        hoverTimeout.current = setTimeout(() => setHoveredProject({ project: p, rect }), 400)
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                        e.currentTarget.style.borderColor = 'var(--gray-300)'
                        if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
                        setHoveredProject(null)
                      }}
                    >
                      {/* Thumb zone */}
                      <div className="w-full overflow-hidden" style={{ aspectRatio: '16/7', borderBottom: '1px solid var(--border)' }}>
                        <ThumbIllustration id={p.id} />
                      </div>

                      {/* Body */}
                      <div className="p-3 flex-1 flex flex-col">
                        <h3 className="font-bold text-[13px] leading-snug mb-1.5" style={{ color: 'var(--ink)' }}>
                          {p.title}
                        </h3>
                        <p className="text-[10px] leading-relaxed line-clamp-3 flex-1" style={{ color: 'var(--ink-2)' }}>
                          {p.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {p.tags.slice(0, 3).map(t => (
                            <span key={t} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md" style={{ background: '#EDE9FE', color: '#7C3AED' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer */}
                      <div
                        className="px-3 py-2 flex items-center justify-between"
                        style={{ borderTop: '1px solid var(--border)', background: 'rgba(237,233,254,.35)' }}
                      >
                        <span style={{
                          fontFamily: "'Roboto Mono', monospace",
                          fontSize: 8,
                          fontWeight: 500,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'rgba(124,58,237,.45)',
                        }}>
                          {p.id}
                        </span>
                        <ArrowRight size={11} strokeWidth={1.8} style={{ color: '#7C3AED', opacity: 0.5 }} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Bottom padding */}
        <div className="h-16" />
      </main>

      {/* Admin FAB */}
      <Link href="/admin" className="fixed bottom-6 right-6 z-50 group">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ background: 'var(--clay)', boxShadow: '0 6px 24px rgba(32,41,64,0.35)' }}
        >
          <Shield size={18} strokeWidth={1.8} color="white" />
        </div>
        <div
          className="absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
          style={{ background: 'var(--clay)' }}
        >
          Admin
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{ borderTopColor: 'var(--clay)' }} />
        </div>
      </Link>
    </div>
  )
}
