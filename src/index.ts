import { getUserMedia, getAudioInputDevices } from '../utils'

export class Recorder {
  constructor() {
    this._audioChunks = []
    this._mediaRecorder = null
    this._stream = null
    this._isPaused = false
  }

 getAudioInputDevices (){
    return getAudioInputDevices()
 }

  async start(deviceId = null) {
    try {
      const constraints = {
        audio: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
        },
        video: false,
      }
      this._stream = await getUserMedia(constraints)
      this._mediaRecorder = new MediaRecorder(this._stream)

      this._mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0)
          this._audioChunks.push(event.data)
      }

      this._mediaRecorder.start()
    } catch (error) {
      console.error('Error starting recorder:', error)
    }
  }

  pause() {
    return new Promise((resolve, reject) => {
      if (this._mediaRecorder && this._mediaRecorder.state === 'recording') {
        this._mediaRecorder.pause()
        this._isPaused = true
        resolve('')
      } else {
        reject(new Error('pause error'))
      }
    })
  }

  resume() {
    return new Promise((resolve, reject) => {
      if (this._mediaRecorder && this._mediaRecorder.state === 'paused') {
        this._mediaRecorder.resume()
        this._isPaused = false
        resolve()
      } else {
        reject(new Error('resume error'))
      }
    })
  }

  stop() {
    return new Promise((resolve, reject) => {
      if (this._mediaRecorder) {
        this._mediaRecorder.onstop = () => {
          this._stream.getTracks().forEach(track => track.stop())
          resolve()
        }
        this._mediaRecorder.stop()
      } else {
        reject(new Error('Recorder has not been started.'))
      }
    })
  }

  getData() {
    return new Blob(this._audioChunks, { type: 'audio/webm' })
  }

  async getFile(name: string = 'recording', type: string = 'webm') {
    const blob = this.getData()
    return new File([blob], name, { type: `audio/${type}` })
  }

  async getArrayBuffer() {
    const blob = this.getData()
    return await blob.arrayBuffer()
  }
}
