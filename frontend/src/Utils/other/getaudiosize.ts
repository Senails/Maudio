const audioForCheckLenght = new Audio();
audioForCheckLenght.preload='metadata';
audioForCheckLenght.volume=0;



export async function getAudioSize(url:string):Promise<number>{
    return new Promise((res)=>{
      audioForCheckLenght.addEventListener('loadedmetadata',loadedmetadata);
      audioForCheckLenght.autoplay=true;
      audioForCheckLenght.src = url;

      function loadedmetadata(){
        res(audioForCheckLenght.duration);

        audioForCheckLenght.autoplay=false;
        audioForCheckLenght.src = '';
        audioForCheckLenght.removeEventListener('loadedmetadata',loadedmetadata);
      }
    })
  }