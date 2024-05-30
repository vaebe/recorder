export async function getUserMedia(constraints: MediaStreamConstraints) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    return navigator.mediaDevices.getUserMedia(constraints)
  else
    throw new Error('getUserMedia not supported')
}

export async function getAudioInputDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  return devices.filter(device => device.kind === 'audioinput')
}
