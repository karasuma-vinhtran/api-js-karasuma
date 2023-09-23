var LinkAPI_AccUser = "./accUser.json"
var LinkAPI_DataUser = "./dataUser.json"

if (location.href.search("index.html") == -1) {
    location.href = "./index.html" + location.search + location.hash
}
user_str = location.search.slice(1, location.search.length)
id_user = user_str.slice(user_str.search("=") + 1, user_str.length)
pass_str = location.hash.slice(1, location.hash.length)

DateLove = null

console.log("ID: " + id_user)
console.log("Pass: " + pass_str)

fetch(LinkAPI_AccUser, {
        method: "GET",
        mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
        if (data[id_user] == null || data[id_user] == undefined) {
            ErrData()
        } else {
            if (pass_str == data[id_user]["password"]) {
                getData(data[id_user]["id-data"])
            } else {
                ErrData()
            }
        }
    });

function ErrData() { console.log("Ko Tìm Thấy Dữ Liệu!") }

function getData(ID_Data) {
    fetch(LinkAPI_DataUser, {
            method: "GET",
            mode: 'cors',
        })
        .then(res => res.json())
        .then(data => {
            SetMath_TimeLove(data[ID_Data]["date-love"])
            setTitle(data[ID_Data]["name-me"], data[ID_Data]["name-you"])
            console.log(data[ID_Data])
        });
}

function setTitle(nameME, nameYou) {
    nameME_Cut = nameME.split(" ");
    nameYou_Cut = nameYou.split(" ");
    document.title = `${nameME_Cut[nameME_Cut.length-1]} - ${DateLove} Day - ${nameYou_Cut[nameYou_Cut.length - 1]}`
}

function SetMath_TimeLove(TimeLove) {
    LineStart = TimeLove.indexOf("-")
    LineEnd = TimeLove.lastIndexOf("-")
    FirstLove_Day = parseInt(TimeLove.slice(0, LineStart))
    FirstLove_Month = parseInt(TimeLove.slice(LineStart + 1, LineEnd))
    FirstLove_Year = parseInt(TimeLove.slice(LineEnd + 1, TimeLove.length))
    var curDate = new Date();
    var curDay = curDate.getDate();
    var curMonth = curDate.getMonth() + 1;
    var curYear = curDate.getFullYear();
    DateNewTotal = (curYear * 365) + (curMonth * 31) + curDay
    DateLoveTotal = (FirstLove_Year * 365) + (FirstLove_Month * 31) + FirstLove_Day
    DateLove = DateNewTotal - DateLoveTotal
}