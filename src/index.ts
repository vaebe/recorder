import { getUserMedia, getAudioInputDevices } from '../utils';

export class Recorder {
  private _audioChunks: BlobPart[];
  private _mediaRecorder: MediaRecorder | null;
  private _stream: MediaStream | null;

  constructor() {
    this._audioChunks = [];
    this._mediaRecorder = null;
    this._stream = null;
  }

  getAudioInputDevices(): Promise<MediaDeviceInfo[]> {
    return getAudioInputDevices();
  }

  async start(deviceId: string | null = null): Promise<void> {
    try {
      const constraints: MediaStreamConstraints = {
        audio: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
        },
        video: false,
      };
      this._stream = await getUserMedia(constraints);
      this._mediaRecorder = new MediaRecorder(this._stream);

      this._mediaRecorder.ondataavailable = (event: BlobEvent): void => {
        if (event.data.size > 0) {
          this._audioChunks.push(event.data);
        }
      };

      this._mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recorder:', error);
    }
  }

  pause(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._mediaRecorder && this._mediaRecorder.state === 'recording') {
        this._mediaRecorder.pause();
        resolve();
      } else {
        reject(new Error('pause error'));
      }
    });
  }

  resume(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._mediaRecorder && this._mediaRecorder.state === 'paused') {
        this._mediaRecorder.resume();
        resolve();
      } else {
        reject(new Error('resume error'));
      }
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._mediaRecorder) {
        this._mediaRecorder.onstop = (): void => {
          this._stream?.getTracks().forEach(track => track.stop());
          resolve();
        };
        this._mediaRecorder.stop();
      } else {
        reject(new Error('Recorder has not been started.'));
      }
    });
  }

  getData(): Blob {
    return new Blob(this._audioChunks, { type: 'audio/webm' });
  }

  async getFile(name: string = 'recording', type: string = 'webm'): Promise<File> {
    const blob = this.getData();
    return new File([blob], name, { type: `audio/${type}` });
  }

  async getArrayBuffer(): Promise<ArrayBuffer> {
    const blob = this.getData();
    return await blob.arrayBuffer();
  }
}
