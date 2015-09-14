# confirmPopup
It is jQuery plugin which gives you a customizable confirm dialogue with support for changing confirmation message and many more.

## When we Use confirmPopup
* End-User is inserting form data into database and you want your End-User to show confirmation before \n
* End-User is deleting record and you want your End-User to show confirmation before

## How to use confirmPopup
1. Include jQuery lib
2. Download or Copy [ConfirmPopup](https://github.com/mrashidse/confirmPopup/blob/master/confirmPopup-1.0.js)
3. Include after jQuery lib
4. Now you are ready to Call ConfirmPopup on you selector For Example: 
 * ` $('#btnSaveData').confirmPopup(); `
5. You can change it according to you requirments.
6. You can also download [here](https://github.com/mrashidse/confirmPopup/blob/master/confirmPopupTest.html) a demo file and run it into you browser.
7. ConfirmPopup's Default settings are: 
``` 
 $('#btnSaveData').confirmPopup({
      message: 'Are you sure you want to save this information?',
      positiveBtnText:'Yes',
      negativeBtnText: 'No',
      confirmPopupCallOn: 'click',
      cpSubContainerWidth: 500,
      cpSubContainerHeight: 100,
      applyDefaultBtnStyle: true,
      decisionBtnsCss: 'btn-confirm-popup',
      decisionBtnsBgColor: '3498db', //change bg color of decision-Btns if you are using default btn-class
      decisionBtnsBgGradiantColor: '2980b9', //change bg color of decision-Btns if you are using default btn-class
      decisionBtnsHoverBgColor: '3498db', //change bg color of decision-Btns if you are using default btn-class
      decisionBtnsFontColor: 'ffffff', //change bg color of decision-Btns if you are using default btn-class
      beforeStart: function() {
				void(0);
			},
			onPositiveDecision: function() {
				void(0);
			},
			onNegativeDecision: function() {
				void(0);
			},
    }); 
```
	

