const ALL_ENT = ["entry.117793984","entry.43731313","entry.1206758089","entry.179139450","entry.2110442727","entry.381768359","entry.730313804","entry.1958654718","entry.271334770","entry.1993577002","entry.869053444","entry.1852148494"]
const formToObject = form => Object.fromEntries(new FormData(form));

function calc_score() {
    let score = 0;
    let form_dat = formToObject(document.querySelector('#bootstrapForm')); 
    ALL_ENT.forEach((ent) => {
      score += Number(form_dat[ent]);
    })
    return score;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
} 


$(document).ready(function() {
    $('#bootstrapForm').submit(function (event) {
        if (getCookie("gs_id") !== null) {
            alert("不要重複作答");
            window.location.replace("https://t.ly/LEMaY");
            return
        }
        event.preventDefault()
        var extraData = {}
        $(".btn").attr("disabled", true);
        // Submit of form should be successful but JSONP callback will fail because Google Forms
        // does not support it, so this is handled as a failure.
        $('#bootstrapForm').ajaxSubmit({
            data: extraData,
            dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
            error: function () {
                let gs_id = Math.floor(Math.random() * max);
                document.cookie = `gs_id=${gs_id}; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
                alert('Form Submitted. Thanks.');
                let form_dat = formToObject(document.querySelector('#bootstrapForm')); 
                let score = calc_score();
                let option = "D";
                if (form_dat["entry.1785058210"] != "等重之三種氣體所含分子數：甲＞氧＞乙") {
                    option = "A";
                }
                window.location.href = `showresult.html?score=${score}&option=${option}`;
            }
        })
    })
})
