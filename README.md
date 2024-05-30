# recorder

一个简单的录音库,仅实现录音、获取录音文件的方法,只有 2kb

# 使用
```ts
```

# 方法

| 方法名称                                    | 描述                            |
|-----------------------------------------|-------------------------------|
| `getAudioInputDevices()`                | 获取可用的音频输入设备列表。                |
| `start(deviceId?: string)`              | 开始录音。可以选择指定设备 ID。             |
| `pause()`                               | 暂停录音。                         |
| `resume()`                              | 恢复录音。                         |
| `stop()`                                | 停止录音并释放媒体资源。                  |
| `getData()`                             | 获取当前录音的 Blob 数据。              |
| `getFile(name?: string, type?: string)` | 获取当前录音的 File 对象。可以选择指定文件名和类型。 |
| `getArrayBuffer()`                      | 获取当前录音的 ArrayBuffer 数据。       |

