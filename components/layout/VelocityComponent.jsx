'use client'
import React from 'react'
import { Poppins } from 'next/font/google'
import ScrollVelocity from '../external_Components/ScrollVelocity'

const poppins = Poppins({ subsets: ['latin'], weight: ['600'], display: 'swap' })

const VelocityComponent = () => {
  return (
    <div>
      <div
        className="w-full py-2 overflow-hidden"
        style={{ background: 'linear-gradient(to right, #3aaa8f, #2c608e)' }}
      >
        <ScrollVelocity
          texts={[
            "🩺 Biggest Hospital in Nagpur...",
            "⚕️ Only Complete Diagnostic Center in SOUTH NAGPUR...",
          ]}
          className={`custom-scroll-text text-2xl text-white ${poppins.className}`}
          velocity={20}
          separator="     "
          repeatc={1}
        />
      </div>
    </div>
  );
}

export default VelocityComponent
