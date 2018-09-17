import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';

var guestCount = 0;

$(document).ready(function () {
  $("#btnPageup").click(function (event) {
    event.preventDefault();
    $('html,body').animate({ scrollTop: $("#top").offset().top }, 'slow');
  });

  $("#btnPagedown").click(function (event) {
    event.preventDefault();
    $('html,body').animate({ scrollTop: $("#bottom").offset().top }, 'slow');
  });

  $("#btnGuestinc").click(function (event) {
    event.preventDefault();
    guestCount++;
    $("#guestCount").html(guestCount);
  });

  $("#btnGuestdec").click(function (event) {
    event.preventDefault();
    if (guestCount <= 0) { return; }
    guestCount--;
    $("#guestCount").html(guestCount);
  });

  $("#btnSave").click(function (event) {
    event.preventDefault();
    // TODO
  });

  // Set Date
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + (month) + "-" + (day);
  $("#selectedDate").val(today);

  // Instantiate the MDC components
  var btnSave = new MDCRipple(document.querySelector('.btnSave'));
  var btnGuestdec = new MDCRipple(document.querySelector('.btnGuestdec'));
  var btnGuestinc = new MDCRipple(document.querySelector('.btnGuestinc'));
  var selectedDate = new MDCTextField(document.querySelector('.selectedDate'));

  // Load the data
  loadData();
});

function loadData() { // TODO
  $.ajax({
    url: 'mockdata.json',
    type: "get",
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
      // sort then draw
      data.sort(function (a, b) {
        return a.firstname > b.firstname ? 1 : a.firstname < b.firstname ? -1 : 0;
      });
      drawList(data);
    },
    error: function (msg) {
      alert(msg.responseText);
    }
  });
}

function drawList(data) {
  $.each(data, function (index, item) {
    var person = $(`
        <li class="mdc-list-item checkbox-list-ripple-surface">
        <span class="mdc-list-item__graphic" role="presentation">
          <i class="material-icons">how_to_reg</i>
        </span>
        <span class="mdc-list-item__text">
          <label for="cb_${item.pid}">${item.firstname} ${item.lastname}</label>
        </span>
        <span class="mdc-list-item__meta">
          <div class="mdc-checkbox">
            <input type="checkbox" class="mdc-checkbox__native-control" id="cb_${item.pid}" />
            <div class="mdc-checkbox__background">
              <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                <path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
              </svg>
              <div class="mdc-checkbox__mixedmark"></div>
            </div>
          </div>
        </span>
        </li>
        `);
    $("#listPeople").append(person);
  });
}