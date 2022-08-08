const If = ({condition, onPass, onFail = null}) => {
    if(typeof condition === 'function')
    condition  =  condition()
    if(condition) return onPass;
    return onFail;
}
export default If