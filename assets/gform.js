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


$(document).ready(function() {
    $('#bootstrapForm').submit(function (event) {
        event.preventDefault()
        var extraData = {}
        
        // Submit of form should be successful but JSONP callback will fail because Google Forms
        // does not support it, so this is handled as a failure.
        alert('Form Submitted. Thanks.');
        $('#bootstrapForm').ajaxSubmit({
            data: extraData,
            dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
            error: function () {
                
                // You can also redirect the user to a custom thank-you page:
                // window.location = 'http://www.mydomain.com/thankyoupage.html'
            }
        })
    })
})
