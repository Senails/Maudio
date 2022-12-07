import ProgressBar from './progressbar/ProgressBar';
import Volumebar from './volumebar/VolumeBar';
import './style.scss';
import { PlayButton } from './plauButton/playButton';
import { PrevNextButtons } from './PrevNextButtons/PrevNext';
import { H1Name } from './name/H1name';
import { WheelRect } from './wheelrect/WheelRect';

export function PleerUI(){
    return <div className='pleer_layer'>
        <div className='pleer_box'>
            <WheelRect>
                <H1Name/>
                <PlayButton/>
                <PrevNextButtons/>
            </WheelRect>
            <ProgressBar/>
        </div>
        <Volumebar/>
    </div>
}