import React from "react";

export default function FlagIcon({ country, width = 24, height = 16, className = "" }) {
  const normalizedCountry = country?.split('-')[0]?.toLowerCase();

  if (normalizedCountry === "ku") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 900 600"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="#EB212E" width="900" height="600" />
        <rect fill="#FFFFFF" y="200" width="900" height="200" />
        <rect fill="#278E43" y="400" width="900" height="200" />
        <g transform="translate(450,300)" fill="#FECA05">
          <circle r="80" />
          {[...Array(21)].map((_, i) => (
            <polygon
              key={i}
              points="0,-170 15,-90 -15,-90"
              transform={`rotate(${i * (360 / 21)})`}
            />
          ))}
        </g>
      </svg>
    );
  }

  if (normalizedCountry === "en") {
    // Union Jack (Standard for English language)
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width={width} height={height} className={className}>
            <clipPath id="s">
                <path d="M0,0 v30 h60 v-30 z"/>
            </clipPath>
            <clipPath id="t">
                <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
            </clipPath>
            <g clipPath="url(#s)">
                <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
            </g>
        </svg>
    );
  }

  return null;
}
