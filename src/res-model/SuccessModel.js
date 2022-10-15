/**
 * @description 成功返回的数据类型
 * @author 程序员小徐
 */

class SuccessModel{
    constructor(data){
        this.errno = 0 //成功返回的标志
        if(data !=null){
            this.data = data
        }
    }
}

module.exports = SuccessModel

// new SuccessModel()