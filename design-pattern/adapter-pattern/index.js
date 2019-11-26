class VlcPlayer {
    playVlc(fileName) {
       console.log("Playing vlc file. Name: "+ fileName);      
    }
}

class Mp4Player  {
    playMp4(fileName) {
        console.log("Playing mp4 file. Name: "+ fileName);      
    }
}

class MediaAdapter {
    constructor(audioType){
        switch(audioType) {
            case 'vlc':
                MediaAdapter.advancedMusicPlayer = new VlcPlayer();
                break;
            case 'mp4':
                MediaAdapter.advancedMusicPlayer = new Mp4Player();
                break;
        }
    }
    play(audioType, fileName) {
        switch(audioType) {
            case 'vlc':
                MediaAdapter.advancedMusicPlayer.playVlc(fileName);
                break;
            case 'mp4':
                MediaAdapter.advancedMusicPlayer.playMp4(fileName);
                break;
        }
    }
 }

 class AudioPlayer{
    play(audioType, fileName) {
        switch(audioType) {
            case 'mp3':
                console.log("Playing mp3 file. Name: "+ fileName);
                break;
            case 'vlc':
            case 'mp4':
                    AudioPlayer.mediaAdapter = new MediaAdapter(audioType);
                    AudioPlayer.mediaAdapter.play(audioType, fileName);
                break;
            default:
                console.log("Invalid media. "+
                    audioType + " format not supported");
                
                break;
        }
    }  
 }

 const audioPlayer = new AudioPlayer();

 audioPlayer.play("mp3", "beyond the horizon.mp3");
 audioPlayer.play("mp4", "alone.mp4");
 audioPlayer.play("vlc", "far far away.vlc");
 audioPlayer.play("avi", "mind me.avi");
 /**
  * output:
  * Playing mp3 file. Name: beyond the horizon.mp3
  * Playing mp4 file. Name: alone.mp4
  * Playing vlc file. Name: far far away.vlc
  * Invalid media. avi format not supported
  */