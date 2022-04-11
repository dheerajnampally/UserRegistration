// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
//   $("input.group1").attr("disabled", true);
// Write your JavaScript code.


function mensSingles() {

    if ($('#MensSingles').prop('checked')) {
        document.getElementById("WomensSingles").disabled = true;
        document.getElementById("WomensDoubles").disabled = true;
        calculateAmont();
    }
    else {
        document.getElementById("WomensSingles").disabled = false;
        document.getElementById("WomensDoubles").disabled = false;
        calculateAmont();
    }
}

function womensSingles() {

    if ($('#WomensSingles').prop('checked')) {
        document.getElementById("MensSingles").disabled = true;
        document.getElementById("MensDoubles").disabled = true;
        calculateAmont();
    }
    else {
        document.getElementById("MensSingles").disabled = false;
        document.getElementById("MensDoubles").disabled = false;
        calculateAmont();
       
    }
}
function mensDoubles() {

    if ($('#MensDoubles').prop('checked')) {
        $("#invisibleMensDoubles").show();
        calculateAmont();
    }
    else {
        $("#invisibleMensDoubles").hide();
        calculateAmont();
    }
}

function womensDoubles() {
    if ($('#WomensDoubles').prop('checked')) {
        $("#invisibleWomensDoubles").show();
        calculateAmont();
    }
    else {
        $("#invisibleWomensDoubles").hide();
        calculateAmont();
    }
}

function mixedDoubles() {
    if ($('#MixedDoubles').prop('checked')) {
        $("#invisibleMixedDoubles").show();
        calculateAmont();
    }
    else {
        $("#invisibleMixedDoubles").hide();
        calculateAmont();
    }
}

function calculateAmont() {

    if ($('#MensSingles').prop('checked') && $('#MensDoubles').prop('checked') && $('#MixedDoubles').prop('checked')) {
        $('#Amount').text('30 $')
    }
    else if ($('#MensSingles').prop('checked') && $('#MensDoubles').prop('checked')) {
        $('#Amount').text('25 $')
    }
    else if ($('#MensSingles').prop('checked')) {
        $('#Amount').text('15 $')
    }

    if ($('#WomensSingles').prop('checked') && $('#WomensDoubles').prop('checked') && $('#MixedDoubles').prop('checked')) {
        $('#Amount').text('30 $')
    }
    else if ($('#WomensSingles').prop('checked') && $('#WomensDoubles').prop('checked')) {
        $('#Amount').text('25 $')
    }
    else if ($('#WomensSingles').prop('checked')) {
        $('#Amount').text('15 $')
    }
    
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function SubmitForm() {
    var dataValid = true;
    const radioButtons = document.querySelectorAll('input[name="eventType"]');
    let selectedEvent;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedEvent = radioButton.value;
            break;
        }
    }
    //alert(selectedEvent);
    if (selectedEvent === undefined) {
        alert('Please select event Type');
        dataValid = false;
    }

    var firstName = document.getElementById("FirstName").value;
    var lastName = document.getElementById("LastName").value;
    var email = document.getElementById("Email").value;
    var phone = document.getElementById("Phone").value;

    var mensdPartner = document.getElementById("mensdPartner").value;
    var womensdPartner = document.getElementById("womensdPartner").value;
    var mixeddPartner = document.getElementById("mixeddPartner").value;

    if (firstName === "" || lastName === "" || email === "" || phone === "") {
        alert('Please enter all the details required');
        dataValid = false;
    }


    if (!validateEmail(email)) {
        alert('Please enter valid email');
        dataValid = false;
    }

    if ($('#MensDoubles').prop('checked') && mensdPartner === "") {
        alert('Please enter partners name');
        dataValid = false;
    }

    if ($('#WomensDoubles').prop('checked') && womensdPartner === "") {
        alert('Please enter partners name');
        dataValid = false;
    }

    if ($('#MixedDoubles').prop('checked') && mixeddPartner === "") {
        alert('Please enter partners name');
        dataValid = false;
    }
    if (dataValid) {
        $.ajax({
            type: "POST",
            url: "/Home/RegisterPlayer",
            data: { //Passing data
                FirstName: firstName, //Reading text box values using Jquery
                LastName: lastName,
                EmailId: email,
                PhoneNumber: phone,
                MenSingles: $('#MensSingles').prop('checked'),
                WomensSingles: $('#WomensSingles').prop('checked'),
                MensDoubles: $('#MensDoubles').prop('checked'),
                WomensDoubles: $('#WomensDoubles').prop('checked'),
                MixedDoubles: $('#MixedDoubles').prop('checked'),
                MensDoublesPartnerName: mensdPartner,
                WomensDoublesPartnerName: womensdPartner,
                MixedDoublesPartnerName: mixeddPartner,
                Amount: $('#Amount').text()
            }
            ,
            success: function (response) {
                window.location.href = response;
            },
            failure: function (response) {
                alert(response.responseText);
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }
    else {
        //alert('Something is wrong in your form')
    }
}
