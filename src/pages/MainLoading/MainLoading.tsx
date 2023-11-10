import * as React from 'react';
import DotWave from '../../components/loaders/DotWave';
import digitalMe from '../../assets/digitalMe.png'
import lolcTech from '../../assets/lolcTech.jpeg'

export interface IMainLoadingProps {
}

export default function MainLoading (props: IMainLoadingProps) {
  return (
    <div>
      <div 
        className='w-screen h-screen flex flex-col justify-center items-center'
        style={{
          // background: 'linear-gradient(90deg, rgba(77,129,210,1) 0%, rgba(255,255,255,1) 84%)'
        }}    
      >
              <div className=' h-full flex flex-col'>
                <div className='h-2/4  flex flex-col justify-end items-center mt-20'>
                  <div className='mb-5'>
                    <img className='w-80' src={digitalMe}/>
                  </div>
                    <DotWave/>
                </div>

                <div className='  mt-0 h-2/4 flex flex-col justify-end items-center font-bold'>
                      <div className='flex justify-center items-center p-10'>
                        <div>
                          Powered By 
                        </div>
                        <div className='w-28 ml-3'>
                          <img className='w-full' src={lolcTech}/>
                        </div>
                      </div>
                  </div>
                </div>
      </div>
    </div>
  );
}
