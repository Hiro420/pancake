async function query_list_test() {
    var query = '{"region_list":[{"dispatch_url":"http://127.0.0.1/query_gateway","display_name":"붕괴 스타레일 채널","env_type":"0","name":"beta_release01_cn","title":""},{"dispatch_url":"http://alb-glzxwj1l6u0vcdw4og.internal.cn-shanghai.alb.aliyuncs.com/query_gateway","display_name":"응애 맘마줘","env_type":"0","name":"beta_release02_cn","title":""}],"retcode":0}'

    return query
}
// "http://alb-x9nil1sun1b63o991x.cn-shanghai.alb.aliyuncs.com/query_gateway"
// /query_gateway?version=CNBETAWin0.64.0&t=1649336962&uid=0&language_type=1&platform_type=3&dispatch_seed=7030b85b48&is_need_url=1
module.exports = {
    async execute(req, res) {
        
        var ret = await query_list_test();
        res.end(Buffer.from(ret));
    }

}