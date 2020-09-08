///Global functions

module.exports.GetPage = function GetPage(page) 
{
    return page > 0 ? page : 1;
}

module.exports.GetSearchParam = function GetSearchParam(param)
{
    return param != null ? param : "";
}