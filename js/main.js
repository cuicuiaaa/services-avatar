// SMOOTH SCROLL EFFECT
// $(function () {
//   $.scrollIt({
//     easing: 'linear',
//     scrollTime: 500,
//     activeClass: 'active',
//     onPageChange: null,
//   });
// });

// MOBILE NAVIGATION
$(function () {
  $('#toggler').click(function () {
    if ($(this).is(':checked')) {
      $('.mobile__nav').animate({ left: '0' }, 400);
    } else {
      $('.mobile__nav').animate({ left: '-50%' }, 400);
    }
  });
});

// COPYRIGHT YEAR
$(function () {
  document.getElementById('current__year').innerHTML = new Date().getFullYear();
});

// FOR TEST
$(function () {
  $.ajax({
    url: 'http://localhost:8000/api/users',
    dataType: 'json',
    type: 'get',
    success: function(data) {
      console.log(data);
    }
  });
});



////////////////////////////////// Ajax //////////////////////////////////
const baseUrl = 'http://localhost:8000';
const appointmentUrl = 'http://localhost:8002';
const consultationsUrl = 'http://localhost:8003';
let id = 0;

//get covid test locations
var getCovidTestLocations = function() {
  $.ajax({
    url: appointmentUrl + '/api/locations',
    dataType: 'json',
    type: 'get',
    success: function(data) {
      $.each(data, function(index, value) {
        let locationOption = "<option value=" + `"${value.location}"` + ">" + value.location + "</option>";
        $(locationOption).appendTo($('#covid-test-locations'));
      })
    }
  });
}

//get doctor appointment locations
var getDoctorAppointmentLocations = function() {
  $.ajax({
    url: consultationsUrl + '/api/locations',
    dataType: 'json',
    type: 'get',
    success: function(data) {
      console.log(data);
      $.each(data, function(index, value) {
        let locationOption = "<option value=" + `"${value.location}"` + ">" + value.location + "</option>";
        $(locationOption).appendTo($('#doctor-appointment-locations'));
      })
    }
  });
}

// Book covid test
$(function () {
  $(document).on('click', '#book-covid-next', function (e) {
    e.preventDefault();
    let fname = $('[name="fname"]').val();
    let lname = $('[name="lname"]').val();
    let email = $('[name="email"]').val();

    $.ajax({
      url: baseUrl + '/api/user',
      dataType: 'json',
      type: 'post',
      data: {
        email: email
      },
      beforeSend: function () {
        $('#book-covid-next').addClass('disabled');
      },
      success: function (data) {
        if (data != null) {
          id = data.id;
          //next step
          $('#first-step').hide();
          $('#second-step').removeClass("invisible");
          getCovidTestLocations();
        } else {
          $.ajax({
            url: baseUrl + '/api/users',
            type: 'post',
            data: {
              first_name: fname,
              last_name: lname,
              email: email,
            },
            success: function (data) {
              id = data.id;
              //next step
              $('#first-step').hide();
              $('#second-step').removeClass("invisible");
              getCovidTestLocations();
            },
            error: function () {
              alert('Something wrong!');
            },
            complete: function () {
              $('#book-covid-next').removeClass('disabled');
            },
          });
        }
        
      },
      error: function () {
        alert('Something wrong!');
      },
      complete: function () {
        $('#book-covid-next').removeClass('disabled');
      },
    });
  });

  $(document).on('click', '#book-covid-submit', function (e) {
    e.preventDefault();
    let location = $('[name="location"]').val();
    console.log(location);
    let date = $('[name="date"]').val();

    $.ajax({
      url: baseUrl + '/api/appointment/' + id,
      type: 'PUT',
      data: {
        appointment_location: location,
        appointment_date: date,
      },
      beforeSend: function () {
        $('#book-covid-submit').addClass('disabled');
      },
      error: function () {
        alert('Something wrong!');
      },
      success: function (res) {
        $('.success').removeClass('invisible');
        $('#summary').removeClass('invisible');
        $('#summary-fname').html(res['first_name']);
        $('#summary-lname').html(res['last_name']);
        $('#summary-email').html(res['email']);
        $('#summary-appointment-location').html(res['appointment_location']);
        $('#summary-appointment-date').html(res['appointment_date']);
      },
      complete: function () {
        $('#book-covid-submit').removeClass('disabled');
      },
    });
  });
});

// Book doctor appointment
$(function () {
  $(document).on('click', '#book-doc-next', function (e) {
    e.preventDefault();
    let fname = $('[name="fname"]').val();
    let lname = $('[name="lname"]').val();
    let email = $('[name="email"]').val();

    $.ajax({
      url: baseUrl + '/api/user',
      dataType: 'json',
      type: 'post',
      data: {
        email: email
      },
      beforeSend: function () {
        $('#book-doc-next').addClass('disabled');
      },
      success: function (data) {
        if (data != null) {
          id = data.id;
          //next step
          $('#first-step').hide();
          $('#second-step').removeClass("invisible");
          getDoctorAppointmentLocations();
        } else {
          $.ajax({
            url: baseUrl + '/api/users',
            type: 'post',
            data: {
              first_name: fname,
              last_name: lname,
              email: email,
            },
            success: function (data) {
              id = data.id;
              //next step
              $('#first-step').hide();
              $('#second-step').removeClass("invisible");
              getDoctorAppointmentLocations();
            },
            error: function () {
              alert('Something wrong!');
            },
            complete: function () {
              $('#book-doc-next').removeClass('disabled');
            },
          });
        }
        
      },
      error: function () {
        alert('Something wrong!');
      },
      complete: function () {
        $('#book-covid-next').removeClass('disabled');
      },
    });
  });

  $(document).on('click', '#book-doc-submit', function (e) {
    e.preventDefault();
    let location = $('[name="location"]').val();
    let date = $('[name="date"]').val();
    let doctor = $('[name="doctor"]').val();

    $.ajax({
      url: baseUrl + '/api/consults/' + id,
      type: 'PUT',
      data: {
        consultation_location: location,
        consultation_date: date,
        doctor: doctor,
      },
      beforeSend: function () {
        $('#book-doc-submit').addClass('disabled');
      },
      error: function () {
        alert('Something wrong!');
      },
      success: function (res) {
        $('.success').removeClass('invisible');
        $('#summary').removeClass('invisible');
        $('#summary-fname').html(res['first_name']);
        $('#summary-lname').html(res['last_name']);
        $('#summary-email').html(res['email']);
        $('#summary-doctor').html(res['doctor']);
        $('#summary-consultations-location').html(res['consultation_location']);
        $('#summary-consultations-date').html(res['consultation_date']);
      },
      complete: function () {
        $('#book-doc-submit').removeClass('disabled');
      },
    });
  });
});

// Check covid result
$(function () {
  $(document).on('click', '#check-result', function (e) {
    e.preventDefault();
    let email = $('[name="email"]').val();

    $.ajax({
      url: baseUrl + '/api/result',
      type: 'put',
      data: {
        email: email
      },
      beforeSend: function () {
        $('#summary').addClass('invisible');
        $('#check-result').addClass('disabled');
      },
      error: function () {
        $('.fail').removeClass('invisible');
      },
      success: function (res) {
        console.log(res);
        if (res != null) {
          $('.fail').addClass('invisible');
          $('#summary').removeClass('invisible');
          $('#summary-fname').html(res['first_name']);
          $('#summary-lname').html(res['last_name']);
          $('#summary-email').html(res['email']);
          $('#summary-result').html(
            res['test_result'] == true ? 'Positive' : 'Negative'
          );
        } else {
          $('.fail').removeClass('invisible');
        }
      },
      complete: function () {
        $('#check-result').removeClass('disabled');
      },
    });
  });
});
