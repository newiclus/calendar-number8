"use strict";

const APP = {
  /** only for the home view */
  home: function () {
    
    const ele = {
      startDay: $("#start_day"),
    };

    // Interactive demo
	  var datePicker = ele.startDay.glDatePicker({
      showAlways: true
    }).glDatePicker(true);


  }
};


$(document).on('ready', APP.home);