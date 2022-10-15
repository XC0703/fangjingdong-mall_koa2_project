/**
 * @description 错误返回的数据类型
 * @author 程序员小徐
 */

class ErrorModel{
    constructor(errno = -1,message = 'error'){
        this.errno = errno //失败返回的标志
        this.message = message
    }
}

module.exports = ErrorModel

// new ErrorModel(10001,'注册失败')