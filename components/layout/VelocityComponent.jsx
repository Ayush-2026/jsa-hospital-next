'use client'
import React from 'react'
import { Poppins } from 'next/font/google'
import ScrollVelocity from '../external_Components/ScrollVelocity'
import { tr } from '@/lib/translations'

const poppins = Poppins({ subsets: ['latin'], weight: ['600'], display: 'swap' })

const VelocityComponent = ({ lang = 'en' }) => {
  const texts = tr(lang).ticker;
  return (
    <div>
      <div
        className="w-full py-1 sm:py-2 overflow-hidden"
        style={{ background: 'linear-gradient(to right, #3aaa8f, #2c608e)' }}
      >
        <ScrollVelocity
          texts={texts}
          className={`custom-scroll-text text-sm sm:text-lg md:text-2xl text-white ${poppins.className}`}
          velocity={20}
          separator="     "
          repeatc={1}
        />
      </div>
    </div>
  );
}

export default VelocityComponent
