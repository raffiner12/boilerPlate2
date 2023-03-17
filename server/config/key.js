// development 모드일 땐 환경변수가 development라고 뜨고,
// 배포 후면 production이라고 뜸
// 환경변수 : process.env.NODE_ENV
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
} 