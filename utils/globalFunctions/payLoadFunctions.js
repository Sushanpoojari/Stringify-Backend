export  function getSuccessMessagePayload(status, message, dataList) {
   return dataList ?  {
        status: status,
        message: message,
        dataList: dataList,
    }:{
        status: status,
        message: message,
    }
}

export function getFailedMessagePayload(status, message, errorMessage) {
    return {
        status: status,
        message: message,
        errorMessage: errorMessage
    }
}
