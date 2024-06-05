function fileToBase64Async(file:any) {
    return new Promise((resolve, reject) => {
      const reader:any = new FileReader();
  
      reader.onload = function () {
        const base64String = btoa(reader?.result);
        resolve(base64String);
      };
  
      reader.onerror = function (error:any) {
        reject(error);
      };
  
      reader.readAsBinaryString(file);
    });
}

export default fileToBase64Async