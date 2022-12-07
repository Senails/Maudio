import { changePositiom, setDropElem } from "../../redux/slices/EditSlice";
import { dispatch, store } from "../../redux/store";

export function moveHandler(event:React.MouseEvent,type:'coll'|'book',num:number){
    let parent = event.currentTarget.parentElement;
    if (!parent) return;
    let clone = document.createElement('div');
    dispatch(setDropElem({num,type}));
    {   // clone
        clone.className=parent!.className;
        clone.innerHTML=parent!.innerHTML;
        clone.style.position='absolute';
        clone.style.zIndex='50';
        clone.style.width=parent!.clientWidth+'px';
        let rect = parent?.getBoundingClientRect();
        let bodyScrollTop = window.pageYOffset;
        clone.classList.add('droping');
        clone.style.left=rect!.left+'px';
        clone.style.top=rect!.top+bodyScrollTop+'px'; 
        document.body.appendChild(clone);                              
    }
    let {collections,showColl}=store.getState().edit;
    let alllenght = (type==='coll')?collections.length:collections[showColl].books.length;
    let startY = event.pageY;
    let startY2 = event.pageY;
    let index = num;

    function mousemove(e:MouseEvent){
        let nowY = e.pageY;
        let delta1 = nowY-startY;
        let delta2 = nowY-startY2;
        let deltaABS = Math.abs(delta1);
        clone.style.transform = `translateY(${delta2}px)`;

        if ((deltaABS+15)>45){
            let needindex =delta1>0?index+1:index-1;
            if (needindex<0 || needindex>=alllenght || needindex===index) return;
            dispatch(changePositiom({num:index,neednum:needindex,type}));
            index=needindex;
            startY = startY+(delta1>0?45:-45);
        }
    }

    function mouseup(){
        clone.remove();
        dispatch(setDropElem({num:-1,type:''}));
        document.removeEventListener('mousemove',mousemove);
        document.removeEventListener('mouseup',mouseup);
    }
    document.addEventListener('mouseup',mouseup);
    document.addEventListener('mousemove',mousemove);
}