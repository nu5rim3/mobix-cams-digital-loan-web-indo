import * as React from 'react';
import './DotWave.css'

export interface IDotWaveProps {
}

export default function DotWave (props: IDotWaveProps) {
  return (
    <div className="dot-wave ">
        <div className="dot-wave__dot"></div>
        <div className="dot-wave__dot"></div>
        <div className="dot-wave__dot"></div>
        <div className="dot-wave__dot"></div>
  </div>
  );
}
