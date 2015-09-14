/**
 * ConfirmPopup | It is used to apply, row selection, deletion, pagination, sorting, filtering on Table-List
 * @author: Muhammad Rashid Hussain
 * 
 * @version: 1.0
 * @prerqusites: jQuery lib
 */

(function($) {
	var ConfirmPopup = function(w,d,element,options) {
		
		/**
		 * Constant Variable
		 */
		var YES = 'P'; // P for Positive
		var NO = 'N'; // N for Nagative
		// debugger;
		
		//Class Variable
		var _o = this;
		var W = $(w);
		var D = $(d);
		var _selectedDecision = '';
		var cpSubContainerTop = 0;
		var cpSubContainerLeft = 0;
		var isPopupOpen = false;
		

		//***Default Options.
		var defaultOptions = {
			message: 'Are you sure you want to save this information?',
			positiveBtnText: 'Yes',
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

		};


		//overwirte default options with user provided opions
		var settings = $.extend(defaultOptions, options || {});

		//local Variables deleration 
		var s = settings;
		settings.cssStyle = {};

		/**
		 * setStyleAndPositionOfPopup | This method will the Position Of popup
		 * 
		 */
		var setStyleAndPositionOfPopup = function() {
			settings.cssStyle = {
				cpMainContainer: {
								'width': 'auto',
								 'height': 'auto',
								  'display': 'none',
								  'position': 'fixed',
								  'background': 'rgba(0, 0, 0, 0.498039)',
								  'left': '0', 
								  'top': '0',
								  'bottom': '0',
								  'right': '0',
								  'z-index': '100000'
								},
				cpSubContainer: {
								'width': s.cpSubContainerWidth+'px',
								 'height': s.cpSubContainerHeight+'px',
								'position': 'absolute',
								'opacity': '1',
								'overflow': 'visible'
								},
				cpSkin: {'position': 'relative',
						'width': 'auto',
						'height': 'auto',
						'box-shadow': '0 10px 25px rgba(0, 0, 0, 0.5)',
						'background-color': '#fff',
						'color': '#444',
						'text-shadow': 'none',
						'-webkit-border-radius': '4px',
						'-moz-border-radius': '4px',
						'border-radius': '5px',
						'padding': '12px',
						'text-align': 'center'
						},
						
				cpMsgP: {'margin-bottom': '25px',
						// border: 1px solid rgb(0, 0, 0);
						'padding': '5px',
						'font-family': 'inherit',
						'font-size': '16px',
						},
				cpMsgS: '',
				pBtn: {'font-family: Arial; width': '70px', 'float': 'none', 'display': 'inline-block', 'vertical-align': 'top', 'padding': '9px 30px 9px 30px', 'margin-right': '10px'},
				nBtn: {'font-family: Arial; width': '70px', 'float': 'none', 'display': 'inline-block', 'vertical-align': 'top', 'padding': '9px 30px 9px 30px'}
			};

			//********Start Add Styles into generated Html
			$('#cpMainContainer').css(s.cssStyle.cpMainContainer);
			$('#cpSubContainer').css(s.cssStyle.cpSubContainer);
			$('#cpSkin').css(s.cssStyle.cpSkin);
			$('#cpSkin').css(s.cssStyle.cpSkin);
			if(s.cssStyle.cpMsgP != ''){
				$('#cpSkin p').css(s.cssStyle.cpMsgP);
			}
			if(s.cssStyle.cpMsgS != ''){
				$('#cpSkin p span').css(s.cssStyle.cpMsgS);
			}
			$('a.positiveDecision').css(s.cssStyle.pBtn);
			$('a.negativeDecision').css(s.cssStyle.nBtn);
			//********End Add Styles into generated Html



			//**** Add Calculated Top and left of the main-Container
			generateStyleClasses();
			$('#cpSubContainer').addClass('topLeftCss');
		};


		var generateStyleClasses = function() {
			calculatePositionOfPopup();
			if($('#stylTag').length > 0){
				$('#stylTag').remove();
			}
			var topAndLeftCssForMainContainer = '';
			topAndLeftCssForMainContainer = '<style id="stylTag">.topLeftCss{top: '+cpSubContainerTop+'px !important; left: '+cpSubContainerLeft+'px !important; }';
				if(s.applyDefaultBtnStyle){
					topAndLeftCssForMainContainer += '.btn-confirm-popup { \
															  background: #'+ s.decisionBtnsBgColor+'; \
															  background-image: -webkit-linear-gradient(top, #'+ s.decisionBtnsBgColor +', #'+ s.decisionBtnsBgGradiantColor +'); \
															  background-image: -moz-linear-gradient(top, #'+ s.decisionBtnsBgColor +', #'+ s.decisionBtnsBgGradiantColor +'); \
															  background-image: -ms-linear-gradient(top, #'+ s.decisionBtnsBgColor +', #'+ s.decisionBtnsBgGradiantColor +'); \
															  background-image: -o-linear-gradient(top, #'+ s.decisionBtnsBgColor +', #'+ s.decisionBtnsBgGradiantColor +'); \
															  background-image: linear-gradient(to bottom, #'+ s.decisionBtnsBgColor +', #'+ s.decisionBtnsBgGradiantColor +'); \
															  -webkit-border-radius: 6; \
															  -moz-border-radius: 6; \
															  border-radius: 6px; \
															  font-family: Arial; \
															  color: #'+ s.decisionBtnsFontColor +'; \
															  font-size: 20px; \
															  padding: 10px 20px 10px 20px; \
															  text-decoration: none; \
															} \
															.btn-confirm-popup:hover { \
															  background: #'+ s.decisionBtnsHoverBgColor +'; \
															  background-image: -webkit-linear-gradient(top, #'+ s.decisionBtnsHoverBgColor +', #'+ s.decisionBtnsBgColor +'); \
															  background-image: -moz-linear-gradient(top, #'+ s.decisionBtnsHoverBgColor +', #'+ s.decisionBtnsBgColor +'); \
															  background-image: -ms-linear-gradient(top, #'+ s.decisionBtnsHoverBgColor +', #'+ s.decisionBtnsBgColor +'); \
															  background-image: -o-linear-gradient(top, #'+ s.decisionBtnsHoverBgColor +', #'+ s.decisionBtnsBgColor +'); \
															  background-image: linear-gradient(to bottom, #'+ s.decisionBtnsHoverBgColor +', #'+ s.decisionBtnsBgColor +'); \
															  text-decoration: none; \
															}';
				}

			topAndLeftCssForMainContainer += '</style>';
			$(topAndLeftCssForMainContainer).appendTo('head');
		};

		/**
		 * calculatePositionOfPopup | This method will calculate the left and top of the popup and pass to class variable
		 * @return void(0)
		 */
		var calculatePositionOfPopup = function() {
			var dW = D.width();
			var dH = D.height();
			var wW = W.width();
			var wH = W.height();
			var mContainerWidth = s.cpSubContainerWidth
			var mContainerHeight = s.cpSubContainerHeight;

			var wdth = ( (dW > wW) ? dW : wW );
			var hght = ( (dH > wH) ? dH : wH );

			cpSubContainerLeft = wdth - ( (wdth/2) + (mContainerWidth/2) );
			cpSubContainerTop = hght - ( (hght/2) + (mContainerHeight/2) );
		};

		/**
		 * applyOddEvenStyle | This function will apply odd/even row styling
		 * 
		 */
		var generatePopupHtml = function() {

			//*** Remove already exists popups
			// closePopupBox();
			if($('#cpMainContainer').length){
				$('#cpMainContainer').remove();
			}
			
			var poupHtml = '';
			poupHtml += '<div id="cpMainContainer">';
			poupHtml += '<div id="cpSubContainer">';
			poupHtml += '<div id="cpSkin">';
			poupHtml += '<p><span>' + s.message + '</span></p>';
			poupHtml += '<a href="javascript:void(0)" class="positiveDecision '+ s.decisionBtnsCss +'">' + s.positiveBtnText + '</a>';
			poupHtml += '<a href="javascript:void(0)" class="negativeDecision '+ s.decisionBtnsCss +'">' + s.negativeBtnText + '</a>';
			poupHtml += '</div>';
			poupHtml += '</div>';
			poupHtml += '</div>';

			$(poupHtml).appendTo('body');

			//set Style & positions
			setStyleAndPositionOfPopup();
		};


		/**
		 * applyOddEvenStyle | This function will apply odd/even row styling
		 * 
		 */
		var openPopupBox = function() {

			//**** ConfirmationPopup
			$('#cpMainContainer').show();
			isPopupOpen = true;
		};



		/**
		 * Closes the Popupbox wherever it is i.e. either in Popupbox or in ajax
		 */
		var closePopupBox = function() {
			$('body').find('#cpMainContainer').off();
			$('body').find('#cpMainContainer').remove().hide();
			isPopupOpen = false;
		};


		/**
		 * _eventsBindings |  This method will manage events bindings
		 *
		 */
		var _eventsBindings = function() {

			D.off('click.confirmPopup');

			/**
			 * .positiveDecision Click Event Perform here (This is hanlde sorting functionality)
			 */
			D.on('click.confirmPopup', '.positiveDecision', function(e) {
				e.stopPropagation();
				e.preventDefault();

				_selectedDecision = YES;
				s.onPositiveDecision();
				closePopupBox();
			});


			/**
			 * .negativeDecision Click Event Perform here (This is hanlde sorting functionality)
			 */
			D.on('click.confirmPopup', '.negativeDecision', function(e) {
				e.stopPropagation();
				e.preventDefault();

				_selectedDecision = NO;
				s.onNegativeDecision();
				closePopupBox();
			});


			/**
			 * Resize Event Handle
			 */
			W.resize(function(){
				if(isPopupOpen === true){
					generatePopupHtml();
					openPopupBox();
				}
			});

		};
		

		/**
		 * _beforeInitialize |  It will manage Before initialize fnctionality
		 *
		 */
		var _beforeInitialize = function() {
			s.beforeStart();
		};


		/**
		 * initialize |  This method will create the pluging core functions
		 *
		 */
		this.initialize = function() {
			D.off('click.confirmPopup');
			
			_beforeInitialize();	//***It will manage Before initialize fnctionality
			generatePopupHtml();	//***It will generate popup html
			openPopupBox();			//***It will show the generated html
			_eventsBindings();		//***It will bind all events of generated html
			
		};


		/**
		 * Plugin Element Event Trigger Here
		 */
		D.off(s.confirmPopupCallOn+'.confirmPopup');
		$(element).on(s.confirmPopupCallOn+'.confirmPopup', function(e) {
			e.stopPropagation();
			e.preventDefault();
			_o.initialize();
		});
	};

	$.fn.confirmPopup = function(options) {
		this.each(function() {
			var element = $(this);
			new ConfirmPopup(window,document,this, options);
		});
		return;
	};
})(jQuery);
