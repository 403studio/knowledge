/**
 * 根据base64编码下载文件
 * @param {string} data base64数据
 * @param {string} mimeType mime类型
 * @param {string} fileName 文件名称
 */
export function downLoadBase64File(data, mimeType, fileName) {
  const base64ToBlob = function(data) {
    let raw = window.atob(data)
    let rawLength = raw.length
    let uInt8Array = new Uint8Array(rawLength)
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], {
      type: mimeType
    })
  }

  let aLink = document.createElement('a')
  let blob = base64ToBlob(data)
  let evt = document.createEvent('HTMLEvents')
  evt.initEvent('click', true, true) //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
}

/**
 * 对base64编码格式图片进行压缩
 * @param {String} base64String 需要压缩的图片base64码
 * @param {Number} maxWidth 最大宽度
 * @param {Number} quality 压缩质量
 * @return {String} 经过压缩后的图片base64
 */
export function compressImg(base64String, maxWidth = 1980, quality = 0.8) {
  const getMimeType = function(urlData) {
    const arr = urlData.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    // return mime.replace("image/", "");
    return mime
  }
  const newImage = new Image()
  let imgWidth, imgHeight
  // var promise = new Promise(resolve => newImage.onload = resolve)
  newImage.src = base64String
  return new Promise((resolve, reject) => {
    newImage.onload = function() {
      imgWidth = this.width
      imgHeight = this.height
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (Math.max(imgWidth, imgHeight) > maxWidth) {
        if (imgWidth > imgHeight) {
          canvas.width = maxWidth
          canvas.height = (maxWidth * imgHeight) / imgWidth
        } else {
          canvas.height = maxWidth
          canvas.width = (maxWidth * imgWidth) / imgHeight
        }
      } else {
        canvas.width = imgWidth
        canvas.height = imgHeight
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
      const base64 = canvas.toDataURL(getMimeType(base64String), quality)
      resolve(base64)
    }
    newImage.onerror = function(e) {
      reject(new Error('图片加载失败'))
    }
  })
}
