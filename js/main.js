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
    type: 'get',
    success: function(data) {
      console.log(data);
    }
  });
});

////////////////////////////////// Ajax //////////////////////////////////
const baseUrl = 'http://localhost:8000';

// Book covid test
$(function () {
  $(document).on('click', '#book-covid-next', function (e) {
    e.preventDefault();
    console.log("hit");
    let fname = $('[name="fname"]').val();
    let lname = $('[name="lname"]').val();
    let email = $('[name="email"]').val();

    $.ajax({
      url: baseUrl + '/api/users',
      type: 'post',
      data: {
        first_name: fname,
        last_name: lname,
        email: email,
      },
      beforeSend: function () {
        $('#book-covid-next').addClass('disabled');
      },
      success: function (data) {
        //next step
        $('#first-step').hide();
        $('#second-step').removeClass("invisible");
      },
      error: function () {
        alert('Something wrong!');
      },
      complete: function () {
        $('#book-covid-next').removeClass('disabled');
      },
    });
  });

  $(document).on('click', '#book-covid-submit', function () {
    let location = $('[name="location"]').val();
    let date = $('[name="date"]').val();

    $.ajax({
      url: baseUrl + 'api/user/10',
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
      success: function () {
        $('.success').removeClass('invisible');
      },
      complete: function () {
        $('#book-covid-submit').removeClass('disabled');
      },
    });
  });
});

// Book doctor appointment
$(function () {
  $(document).on('click', '#book-doc-next', function () {
    let fname = $('[name="fname"]').val();
    let lname = $('[name="lname"]').val();
    let email = $('[name="email"]').val();

    $.ajax({
      url: baseUrl + 'api/users',
      type: 'post',
      data: {
        first_name: fname,
        last_name: lname,
        email: email,
      },
      beforeSend: function () {
        $('#book-doc-next').addClass('disabled');
      },
      success: function () {
        //next step
        $('#first-step').hide();
        $('#second-step').fadeIn();
      },
      error: function () {
        alert('Something wrong!');
      },
      complete: function () {
        $('#book-doc-next').removeClass('disabled');
      },
    });
  });

  $(document).on('click', '#book-doc-submit', function () {
    let location = $('[name="location"]').val();
    let date = $('[name="date"]').val();
    let doctor = $('[name="doctor"]').val();

    $.ajax({
      url: baseUrl + 'api/user/10',
      type: 'PUT',
      data: {
        consultation_location: location,
        consultation_date: date,
        consultation_doctor: doctor,
      },
      beforeSend: function () {
        $('#book-doc-submit').addClass('disabled');
      },
      error: function () {
        alert('Something wrong!');
      },
      success: function () {
        $('.success').removeClass('invisible');
      },
      complete: function () {
        $('#book-doc-submit').removeClass('disabled');
      },
    });
  });
});

// Check covid result
$(function () {
  $(document).on('click', '#check-result', function () {
    let email = $('[name="email"]').val();

    $.ajax({
      url: baseUrl + '/api/user/' + email + '/test',
      type: 'GET',
      beforeSend: function () {
        $('#summary').addClass('invisible');
        $('#check-result').addClass('disabled');
        $('.fail').hide();
      },
      error: function () {
        $('.fail').removeClass('invisible');
      },
      success: function (res) {
        $('#summary').removeClass('invisible');
        $('$summary-fname').html(res['fname']);
        $('$summary-lname').html(res['lname']);
        $('$summary-email').html(res['email']);
        $('$summary-result').html(
          res['result'] == true ? 'Positive' : 'Negative'
        );
      },
      complete: function () {
        $('#check-result').removeClass('disabled');
      },
    });
  });
});
