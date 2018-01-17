"use strict";

const APP = {
  /** only for the home view */
  home: function () {
    
    const ele = {
      startDay: $("#start-day"),
      numberDays: $("#number-days"),
      dateInput: $("#date-input")
    };

    // Init default date
    ele.dateInput.val(ele.startDay.val());


    var getRangeDays = function (numberDays) {
      var rangeDays = [];
      var startDate = new Date( ele.startDay.val() );

      for (var i = 0; i < numberDays; i++) {
        var dateRange = startDate.setDate(startDate.getDate() + 1);
        rangeDays.push({
          date: new Date(dateRange),
          data: { message: 'Selected by range' },
          repeatMonth: false
        });
      }
      
      return rangeDays;
    };

    // Instance glDatePicker
	  var datePicker = ele.dateInput.glDatePicker({
      showAlways: true,
      cssName: 'flatwhite',
      // Init default date
      todayDate: new Date( ele.startDay.val() ),
    
      specialDates: getRangeDays(ele.numberDays.val()),
      
      onClick: function(target, cell, date, data) {
        target.val(
          date.getFullYear() + ' - ' +
          date.getMonth() + ' - ' +
          date.getDate()
        );

        if(data != null) {
          alert(data.message + '\n' + date);
        }
      }
    }).glDatePicker(true);

    // Update datePicker
    ele.startDay.on('input', function() {
      if (ele.startDay.val() !== '') {
        datePicker.options.todayDate = new Date( ele.startDay.val() );
        datePicker.render();
      }
      
    });

    ele.numberDays.on('input', function() {
      datePicker.options.specialDates = getRangeDays(ele.numberDays.val());
      datePicker.render();
    });

  }
};


$(document).on('ready', APP.home);