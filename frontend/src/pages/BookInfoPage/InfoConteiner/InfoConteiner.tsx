import { Line1 } from './Line1/Line1';
import { Line2 } from './Line2/Line2';
import { Line3 } from './Line3/Line3';
import './style.scss';

export function InfoConteiner(){
    return <div className='info-conteiner'>
        <Line1/>
        <Line2/>
        <Line3/>
        <div className='comments'>

        </div>
    </div>
}